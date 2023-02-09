import dynamic from "next/dynamic";

type WebpageRequestSizeComparisonProps = {
  webpages: any;
};

// Use dynamic import to prevent server-side rendering of the chart
const RequestSizeComparisonChart = dynamic(
  import("./RequestSizeComparisonChart").then(
    (mod) => mod.RequestSizeComparisonChart
  ),
  { ssr: false }
);

const WebpageRequestSizeComparison = ({
  webpages,
}: WebpageRequestSizeComparisonProps) => {
  return (
    <div>
      <RequestSizeComparisonChart webpages={webpages} />
    </div>
  );
};

export default WebpageRequestSizeComparison;
