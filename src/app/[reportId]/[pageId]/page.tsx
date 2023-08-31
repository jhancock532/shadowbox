import {
    loadWebpageMetadata,
    loadWebpageNetworkRequests,
} from '@/utils/loadFileData';

export default function ReportPageDetailsView({ params }: any) {
    const networkRequests = loadWebpageNetworkRequests(
        params.reportId,
        params.pageId,
    );
    const metadata = loadWebpageMetadata(params.reportId, params.pageId);

    return (
        <div>
            <h1>Network requests for {metadata.url}</h1>
            <div>{JSON.stringify(networkRequests)}</div>
        </div>
    );
}
