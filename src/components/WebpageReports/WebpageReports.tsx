import EmbedReport from './EmbedReport';
import FontReport from './FontReport';
import ImageReport from './ImageReport';

export const WebpageReports = ({
    requestData,
    comparedRequestData,
    metadata,
}: any) => {
    return (
        <>
            <ImageReport
                requestData={requestData}
                comparedRequestData={comparedRequestData}
            />

            <FontReport
                requestData={requestData}
                comparedRequestData={comparedRequestData}
            />

            <EmbedReport metadata={metadata} />
        </>
    );
};
