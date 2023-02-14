import path from "path";
import fs from "fs";
import AllWebsiteRequests from "@/components/AllWebsiteRequests";
import Metadata from "@/components/Metadata";
import styles from "@/styles/Home.module.css";

export default function MainSiteDetails({ statistics }: { statistics: any }) {
  return (
    <>
      <Metadata
        title="Torchbox.com Request Overview"
        description="An overview of all the requests made when loading the torchbox.com website."
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Compared Results</h1>
        <p className={styles.description}>
          Here are the request statistics for different pages within
          https://torchbox.com.
        </p>

        <AllWebsiteRequests webpages={statistics.pages} tall />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "data/main-2023-02-14+10:46:30.json"
  );
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
