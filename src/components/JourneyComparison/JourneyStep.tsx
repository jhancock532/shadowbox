import dynamic from 'next/dynamic';
import styles from './JourneyStep.module.css';

const JourneyStepChart = dynamic(
    import('./JourneyStepChart').then((mod) => mod.JourneyStepChart),
    { ssr: false },
);

// todo: move to utils
function calculateTotalResourceTransferSize(resources: any) {
    return resources.reduce(
        (total: number, resource: any) => total + resource.transferSize,
        0,
    );
}

const RequestList = ({ requests }: { requests: any }) => {
    return (
        <div className={styles.requestList}>
            {requests.map((request: any) => (
                <div key={request.url} className={styles.request}>
                    <strong>{Math.round(request.transferSize / 1000)}kB</strong>
                    <span className={styles.requestUrl}>{request.url}</span>
                </div>
            ))}
        </div>
    );
};

export const JourneyStep = ({
    journey,
    showRequestDetails,
    showIndividualRequests,
}: {
    journey: any;
    showRequestDetails: boolean;
    showIndividualRequests: boolean;
}) => {
    const resources = journey.resources;

    const totalRequestTransferSize = Math.round(
        calculateTotalResourceTransferSize(resources) / 1000,
    );

    const maxTitleLength = 35;
    const truncatedStepTitle =
        journey.url.length > maxTitleLength
            ? '...' + journey.url.substring(journey.url.length - maxTitleLength)
            : journey.url;

    return (
        <div>
            <p className={styles.title}>{truncatedStepTitle}</p>
            {showRequestDetails ? (
                <RequestList requests={resources} />
            ) : (
                <JourneyStepChart
                    requests={resources}
                    showIndividualRequests={showIndividualRequests}
                />
            )}
            <p>
                {journey.resources.length} requests totalling{' '}
                {totalRequestTransferSize} kB
            </p>
        </div>
    );
};
