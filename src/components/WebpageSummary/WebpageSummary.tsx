import styles from "./WebpageSummary.module.css";

type WebpageSummaryProps = {
  webpage: any;
};

const WebpageSummary = ({ webpage }: WebpageSummaryProps) => {
  let totalPageSize = 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <a href={webpage.title}>{webpage.title}</a>
      </h2>
      <p className={styles.keyStatistic}>
        Content load:{" "}
        <strong>{Math.floor(webpage.timings.onContentLoad)}ms</strong>
      </p>
      <p className={styles.keyStatistic}>
        Page load: <strong>{Math.floor(webpage.timings.onLoad)}ms</strong>
      </p>
    </div>
  );
};

export default WebpageSummary;
