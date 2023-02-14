import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function generateWebpageRequestComparisonChartData(
  webpages: any[],
  sortByTag: string
) {
  const data = [];

  for (let i = 0; i < webpages.length; i++) {
    const requests = webpages[i].requests;

    const requestTransferTotals: { [x: string]: number } = {};

    for (let j = 0; j < requests.length; j++) {
      const request = requests[j];

      if (request.transferSize) {
        if (Object.keys(requestTransferTotals).includes(request.resourceType)) {
          requestTransferTotals[request.resourceType] += request.transferSize;
        } else {
          requestTransferTotals[request.resourceType] = request.transferSize;
        }
      } else {
        console.log(`Forbidden request detected on: ${webpages[i].title}`);
      }
    }

    const axisLabel = new URL(webpages[i].title).pathname;

    const requestTypes: { [x: string]: number | string } = {
      name: axisLabel,
    };

    for (const key in requestTransferTotals) {
      requestTypes[key] = Math.round(requestTransferTotals[key] / 1000);
    }

    data.push(requestTypes);
  }

  if (sortByTag === "total") {
    // When sorting by the total page size, sum all the request totals for each type
    return data.sort((a, b) => {
      let aTotal = 0;
      let bTotal = 0;

      for (const key in a) {
        if (key !== "name") {
          aTotal += a[key] as number;
        }
      }

      for (const key in b) {
        if (key !== "name") {
          bTotal += b[key] as number;
        }
      }

      return aTotal - bTotal;
    });
  }

  const newData = data.sort((a, b) => {
    if (a[sortByTag] === undefined || b[sortByTag] === undefined) {
      return -1;
    }
    return (a[sortByTag] as number) - (b[sortByTag] as number);
  });

  return newData;
}

type RequestSizeComparisonChartProps = {
  webpages: any;
  sortByTag: string;
  filterByTags: string[];
};

export function RequestSizeComparisonChart({
  webpages,
  sortByTag,
  filterByTags,
}: RequestSizeComparisonChartProps) {
  return (
    <ResponsiveContainer>
      <BarChart
        id="request-size-comparison-chart"
        layout="vertical"
        data={generateWebpageRequestComparisonChartData(webpages, sortByTag)}
        margin={{
          top: 30,
          right: 0,
          left: 300,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickCount={9} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        {filterByTags.includes("document") ? (
          <Bar dataKey="document" stackId="a" fill="#eb4747" />
        ) : undefined}
        {filterByTags.includes("script") ? (
          <Bar dataKey="script" stackId="a" fill="#ebb447" />
        ) : undefined}
        {filterByTags.includes("image") ? (
          <Bar dataKey="image" stackId="a" fill="#b4eb47" />
        ) : undefined}
        {filterByTags.includes("font") ? (
          <Bar dataKey="font" stackId="a" fill="#47b4eb" />
        ) : undefined}
        {filterByTags.includes("stylesheet") ? (
          <Bar dataKey="stylesheet" stackId="a" fill="#4747eb" />
        ) : undefined}
        {filterByTags.includes("xhr") ? (
          <Bar dataKey="xhr" stackId="a" fill="#eb47b4" />
        ) : undefined}
      </BarChart>
    </ResponsiveContainer>
  );
}
