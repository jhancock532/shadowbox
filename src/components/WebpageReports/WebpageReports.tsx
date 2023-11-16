import IframeReport from './IframeReport';
import FontReport from './FontReport';
import ImageReport from './ImageReport';

export const WebpageReports = ({ requestData, comparedRequestData }: any) => {
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

            <IframeReport requestData={requestData} />
        </>
    );
};
