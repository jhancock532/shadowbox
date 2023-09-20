import fs from 'fs';
import https from 'https';

export function getReportID() {
    return JSON.parse(
        fs.readFileSync(
            './storage/key_value_stores/output/reportMetadata.json',
            'utf8',
        ),
    ).reportId;
}

export function getReportPageData() {
    return JSON.parse(
        fs.readFileSync(
            './storage/key_value_stores/output/results.json',
            'utf8',
        ),
    );
}

export async function getMetadata(page) {
    return await page.evaluate(() => {
        const metaDescriptionElement = document.querySelector(
            "meta[name='description']",
        );
        const description = metaDescriptionElement
            ? metaDescriptionElement.getAttribute('content')
            : '';

        const twitter = {
            card: document.querySelector("meta[name='twitter:card']")?.content,
            site: document.querySelector("meta[name='twitter:site']")?.content,
            title: document.querySelector("meta[name='twitter:title']")
                ?.content,
            description: document.querySelector(
                "meta[name='twitter:description']",
            )?.content,
            image: document.querySelector("meta[name='twitter:image']")
                ?.content,
        };

        const og = {
            type: document.querySelector("meta[property='og:type']")?.content,
            url: document.querySelector("meta[property='og:url']")?.content,
            title: document.querySelector("meta[property='og:title']")?.content,
            description: document.querySelector(
                "meta[property='og:description']",
            )?.content,
            image: document.querySelector("meta[property='og:image']")?.content,
            image_width: document.querySelector(
                "meta[property='og:image:width']",
            )?.content,
            image_height: document.querySelector(
                "meta[property='og:image:height']",
            )?.content,
        };

        return {
            description,
            twitter,
            og,
        };
    });
}

export async function getWithinSiteLinks(page) {
    return await page.$$eval('a', (as) => {
        as = as.filter((a) => {
            if (a.href.match(/http(s)?:\/\/[a-z]*.?torchbox.com/g)) return true;
            return false;
        });
        return as.map((a) => a.href);
    });
}

export async function getYouTubeEmbeds(page) {
    return await page.$$eval('iframe', (iframes) => {
        iframes = iframes.filter((iframe) => {
            if (iframe.src.match(/http(s)?:\/\/www.youtube(-nocookie)?.com/g))
                return true;
            return false;
        });
        return iframes.map((iframe) => {
            return {
                src: iframe.src,
                title: iframe.title,
                // get video ID from URL
                thumbnail: `https://i.ytimg.com/vi/${iframe.src
                    .split('?')[0]
                    .split('/')
                    .slice(-1)}/mqdefault.jpg`,
            };
        });
    });
}

function getAssetTypeFromResource(resource) {
    if (resource.initiatorType === 'navigation') return 'document';
    if (resource.initiatorType === 'iframe') return 'document';

    const url = resource.name;

    if (url.endsWith('.css')) return 'stylesheet';
    if (url.endsWith('.js')) return 'script';
    if (url.endsWith('.png')) return 'image';

    // Note use of includes as some image URLs end with query parameters
    // Todo: replace with Regex
    if (url.includes('.jpg')) return 'image';
    if (url.includes('.jpeg')) return 'image';

    if (url.endsWith('.webp')) return 'image';
    if (url.endsWith('.gif')) return 'image';
    if (url.endsWith('.svg')) return 'image';
    if (url.endsWith('.woff')) return 'font';
    if (url.endsWith('.woff2')) return 'font';
    if (url.endsWith('.ttf')) return 'font';
    if (url.endsWith('.otf')) return 'font';
    if (url.endsWith('.eot')) return 'font';
    if (url.endsWith('.ico')) return 'image';
    if (url.endsWith('.mp4')) return 'media';
    if (url.endsWith('.webm')) return 'media';
    if (url.endsWith('.ogg')) return 'media';
    if (url.endsWith('.mp3')) return 'media';
    if (url.endsWith('.wav')) return 'media';
    if (url.endsWith('.json')) return 'json';
    if (url.endsWith('.xml')) return 'xml';
    if (url.endsWith('.txt')) return 'text';
    if (url.endsWith('.pdf')) return 'pdf';

    if (resource.initiatorType === 'xmlhttprequest') return 'xhr';
    if (resource.initiatorType === 'fetch') return 'fetch';
    if (resource.initiatorType === 'img') return 'image';
    if (resource.initiatorType === 'script') return 'script';
    if (resource.initiatorType === 'css') return 'stylesheet';
    if (resource.initiatorType === 'beacon') return 'beacon';

    console.log('No resource type found for:');
    console.log(resource);

    // Todo: handle YouTube embeds and similar with unique resource types.
    // Instead of resource type, is there more relevant info we can return for visualisation?
}
function parsePerformanceResources(resources) {
    let output = [];

    for (let i = 0; i < resources.length; i += 1) {
        let resource = resources[i];

        if (
            resource.entryType === 'navigation' ||
            resource.entryType === 'resource'
        ) {
            const resourceType = getAssetTypeFromResource(resource);

            output.push({
                url: resource.name,
                resourceType: resourceType,
                transferSize: resource.transferSize,
            });
        }
    }

    return output;
}

