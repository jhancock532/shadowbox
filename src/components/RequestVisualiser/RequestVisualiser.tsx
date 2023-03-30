import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { FILTER_OPTIONS } from "../../utils/constants";
import styles from "./RequestVisualiser.module.css";

type RequestVisualiserProps = {
  webpages: any;
};

// Use dynamic import to prevent server-side rendering of the chart,
// Rechart doesn't work with SSR.
const RequestSizeComparisonChart = dynamic(
  import("./RequestSizeComparisonChart").then(
    (mod) => mod.RequestSizeComparisonChart
  ),
  { ssr: false }
);

function generatePathFilters(webpages: any) {
  const pathFilters = new Set();

  for (const page of webpages) {
    const firstSubdirectoryName = new URL(page.title).pathname.split("/")[1];
    pathFilters.add(firstSubdirectoryName);
  }

  return Array.from(pathFilters);
}

const SORT_BY_OPTIONS = ["total", ...FILTER_OPTIONS];

const RequestVisualiser = ({ webpages }: RequestVisualiserProps) => {
  const [sortByType, setSortByType] = useState<string>("total");
  const [paginationStart, setPaginationStart] = useState<number>(0);
  const [paginationEnd, setPaginationEnd] = useState<number>(25);
  const [paginationTotal, setPaginationTotal] = useState<number>(
    webpages.length
  );
  const [filterByPath, setFilterByPath] = useState<string>("");
  const [showAverageWebpageSize, setShowAverageWebpageSize] =
    useState<boolean>(false);
  const [showMedianWebpageSize, setShowMedianWebpageSize] =
    useState<boolean>(false);

  const sortByTypeIdCode = useId();
  const filterByPathIdCode = useId();
  const filterByPathId = `filter-by-path-input-${filterByPathIdCode}`;
  const sortByTypeId = `sort-by-type-input-${sortByTypeIdCode}`;

  const pathFilterOptions = generatePathFilters(webpages);

  const reducePagination = () => {
    if (paginationStart >= 25) {
      setPaginationStart(paginationStart - 25);
      setPaginationEnd(paginationEnd - 25);
    } else {
      setPaginationStart(0);
      setPaginationEnd(25);
    }
  };

  const increasePagination = () => {
    if (paginationEnd <= paginationTotal - 25) {
      setPaginationStart(paginationStart + 25);
      setPaginationEnd(paginationEnd + 25);
    } else {
      setPaginationStart(paginationTotal - 25);
      setPaginationEnd(paginationTotal);
    }
  };

  const sortByTypeOptions = (
    <select
      id={sortByTypeId}
      value={sortByType}
      className={styles.pageFilterOptionSelect}
      onChange={(event) => {
        setSortByType(event.target.value);
      }}
    >
      {SORT_BY_OPTIONS.map((option) => (
        <option value={option} key={`sort-by-option--${option}`}>
          {option[0].toUpperCase() + option.substring(1)}
        </option>
      ))}
    </select>
  );

  const filterByPathOptions = (
    <select
      value={filterByPath}
      id={filterByPathId}
      className={styles.pageFilterOptionSelect}
      onChange={(event) => {
        setFilterByPath(event.target.value);
      }}
    >
      {pathFilterOptions.map((path) => (
        <option value={path as string} key={`filter-by-path-option--${path}`}>
          {path as string}
        </option>
      ))}
    </select>
  );

  return (
    <div className={styles.container}>
      <div className="contentContainer">
        <div className={styles.pageFilterOptions}>
          <div className={styles.pageFilterOption}>
            <label
              htmlFor={sortByTypeId}
              className={styles.pageFilterOptionDescription}
            >
              Sort by type:
            </label>
            <div className={styles.optionsContainer}>{sortByTypeOptions}</div>
          </div>
          <div className={styles.pageFilterOption}>
            <label
              htmlFor={filterByPathId}
              className={styles.pageFilterOptionDescription}
            >
              Filter by path:
            </label>
            <div className={styles.optionsContainer}>{filterByPathOptions}</div>
          </div>
          <div className={styles.paginationControls}>
            <p className={styles.paginationDescription}>
              <strong>{paginationStart}</strong> to{" "}
              <strong>{paginationEnd}</strong> of{" "}
              <strong>{paginationTotal}</strong> pages
            </p>
            <div className={styles.paginationButtons}>
              <button
                className={styles.paginationButton}
                onClick={() => reducePagination()}
              >{`<`}</button>
              <button
                className={styles.paginationButton}
                onClick={() => increasePagination()}
              >{`>`}</button>
            </div>
          </div>
        </div>

        <div className={styles.lineMarkerOptions}>
          <p className={styles.lineMarkerOptionsTitle}>Marker Lines:</p>
          <div className={styles.lineMarkerOption}>
            <input
              type="checkbox"
              id="show-median-webpage-line-marker"
              checked={showMedianWebpageSize}
              onChange={() => {
                setShowMedianWebpageSize(!showMedianWebpageSize);
              }}
            />
            <label
              className={styles.lineMarkerLabel}
              htmlFor="show-median-webpage-line-marker"
            >
              Show median webpage size
              <div className={styles.medianWebpageLineDemonstrator}></div>
            </label>
          </div>

          <div className={styles.lineMarkerOption}>
            <input
              type="checkbox"
              id="show-average-webpage-line-marker"
              checked={showAverageWebpageSize}
              onChange={() => {
                setShowAverageWebpageSize(!showAverageWebpageSize);
              }}
            />
            <label
              className={styles.lineMarkerLabel}
              htmlFor="show-average-webpage-line-marker"
            >
              Show average webpage size
              <div className={styles.averageWebpageLineDemonstrator}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Add custom class to div as responsive chart container doesn't style height correctly otherwise. */}
      <div className={styles.chartContainer}>
        <RequestSizeComparisonChart
          webpages={webpages}
          sortByTag={sortByType}
          filterByPath={filterByPath}
          paginationStart={paginationStart}
          paginationEnd={paginationEnd}
          setPaginationTotal={setPaginationTotal}
          showAverageWebpageSize={showAverageWebpageSize}
          showMedianWebpageSize={showMedianWebpageSize}
        />
      </div>
    </div>
  );
};

export default RequestVisualiser;
