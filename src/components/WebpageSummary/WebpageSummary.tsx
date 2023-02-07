import styles from "./WebpageSummary.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type RequestType = {
  url: string;
  resourceType: string;
  transferSize: number;
};

function generateChartDataByResourceType(requests: RequestType[]) {
  const requestTransferSizes: { [x: string]: number } = {};

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];

    if (Object.keys(requestTransferSizes).includes(request.resourceType)) {
      requestTransferSizes[request.resourceType] += request.transferSize;
    } else {
      requestTransferSizes[request.resourceType] = request.transferSize;
    }
  }

  const data = [];

  for (const key in requestTransferSizes) {
    data.push({
      name: key,
      kB: Math.round(requestTransferSizes[key] / 1000),
      fill: `hsl(${data.length * 10 + 240}, 80%, 60%)`,
    });
  }

  return data;
}

type WebpageSummaryProps = {
  webpage: any;
};

const WebpageSummary = ({ webpage }: WebpageSummaryProps) => {
  let totalPageSize = 0;

  for (let i = 0; i < webpage.requests.length; i++) {
    totalPageSize += webpage.requests[i].transferSize;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <a target="_blank" rel="noreferrer" href={webpage.title}>
          {webpage.title}
        </a>
      </h2>
      <p className={styles.keyStatistic}>
        Content load:{" "}
        <strong>{Math.floor(webpage.timings.onContentLoad)}ms</strong>
      </p>
      <p className={styles.keyStatistic}>
        Page load: <strong>{Math.floor(webpage.timings.onLoad)}ms</strong>
      </p>
      <p className={styles.keyStatistic}>
        Total requests: <strong>{webpage.requests.length}</strong>
      </p>
      <p className={styles.keyStatistic}>
        Page weight: <strong>{Math.floor(totalPageSize / 1000)}kb</strong>
      </p>

      <BarChart
        width={520}
        height={300}
        data={generateChartDataByResourceType(webpage.requests)}
        margin={{
          top: 30,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="kB" fill="#555" />
      </BarChart>
    </div>
  );
};

export default WebpageSummary;
