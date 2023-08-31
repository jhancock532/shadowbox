import { Dataset, createPuppeteerRouter, EnqueueStrategy } from 'crawlee';
import crypto from 'crypto';
import {
    getMetadata,
    getNetworkRequests,
    getWithinSiteLinks,
} from './utils.js';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ enqueueLinks, request, page, log }) => {
    await enqueueLinks({
        strategy: EnqueueStrategy.SameDomain,
    });

    const title = await page.title();

    const metadata = await getMetadata(page);

    const links = await getWithinSiteLinks(page);

    const networkRequests = await getNetworkRequests(page);

    log.info(`${title}`, { url: request.loadedUrl });

    await Dataset.pushData({
        id: crypto.randomUUID().substring(0, 18),
        url: request.loadedUrl,
        title,
        metadata,
        links,
        networkRequests,
    });
});
