/**
 * Given a URL string, return the file extension of the file being loaded.
 * If no file extension is found, return 'unknown'.
 * @param {string} url
 * @returns file type, without dot, or 'unknown'
 */
export function getFileExtension(url) {
    if (!url) return 'unknown';

    // If it's Next.js trying to load an image lazily, remove the _next/image?url= prefix.
    if (url.includes('_next/image?url=')) {
        url = url.split('_next/image?url=')[1];
    }

    // Remove the query string, if any.
    url = url.split('?')[0];

    // Remove the query string, if encoded (e.g. in Next.js image loading)
    url = url.split('%3F')[0];

    // Remove the query ampersand (Seen in Next.js image loading)
    url = url.split('&')[0];

    // Remove the hash fragment, if any.
    url = url.split('#')[0];

    // Get the last part of the URL, which is the filename.
    const filename = url.split('/').pop();

    if (filename.includes('.')) {
        // Get the file extension by splitting the filename on the period character and returning the last element.
        const fileExtension = filename.split('.').pop().trim();

        if (fileExtension === '') return 'unknown';

        // Return the file extension
        return fileExtension;
    }

    return 'unknown';
}

/**
 * Checks if a given file extension is a media file extension.
 * This includes video and music files.
 * @param {string} fileExtension - The file extension to check.
 * @returns {boolean}
 */
function isMediaFileExtension(fileExtension) {
    if (fileExtension === 'mp4') return true;
    if (fileExtension === 'webm') return true;
    if (fileExtension === 'ogg') return true;
    if (fileExtension === 'mp3') return true;
    if (fileExtension === 'wav') return true;
    return false;
}

/**
 * Checks if a given file extension is an image file extension.
 * @param {string} fileExtension - The file extension to check.
 * @returns {boolean}
 */
function isImageFileExtension(fileExtension) {
    if (fileExtension === 'jpg') return true;
    if (fileExtension === 'jpeg') return true;
    if (fileExtension === 'png') return true;
    if (fileExtension === 'gif') return true;
    if (fileExtension === 'svg') return true;
    if (fileExtension === 'webp') return true;
    if (fileExtension === 'ico') return true;
    return false;
}

/**
 * Checks if a given file extension is a font file extension.
 * @param {string} fileExtension - The file extension to check.
 * @returns {boolean}
 */
function isFontFileExtension(fileExtension) {
    if (fileExtension === 'woff') return true;
    if (fileExtension === 'woff2') return true;
    if (fileExtension === 'ttf') return true;
    if (fileExtension === 'otf') return true;
    if (fileExtension === 'eot') return true;
    return false;
}

/**
 * Returns the type of asset based on the given network request resource.
 * @param {Object} resource - The resource to get the asset type from.
 * @returns {string} - The type of asset.
 */
export function getAssetTypeFromResource(resource) {
    const url = resource.name;
    const fileExtension = getFileExtension(url);

    if (isMediaFileExtension(fileExtension)) return 'media';
    if (isImageFileExtension(fileExtension)) return 'image';
    if (isFontFileExtension(fileExtension)) return 'font';

    if (fileExtension === 'css') return 'stylesheet';
    if (fileExtension === 'js') return 'script';
    if (fileExtension === 'json') return 'json';
    if (fileExtension === 'xml') return 'xml';
    if (fileExtension === 'txt') return 'text';
    if (fileExtension === 'pdf') return 'pdf';

    if (resource.initiatorType === 'navigation') return 'document';
    if (resource.initiatorType === 'iframe') return 'iframe';
    if (resource.initiatorType === 'xmlhttprequest') return 'xhr';
    if (resource.initiatorType === 'fetch') return 'fetch';
    if (resource.initiatorType === 'img') return 'image';
    if (resource.initiatorType === 'script') return 'script';
    if (resource.initiatorType === 'css') return 'stylesheet';
    if (resource.initiatorType === 'beacon') return 'beacon';

    console.error('Unknown resource type: ', resource.initiatorType, url);

    return 'unknown';
}

/**
 * Parses performance resources and returns an array of objects containing relevant information.
 * @param {PerformanceResource[]} resources - An array of PerformanceResource objects.
 * @returns {Object[]} - An array of objects containing the following properties:
 *  - url: string
 *  - resourceType: string
 *  - transferSize: number
 *  - fileExtension: string
 */
export function parsePerformanceResources(resources) {
    let output = [];

    for (let i = 0; i < resources.length; i += 1) {
        let resource = resources[i];

        if (
            resource.entryType === 'navigation' ||
            resource.entryType === 'resource'
        ) {
            const resourceType = getAssetTypeFromResource(resource);
            const fileExtension = getFileExtension(resource.name);

            output.push({
                url: resource.name,
                resourceType: resourceType,
                transferSize: resource.transferSize,
                fileExtension: fileExtension,
            });
        }
    }

    return output;
}
