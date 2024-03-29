import React from 'react';
import { JourneyStep } from './JourneyStep';
import styles from './JourneyComparison.module.css';

// Todo: Move to utils
function calculateTotalResourceTransferSize(resources: any) {
    return resources.reduce(
        (total: number, resource: any) => total + resource.transferSize,
        0,
    );
}
const calculateTotalJourneyTransferSize = (journey: any) => {
    return journey.reduce(
        (total: number, step: any) =>
            total + calculateTotalResourceTransferSize(step.resources),
        0,
    );
};

function JourneySummary({ journey }: { journey: any }) {
    return (
        <p style={{ textAlign: 'center' }}>
            Total journey transfer size:{' '}
            <strong>
                {Math.round(calculateTotalJourneyTransferSize(journey) / 1000)}{' '}
                kB
            </strong>
        </p>
    );
}

export const JourneyComparison = ({ journeys }: { journeys: any }) => {
    const [leftJourneyIndex, setLeftJourneyIndex] = React.useState(0);
    const [rightJourneyIndex, setRightJourneyIndex] = React.useState(1);
    const [showIndividualRequests, setShowIndividualRequests] =
        React.useState(false);
    const [showRequestDetails, setShowRequestDetails] = React.useState(false);

    const leftJourneySelectOptions = (
        <select
            value={leftJourneyIndex}
            id={`leftJourneyIndex`}
            className={styles.journeySelect}
            onChange={(event) => {
                setLeftJourneyIndex(parseInt(event.target.value, 10));
            }}
        >
            {journeys.map((journey: any, index: number) => (
                <option
                    value={index.toString()}
                    key={`left-journey-option--${index}`}
                >
                    {journey[0].url}
                </option>
            ))}
        </select>
    );

    const rightJourneySelectOptions = (
        <select
            value={rightJourneyIndex}
            id={`rightJourneyIndex`}
            className={styles.journeySelect}
            onChange={(event) => {
                setRightJourneyIndex(parseInt(event.target.value, 10));
            }}
        >
            {journeys.map((journey: any, index: number) => (
                <option
                    value={index.toString()}
                    key={`right-journey-option--${index}`}
                >
                    {journey[0].url}
                </option>
            ))}
        </select>
    );

    const leftJourneySteps = journeys[leftJourneyIndex].map(
        (step: any, index: number) => {
            return (
                <JourneyStep
                    key={index}
                    journey={step}
                    showRequestDetails={showRequestDetails}
                    showIndividualRequests={showIndividualRequests}
                />
            );
        },
    );

    const rightJourneySteps = journeys[rightJourneyIndex].map(
        (step: any, index: number) => {
            return (
                <JourneyStep
                    key={index}
                    journey={step}
                    showRequestDetails={showRequestDetails}
                    showIndividualRequests={showIndividualRequests}
                />
            );
        },
    );

    const interleavedJourneySteps = leftJourneySteps.reduce(function (
        arr: any,
        v: any,
        i: number,
    ) {
        return arr.concat(v, rightJourneySteps[i]);
    }, []);

    return (
        <div className="contentContainer">
            <div className={styles.showRequestsForm}>
                <div>
                    <input
                        type="checkbox"
                        id="show-individual-requests"
                        className={styles.showRequestsCheckbox}
                        checked={showIndividualRequests}
                        onChange={() => {
                            setShowIndividualRequests(!showIndividualRequests);
                        }}
                    />
                    <label
                        className={styles.showRequestsLabel}
                        htmlFor="show-individual-requests"
                    >
                        Show individual requests
                    </label>
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="show-request-details"
                        className={styles.showRequestsCheckbox}
                        checked={showRequestDetails}
                        onChange={() => {
                            setShowRequestDetails(!showRequestDetails);
                        }}
                    />
                    <label
                        className={styles.showRequestsLabel}
                        htmlFor="show-request-details"
                    >
                        Show full request details
                    </label>
                </div>
            </div>

            <div className={styles.comparisonForm}>
                <div>
                    <label
                        className={styles.comparisonFormLabel}
                        htmlFor="leftJourneyIndex"
                    >
                        Left Journey
                    </label>
                    {leftJourneySelectOptions}
                </div>
                <div>
                    <label
                        className={styles.comparisonFormLabel}
                        htmlFor="rightJourneyIndex"
                    >
                        Right Journey
                    </label>
                    {rightJourneySelectOptions}
                </div>
            </div>
            <div className={styles.comparisonContainer}>
                {interleavedJourneySteps}
                <JourneySummary journey={journeys[leftJourneyIndex]} />
                <JourneySummary journey={journeys[rightJourneyIndex]} />
            </div>
        </div>
    );
};
