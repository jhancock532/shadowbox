import { totalRequestsByType } from "@/utils/requestToChartData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { BAR_COLORS } from "@/utils/constants";

// todo: utils file?
function chartDataByIndividualRequest(requests: any) {
  const data: any[] | undefined = [];

  // sort requests by size
  requests.sort((a: any, b: any) => {
    return b.transferSize - a.transferSize;
  });

  requests.map((resource: any) => {
    data.push({
      name: resource.url,
      size: resource.transferSize,
    });
  });

  return data;
}

// todo: utils file?
function chartDataByRequestType(requests: any) {
  const totalRequestSizesByType = totalRequestsByType(requests);

  const data: any[] | undefined = [];

  for (const key in totalRequestSizesByType) {
    data.push({
      name: key,
      size: totalRequestSizesByType[key],
      fill: BAR_COLORS[key],
    });
  }

  return data;
}

export const JourneyStepChart = ({ requests }: { requests: any }) => {
  const data = chartDataByIndividualRequest(requests);

  const newData = chartDataByRequestType(requests);

  return (
    <BarChart
      width={500}
      height={300}
      data={newData}
      layout="vertical"
      margin={{
        top: 40,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <Bar dataKey="size" fill="#777777" />
      <XAxis type="number" />
      <YAxis
        type="category"
        dataKey="name"
        tick={false}
        label={{ value: "Requests", angle: -90, position: "inside" }}
      />
      <Tooltip />
      <Legend />
    </BarChart>
  );
};
