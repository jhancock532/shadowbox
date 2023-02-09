import Head from "next/head";
import styles from "@/styles/Home.module.css";
import path from "path";
import fs from "fs";
import WebpageRequestSizeComparison from "@/components/WebpageRequestSizeComparison";

export default function Home({ statistics }: { statistics: any }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Compared Results</h1>
        <p className={styles.description}>
          Here are the request statistics for different pages within the site.
        </p>

        <div className={styles.chartContainer}>
          <WebpageRequestSizeComparison webpages={statistics.pages} />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/2023-02-09+17:29:32.json");
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
