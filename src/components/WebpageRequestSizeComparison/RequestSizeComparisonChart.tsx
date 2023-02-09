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

function generateWebpageRequestComparisonChartData(webpages: any[]) {
  const data = [];

  for (let i = 0; i < webpages.length; i++) {
    const requests = webpages[i].requests;

    const requestTransferTotals: { [x: string]: number } = {};

    for (let j = 0; j < requests.length; j++) {
      const request = requests[j];

      if (Object.keys(requestTransferTotals).includes(request.resourceType)) {
        requestTransferTotals[request.resourceType] += request.transferSize;
      } else {
        requestTransferTotals[request.resourceType] = request.transferSize;
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

  console.log(data);

  return data;
}

export function RequestSizeComparisonChart({ webpages }: { webpages: any }) {
  return (
    <ResponsiveContainer>
      <BarChart
        id="request-size-comparison-chart"
        layout="vertical"
        // barCategoryGap={1}
        data={generateWebpageRequestComparisonChartData(webpages)}
        margin={{
          top: 30,
          right: 0,
          left: 100,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="document" stackId="a" fill="#007380" />
        <Bar dataKey="script" stackId="a" fill="#008B7B" />
        <Bar dataKey="image" stackId="a" fill="#00A270" />
        <Bar dataKey="stylesheet" stackId="a" fill="#00B863" />
        <Bar dataKey="font" stackId="a" fill="#70CC55" />
        <Bar dataKey="xhr" stackId="a" fill="#B3DE4B" />
      </BarChart>
    </ResponsiveContainer>
  );
}
