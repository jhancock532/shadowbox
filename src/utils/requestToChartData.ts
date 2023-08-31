export function totalRequestsByType(requests: any) {
    const requestTransferTotals: { [x: string]: number } = {};

    for (let j = 0; j < requests.length; j += 1) {
        const request = requests[j];

        if (request.transferSize) {
            if (
                Object.keys(requestTransferTotals).includes(
                    request.resourceType,
                )
            ) {
                requestTransferTotals[request.resourceType] +=
                    request.transferSize;
            } else {
                requestTransferTotals[request.resourceType] =
                    request.transferSize;
            }
        } else {
            // A few ad tracking requests don't have a transfer size due to CORS restrictions
            // Some other requests don't have a transfer size due to the request being blocked or 404'd
            // console.log(`Forbidden request detected on: ${webpages[i].title}`);
        }
    }

    // eslint-disable-next-line guard-for-in
    for (const key in requestTransferTotals) {
        requestTransferTotals[key] = Math.round(
            requestTransferTotals[key] / 1000,
        );
    }

    return requestTransferTotals;
}
