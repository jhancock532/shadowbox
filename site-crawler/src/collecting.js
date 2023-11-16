import { parsePerformanceResources } from './processing.js';

/**
 * Scrolls to the bottom of the page using page.evaluate and a Promise.
 * @param {Object} page - The page object to scroll.
 * @returns {void}
 */
export async function scrollToBottom(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, scrollHeight);

            // Wait for the scroll to finish
            let timer = setInterval(() => {
                // Stop waiting if we've reached the bottom of the page
                if (
                    window.scrollY >=
                    scrollHeight - (window.innerHeight + 100)
                ) {
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}

/**
 * @param {Page} page - The page to search for links.
 * @returns {Promise<string[]>} - An array of links going to the same site as the given page.
 */
export async function getWithinSiteLinks(page) {
    // Todo: not all page URLs will be valid, for some reason YouTube embeds always fail here.
    try {
        const baseUrl = new URL(page.url());
        return await page.$$eval(
            'a',
            (as, baseUrl) => {
                as = as.filter((a) => {
                    const url = new URL(a.href);
                    return url.origin === baseUrl.origin;
                });
                return as.map((a) => a.href);
            },
            baseUrl,
        );
    } catch (error) {
        console.error(
            "* Couldn't get links from within page due to invalid URL format. *",
            page.url(),
        );
    }
}

/**
 * Returns an array of YouTube embeds found on the given page.
 * @param {Page} page - The page to search for YouTube embeds.
 * @returns {<Array<Object>>} - An array of objects containing information about each YouTube embed found on the page.
 */
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

/**
 * Retrieves metadata information from a web page using Puppeteer.
 * @param {object} page - A Puppeteer page object representing a web page.
 * @returns {object} - An object containing the description, Twitter metadata, and Open Graph metadata of the web page.
 */
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

/**
 * Retrieves network performance data from a web page and parses it to extract relevant information about the network requests made by the page.
 * @param {object} page - A Puppeteer page object representing a web page.
 * @returns {Array} - An array of network requests, where each request is represented as an object with properties such as URL, resource type, transfer size, and file extension.
 */
export async function getNetworkRequests(page) {
    const performanceEntries = JSON.parse(
        await page.evaluate(() =>
            JSON.stringify(window.performance.getEntries()),
        ),
    );

    return parsePerformanceResources(performanceEntries);
}
