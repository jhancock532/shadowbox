import path from "path";
import fs from "fs";
import styles from "@/styles/Home.module.css";
import Metadata from "@/components/Metadata";
import RequestVisualiser from "@/components/RequestVisualiser";

export default function Home({ statistics }: { statistics: any }) {
  return (
    <>
      <Metadata
        title="RNIB Request Performance Overview"
        description="An overview of the request performance of Torchbox's digital estate."
      />
      <main className={styles.main}>
        <div className="contentContainer">
          <div className={styles.header}>
            <h1>RNIB Network Request Audit</h1>
            <p>
              View a breakdown of the requests made by each page listed in
              RNIB&apos;s sitemaps.
            </p>
          </div>
        </div>

        <RequestVisualiser webpages={statistics.pages} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  // const filePath = path.join(process.cwd(), "data/combined-2023-02-14.json"); // tbx sites
  const filePath = path.join(process.cwd(), "data/rnib-2023-04-25.json"); // tbx sites
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
