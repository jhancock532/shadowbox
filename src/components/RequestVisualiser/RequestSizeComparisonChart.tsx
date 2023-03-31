import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  BAR_COLORS,
  FILTER_OPTIONS,
  NetworkRequest,
} from "../../utils/constants";

function generateWebpageRequestComparisonChartData(
  webpages: any[],
  sortByTag: string,
  filterByPath: string,
  paginationStart: number,
  paginationEnd: number,
  setPaginationTotal: (value: number) => void
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
        // A few ad tracking requests don't have a transfer size due to CORS restrictions
        // Some other requests don't have a transfer size due to the request being blocked or 404'd
        // console.log(`Forbidden request detected on: ${webpages[i].title}`);
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

  const filteredData = data.filter((item) => {
    if ((item.name as string).includes(filterByPath)) {
      return true;
    }
    return false;
  });

  if (sortByTag === "total") {
    // When sorting by the total page size, sum all the request totals for each type
    const sortedResults = filteredData.sort((a, b) => {
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

      return bTotal - aTotal;
    });

    setPaginationTotal(sortedResults.length);

    const paginatedResults = sortedResults.slice(
      paginationStart,
      paginationEnd
    );

    return paginatedResults;
  }

  // Remove all the results that don't have a value for the sorting tag
  const dataFilteredBySortingTag = filteredData.filter((item) => {
    if (item[sortByTag] !== undefined && item[sortByTag] !== 0) {
      return true;
    }
    return false;
  });

  const newData = dataFilteredBySortingTag.sort((a, b) => {
    return (b[sortByTag] as number) - (a[sortByTag] as number);
  });

  setPaginationTotal(newData.length);

  const paginatedResults = newData.slice(paginationStart, paginationEnd);

  return paginatedResults;
}
function findTotalWebpageSizeStatistics(webpages: any[]) {
  const totalWebpageSizes = [];

  for (let i = 0; i < webpages.length; i++) {
    const requests = webpages[i].requests;

    let requestTransferTotal = 0;

    for (let j = 0; j < requests.length; j++) {
      const request = requests[j];

      if (request.transferSize) {
        requestTransferTotal += request.transferSize;
      }
    }

    requestTransferTotal = Math.round(requestTransferTotal / 1000);
    totalWebpageSizes.push(requestTransferTotal);
  }

  const sortedPageSizes = totalWebpageSizes.sort((a, b) => {
    return b - a;
  });

  return {
    largestWebpageSize: sortedPageSizes[0],
    averageWebpageSize: Math.round(
      sortedPageSizes.reduce((a, b) => a + b, 0) / sortedPageSizes.length
    ),
    medianWebpageSize: sortedPageSizes[Math.floor(sortedPageSizes.length / 2)],
  };
}

type RequestSizeComparisonChartProps = {
  webpages: any;
  sortByTag: string;
  filterByPath: string;
  paginationStart: number;
  paginationEnd: number;
  setPaginationTotal: (value: number) => void;
  showAverageWebpageSize: boolean;
  showMedianWebpageSize: boolean;
};

export function RequestSizeComparisonChart({
  webpages,
  sortByTag,
  filterByPath,
  paginationStart,
  paginationEnd,
  setPaginationTotal,
  showAverageWebpageSize,
  showMedianWebpageSize,
}: RequestSizeComparisonChartProps) {
  const orderedBarsArray = [];

  if (sortByTag !== "total") {
    orderedBarsArray.push(sortByTag);
  }

  FILTER_OPTIONS.forEach((option) => {
    if (option !== sortByTag) {
      orderedBarsArray.push(option);
    }
  });

  const bars = orderedBarsArray.map((option) => (
    <Bar
      key={option}
      dataKey={option}
      stackId="a"
      fill={BAR_COLORS[option as NetworkRequest]}
    />
  ));

  const { largestWebpageSize, averageWebpageSize, medianWebpageSize } =
    findTotalWebpageSizeStatistics(webpages);

  return (
    <ResponsiveContainer>
      <BarChart
        id="request-size-comparison-chart"
        layout="vertical"
        data={generateWebpageRequestComparisonChartData(
          webpages,
          sortByTag,
          filterByPath,
          paginationStart,
          paginationEnd,
          setPaginationTotal
        )}
        margin={{
          top: 30,
          right: 0,
          left: 300,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickCount={10} domain={[0, largestWebpageSize]} />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        {bars}
        {showAverageWebpageSize && (
          <ReferenceLine
            x={averageWebpageSize}
            stroke="#c95b00"
            strokeWidth="3"
          />
        )}
        {showMedianWebpageSize && (
          <ReferenceLine
            x={medianWebpageSize}
            stroke="#423cbe"
            strokeWidth="3"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
