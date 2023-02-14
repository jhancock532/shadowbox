import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./AllWebsiteRequests.module.css";

type AllWebsiteRequestsProps = {
  webpages: any;
  tall?: boolean;
};

// Use dynamic import to prevent server-side rendering of the chart
const RequestSizeComparisonChart = dynamic(
  import("./RequestSizeComparisonChart").then(
    (mod) => mod.RequestSizeComparisonChart
  ),
  { ssr: false }
);

const FILTER_OPTIONS = [
  "document",
  "script",
  "stylesheet",
  "image",
  "font",
  "xhr",
];

const SORT_BY_OPTIONS = ["total", ...FILTER_OPTIONS];

const AllWebsiteRequests = ({ webpages, tall }: AllWebsiteRequestsProps) => {
  const [sortByTag, setSortByTag] = useState("total");
  const [filterByTags, setFilterByTags] = useState<string[]>(FILTER_OPTIONS);

  const sortByOptions = SORT_BY_OPTIONS.map((option) => (
    <div className={styles.option} key={option}>
      <input
        type="radio"
        name="current-language"
        id={option}
        value={option}
        checked={option === sortByTag}
        onChange={(event) => {
          setSortByTag(event.target.value);
        }}
      />
      <label htmlFor={option}>
        {option[0].toUpperCase() + option.substring(1)}
      </label>
    </div>
  ));

  const filterByOptions = FILTER_OPTIONS.map((option) => (
    <div className={styles.option} key={option}>
      <input
        type="checkbox"
        id={option}
        value={option}
        checked={filterByTags.includes(option) === true}
        onChange={(event) => {
          if (filterByTags.includes(event.target.value)) {
            const newTags = [...filterByTags];
            for (var i = 0; i < newTags.length; i++) {
              if (newTags[i] === event.target.value) {
                newTags.splice(i, 1);
              }
            }
            setFilterByTags(newTags);
          } else {
            const newTags = [...filterByTags];
            newTags.push(event.target.value);
            setFilterByTags(newTags);
          }
        }}
      />
      <label htmlFor={option}>
        {option[0].toUpperCase() + option.substring(1)}
      </label>
    </div>
  ));

  return (
    <div className={styles.formContainer}>
      <div className={tall ? styles.chartContainerTall : styles.chartContainer}>
        <RequestSizeComparisonChart
          webpages={webpages}
          sortByTag={sortByTag}
          filterByTags={filterByTags}
        />
      </div>
      <p className={styles.optionsDescription}>Sort by request size</p>
      <div className={styles.optionsContainer}>{sortByOptions}</div>
      <p className={styles.optionsDescription}>Filter by request type</p>
      <div className={styles.optionsContainer}>{filterByOptions}</div>
      <button
        className={styles.resetButton}
        onClick={() => setFilterByTags(FILTER_OPTIONS)}
      >
        Reset Filter
      </button>
    </div>
  );
};

export default AllWebsiteRequests;