export async function getNetworkRequests(page) {
    const performanceEntries = JSON.parse(
        await page.evaluate(() =>
            JSON.stringify(window.performance.getEntries()),
        ),
    );

    return parsePerformanceResources(performanceEntries);
}

async function getResponseSize(url) {
    const protocol = url.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
        protocol
            .get(url, (response) => {
                let size = 0;
                response.on('data', (chunk) => {
                    size += chunk.length;
                });
                response.on('end', () => {
                    resolve(size);
                });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

// Create a dictionary of all the network requests made while crawling and their resource size

export async function getNetworkRequestSizes(pageData) {
    let requestSizes = {};

    for (let i = 0; i < pageData.length; i += 1) {
        const page = pageData[i];

        for (let j = 0; j < page.networkRequests.length; j += 1) {
            const request = page.networkRequests[j];

            if (request.transferSize !== 0) {
                requestSizes[request.url] = request.transferSize;
            } else {
                // Update any resources which don't have a valid transfer size with their actual transfer size
                console.log(`Fetching request size: ${request.url}`);
                // eslint-disable-next-line no-await-in-loop
                let transferSize = await getResponseSize(request.url);
                requestSizes[request.url] = transferSize;
            }
        }
    }

    return requestSizes;
}

function tallyNetworkRequestSizeByType(networkRequests) {
    let output = {};

    for (let i = 0; i < networkRequests.length; i += 1) {
        const request = networkRequests[i];

        if (output[request.resourceType] === undefined) {
            output[request.resourceType] = 0;
        }

        output[request.resourceType] += request.transferSize;
    }

    return output;
}

export function saveNetworkRequestsToFileSystem(
    pageData,
    reportUUID,
    requestSizes,
) {
    let largestWebpageTotalNetworkRequestSize = 0;

    const totalPageWeights = [];
    const websiteNetworkRequestSummary = [];

    for (let i = 0; i < pageData.length; i += 1) {
        const page = pageData[i];

        const outputRequestData = [];

        for (let j = 0; j < page.networkRequests.length; j += 1) {
            const request = page.networkRequests[j];

            if (
                requestSizes[request.url] !== undefined &&
                request.transferSize === 0
            ) {
                request.transferSize = requestSizes[request.url];
            }

            outputRequestData.push(request);
        }

        websiteNetworkRequestSummary.push({
            url: page.url,
            networkRequestSizeTallies:
                tallyNetworkRequestSizeByType(outputRequestData),
        });

        const totalNetworkRequestSize = outputRequestData.reduce(
            (total, request) => total + request.transferSize,
            0,
        );

        if (totalNetworkRequestSize > largestWebpageTotalNetworkRequestSize) {
            largestWebpageTotalNetworkRequestSize = totalNetworkRequestSize;
        }

        totalPageWeights.push(totalNetworkRequestSize);

        const requestsJSON = JSON.stringify(outputRequestData, null, 4);

        fs.mkdirSync(`../data/${reportUUID}/${page.id}/`, {
            recursive: true,
        });
        fs.writeFileSync(
            `../data/${reportUUID}/${page.id}/networkRequests.json`,
            requestsJSON + '\n',
        );
    }

    const averagePageWeight =
        totalPageWeights.reduce((total, weight) => total + weight, 0) /
        totalPageWeights.length;

    const medianPageWeight =
        totalPageWeights.sort()[Math.floor(totalPageWeights.length / 2)];

    const requestSummaryJSON = JSON.stringify(
        {
            averagePageWeight,
            medianPageWeight,
            largestWebpageTotalNetworkRequestSize,
            websiteNetworkRequestSummary,
        },
        null,
        4,
    );

    fs.mkdirSync(`../data/${reportUUID}/`, {
        recursive: true,
    });

    fs.writeFileSync(
        `../data/${reportUUID}/networkRequestsSummary.json`,
        requestSummaryJSON + '\n',
    );
}

export const TEST_REQUEST_SIZES = {
    'https://torchbox.com/': 9873,
    'https://torchbox.com/static/css/main.ea909493a42f.css': 18446,
    'https://torchbox.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js': 955,
    'https://torchbox.com/static/js/main.130c2993220d.js': 69073,
    'https://www.googletagmanager.com/gtm.js?id=GTM-K5HPMR': 242269,
    'https://media.torchbox.com/images/2019-03-19_06.27.53_1.max-1000x500.jpg': 65547,
    'https://torchbox.com/static/df348384f91cc9ecf2f7.8cf7315c70cb.woff': 61694,
    'https://torchbox.com/static/4aa0abf35762d3d96221.0cd7caae30ac.woff': 61227,
    'https://torchbox.com/static/fa5b3aada7c0f3ce7f71.8a3437107a65.woff': 61865,
    'https://media.torchbox.com/images/2022-Top25_Best-Mid-Sized-Companies_1.original.height-90.png': 5830,
    'https://media.torchbox.com/images/Certified_B_Corporation_B_Corp_Logo_2022_Black.height-90.png': 2438,
    'https://media.torchbox.com/images/Inhabit-Carbon-Neutral-Badge-Connected-Blue.or.height-90.png': 3829,
    'https://media.torchbox.com/images/tbx_team-will.2e16d0ba.fill-100x100.jpg': 3568,
    'https://torchbox.com/static/images/showreel.1f606bea129a.mp4': 300,
    'https://torchbox.com/digital-products/': 12648,
    'https://media.torchbox.com/images/IMG_1714.2e16d0ba.fill-746x500.jpg': 68709,
    'https://torchbox.com/static/f86b36700825a41a1b4a.27eaf2a5c297.woff': 60027,
    'https://media.torchbox.com/images/client-NASA.width-400.png': 14138,
    'https://media.torchbox.com/images/client-mozilla.width-400.png': 3356,
    'https://media.torchbox.com/images/client-tate.width-400.png': 49446,
    'https://media.torchbox.com/images/client-penn.width-400.png': 8445,
    'https://media.torchbox.com/images/client-oxfam.width-400.png': 9326,
    'https://media.torchbox.com/images/client-RNIB.width-400.png': 3951,
    'https://media.torchbox.com/images/client-sue-ryder.width-400.png': 18010,
    'https://media.torchbox.com/images/client-RCA.width-400.png': 26790,
    'https://media.torchbox.com/images/client-samaritans.width-400.png': 8055,
    'https://media.torchbox.com/images/client-wharton.width-400.png': 30221,
    'https://media.torchbox.com/images/client-M.width-400.png': 8991,
    'https://media.torchbox.com/images/client-KCL.width-400.png': 4407,
    'https://torchbox.com/wagtail-cms/': 12840,
    'https://media.torchbox.com/images/IMG_1711.2e16d0ba.fill-746x500.jpg': 48973,
    'https://media.torchbox.com/images/ny.width-400.png': 10281,
    'https://media.torchbox.com/images/Oxfam_America_logo_on_6x4_background_wHjunCY.width-400.png': 18368,
    'https://media.torchbox.com/images/Oxfam-logo-new.width-400.png': 16123,
    'https://media.torchbox.com/images/NHS_Digital_logo_on_6x4_background_vUvgAau.width-400.png': 13509,
    'https://media.torchbox.com/images/wharton_interactive.max-800x600.width-400.png': 4350,
    'https://media.torchbox.com/images/Blood-Cancer-UK-440.width-400.jpg': 9427,
    'https://media.torchbox.com/images/dit.width-400.png': 21531,
    'https://media.torchbox.com/images/client-gosh.width-400.png': 19902,
    'https://media.torchbox.com/images/Google_logo_on_6x4_XOYGMQi.width-400.png': 18126,
    'https://ai.torchbox.com/': 6137,
    'https://ai.torchbox.com/fonts/apercu-light-pro.woff2': 45640,
    'https://ai.torchbox.com/fonts/apercu-regular-pro.woff2': 47076,
    'https://ai.torchbox.com/fonts/apercu-bold-pro.woff2': 46672,
    'https://ai.torchbox.com/_astro/index.0bcc206f.css': 8115,
    'https://ai.torchbox.com/fonts/apercu-black-pro.woff2': 47016,
    'https://ai.torchbox.com/authors/c.png': 1585,
    'https://ai.torchbox.com/authors/a.png': 2322,
    'https://ai.torchbox.com/external.png': 934,
    'https://ai.torchbox.com/authors/b.png': 1585,
    'https://ai.torchbox.com/authors/a.jpg': 16267,
    'https://ai.torchbox.com/authors/b.jpg': 15666,
    'https://ai.torchbox.com/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js': 955,
    'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js': 54,
    'https://www.googletagmanager.com/gtm.js?id=GTM-5HXV4ZB': 108057,
    'https://ai.torchbox.com/_astro/torchbox_logo_ai_darkBlue_lgRKD.png': 9226,
    'https://ai.torchbox.com/_astro/injecting-playfulness-creativity-into-responsible-ai-innovation-header-square_Z1VOuf2.jpg': 71848,
    'https://ai.torchbox.com/_astro/ai-navigating-together-torchbox_Z28g4Ch.png': 87282,
    'https://ai.torchbox.com/_astro/generative-ai-powerful-tools-to-imagine-explore-better-futures-header-square_Z1C5weI.jpg': 40086,
    'https://ai.torchbox.com/_astro/words-are-hard-why-natural-language-is-a-bottleneck-for-interaction-header-square_2aORoy.jpg': 35372,
    'https://ai.torchbox.com/_astro/the-dangers-of-integrating-with-large-language-models-and-how-to-reduce-them-header-square_Z1sjHgS.jpg': 47406,
    'https://ai.torchbox.com/_astro/content-check_Zjd5Ql.jpg': 33002,
    'https://ai.torchbox.com/_astro/ready-set-ai_Z2kl6oe.jpg': 83662,
    'https://torchbox.com/digital-marketing/': 15294,
    'https://media.torchbox.com/images/IMG_3103.2e16d0ba.fill-100x100.jpg': 3260,
    'https://media.torchbox.com/images/Richard-Casson.2e16d0ba.fill-100x100.jpg': 4105,
    'https://media.torchbox.com/images/Felicity.2e16d0ba.fill-100x100.jpg': 4046,
    'https://media.torchbox.com/images/hq-4872.2e16d0ba.fill-100x100.jpg': 3199,
    'https://media.torchbox.com/images/IMG-20210613-WA0006.2e16d0ba.fill-100x100.jpg': 3566,
    'https://media.torchbox.com/images/BCN-Afternoon-Tea-Scones_1.width-1280.jpg': 431197,
    'https://media.torchbox.com/images/RMCC-pippa-doctor-site-header_1.width-1280.png': 1037831,
    'https://media.torchbox.com/images/MS_Society.width-1280.png': 361848,
    'https://media.torchbox.com/images/BCN2-PinkRibbon-home.width-1280.jpg': 144623,
    'https://media.torchbox.com/images/DECUKRAINE_-_Hero_image_CqsrSRf.width-1280.jpg': 155760,
    'https://media.torchbox.com/images/RSSSE_image.width-1280.png': 1226197,
    'https://media.torchbox.com/images/MNDA_LinkedIN_Membership_Images_-_Google-_120.width-1280.png': 1069680,
    'https://media.torchbox.com/images/Great_Ormond_Street_Hospital_logo_on_6x4_backg.width-400.png': 30699,
    'https://media.torchbox.com/images/NHS_logo_on_6x4_background_IHQiQTc.width-400.png': 14367,
    'https://media.torchbox.com/images/sams.width-400.png': 28957,
    'https://media.torchbox.com/images/bccbcn_logo_2.width-400.png': 7603,
    'https://media.torchbox.com/images/Greenpeace-logo.width-400.png': 18360,
    'https://media.torchbox.com/images/DEC_logo_on_6x4_background_yGT4CJ6.width-400.png': 53447,
    'https://media.torchbox.com/images/Crisis-logo.width-400.jpg': 11770,
    'https://media.torchbox.com/images/Mind_logo_on_6x4_background_OIoVgqp.width-400.png': 30963,
    'https://media.torchbox.com/images/Action_for_Children_logo_d9PzptO.width-400.png': 26640,
    'https://media.torchbox.com/images/Chatham_House_logo_on_6x4_background__TExZcwH.width-400.png': 27604,
    'https://media.torchbox.com/images/rs-logo.width-400.png': 9975,
    'https://media.torchbox.com/images/Girlguiding_logo_on_6x4_background_9DTxHJu.width-400.png': 48473,
    'https://media.torchbox.com/images/ir-uk-logo.width-400.jpg': 11686,
    'https://media.torchbox.com/images/shelterbox-logo.width-400.png': 15624,
    'https://media.torchbox.com/images/ndcs-logo.width-400.png': 15092,
    'https://media.torchbox.com/images/bma_dual_brandmark_grey_dark_rgb-copy-1971x576.width-400.png': 15347,
    'https://torchbox.com/careers/jobs': 12199,
    'https://torchbox.com/careers/fonts/apercu/apercu-light-pro.woff2': 45640,
    'https://torchbox.com/careers/fonts/apercu/apercu-regular-pro.woff2': 47076,
    'https://torchbox.com/careers/fonts/apercu/apercu-bold-pro.woff2': 46672,
    'https://torchbox.com/careers/fonts/apercu/apercu-black-pro.woff2': 47016,
    'https://torchbox.com/careers/_next/static/css/6c2f2fca48caa2a6.css': 2271,
    'https://torchbox.com/careers/_next/static/css/e879779ad23fb394.css': 26074,
    'https://torchbox.com/careers/_next/static/css/3934e354d2350ac5.css': 2565,
    'https://torchbox.com/careers/_next/static/chunks/webpack-9994b79a6661ba17.js': 1156,
    'https://torchbox.com/careers/_next/static/chunks/framework-5f4595e5518b5600.js': 43390,
    'https://torchbox.com/careers/_next/static/chunks/main-15536af2c324b7c6.js': 28903,
    'https://torchbox.com/careers/_next/static/chunks/pages/_app-51d005eadd324937.js': 5073,
    'https://torchbox.com/careers/_next/static/chunks/604-50716c57b8ee6ce9.js': 11049,
    'https://torchbox.com/careers/_next/static/chunks/479-c1def6e0a03589e8.js': 8605,
    'https://torchbox.com/careers/_next/static/mR6mMLrDXcWHcWKX-t8_E/_buildManifest.js': 841,
    'https://torchbox.com/careers/_next/static/chunks/pages/jobs-b201784c4def4981.js': 4268,
    'https://torchbox.com/careers/_next/static/mR6mMLrDXcWHcWKX-t8_E/_ssgManifest.js': 423,
    'https://torchbox.com/careers/_next/static/mR6mMLrDXcWHcWKX-t8_E/_middlewareManifest.js': 355,
    'https://www.googletagmanager.com/gtm.js?id=GTM-K5HPMR&gtm_auth=&gtm_preview=&gtm_cookies_win=x': 242269,
    'https://torchbox.com/careers/_next/data/mR6mMLrDXcWHcWKX-t8_E/en/jobs/senior-python-wagtail-developer.json': 5014,
    'https://torchbox.com/careers/_next/static/chunks/pages/jobs/%5Bslug%5D-ee02bf7a11444193.js': 15343,
    'https://torchbox.com/careers/_next/data/mR6mMLrDXcWHcWKX-t8_E/en/jobs/python-developer-brazil.json': 3936,
    'https://torchbox.com/careers/_next/static/css/3f7980dfa934dd42.css': 3291,
};
