import dynamic from "next/dynamic";
import styles from "./JourneyStep.module.css";

const JourneyStepChart = dynamic(
  import("./JourneyStepChart").then((mod) => mod.JourneyStepChart),
  { ssr: false }
);

// todo: move to utils
function calculateTotalResourceTransferSize(resources: any) {
  return resources.reduce(
    (total: number, resource: any) => total + resource.transferSize,
    0
  );
}

export const JourneyStep = ({ journey }: { journey: any }) => {
  const resources = journey.resources;

  const totalRequestTransferSize = Math.round(
    calculateTotalResourceTransferSize(resources) / 1000
  );

  const maxTitleLength = 35;
  const truncatedStepTitle =
    journey.url.length > maxTitleLength
      ? "..." + journey.url.substring(journey.url.length - maxTitleLength)
      : journey.url;

  return (
    <div>
      <p className={styles.title}>{truncatedStepTitle}</p>
      <JourneyStepChart requests={resources} />
      <p>
        {journey.resources.length} requests totalling {totalRequestTransferSize}{" "}
        kB
      </p>
    </div>
  );
};
