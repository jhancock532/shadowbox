import Head from "next/head";
import styles from "@/styles/Home.module.css";
import path from "path";
import fs from "fs";
import AllWebsiteRequests from "@/components/AllWebsiteRequests";
import Metadata from "@/components/Metadata";

export default function SuperTrumpsSiteDetails({
  statistics,
}: {
  statistics: any;
}) {
  return (
    <>
      <Metadata
        title="Super Trumps Request Overview"
        description="An overview of all the requests made when loading the torchbox.com/super-trumps-seo website."
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Compared Results</h1>
        <p className={styles.description}>
          Here are the request statistics for different pages within
          torchbox.com/super-trumps-seo
        </p>

        <AllWebsiteRequests webpages={statistics.pages} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "data/super-trumps-2023-02-14+13:43:41.json"
  );
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
