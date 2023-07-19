import path from "path";
import fs from "fs";
import styles from "@/styles/Home.module.css";
import Metadata from "@/components/Metadata";
import Bar from "@/components/Bar";

const COLOR_SCHEME = [
  "#eb4747",
  "#ebb447",
  "#b4eb47",
  "#47b4eb",
  "#4747eb",
  "#eb47b4",
  "#8884d8",
];

export default function Home({ statistics }: { statistics: any }) {
  console.log(statistics);
  return (
    <>
      <Metadata
        title="Torchbox Request Performance Overview"
        description="An overview of the request performance of Torchbox's digital estate."
      />
      <main className={styles.main}>
        <div className="contentContainer">
          <div className={styles.header}>
            <h1>Laridae</h1>
            <p>
              View a breakdown of the requests made by each page listed in
              Torchbox.com&apos;s sitemaps.
              <br />
              <br />
            </p>
          </div>

          {statistics.websiteNetworkRequestSummary.map((page: any) => {
            return (
              <Bar
                key={page.url}
                title={page.url}
                values={page.networkRequestSizeTallies}
                maxValue={statistics.largestWebpageTotalNetworkRequestSize}
                colors={COLOR_SCHEME}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "data/webpages/2023-07-17/networkRequestsSummary.json"
  );
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
