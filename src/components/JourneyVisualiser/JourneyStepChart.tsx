import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function chartDataByIndividualSize(resources: any) {
  const data: any[] | undefined = [];

  // sort resources by size
  resources.sort((a: any, b: any) => {
    return b.transferSize - a.transferSize;
  });

  resources.map((resource: any) => {
    data.push({
      name: resource.url,
      size: resource.transferSize,
    });
  });

  return data;
}

export const JourneyStepChart = ({ resources }: { resources: any }) => {
  const data = chartDataByIndividualSize(resources);

  return (
    <BarChart
      width={550}
      height={20 * data.length}
      data={data}
      layout="vertical"
      margin={{
        top: 40,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <Bar dataKey="size" fill="#8884d8" />
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
