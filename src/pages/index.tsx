import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import path from "path";
import fs from "fs";
import WebpageSummary from "@/components/WebpageSummary";

const inter = Inter({ subsets: ["latin"] });

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
        <h1 className={styles.title}>Site Results</h1>
        <p className={styles.description}>
          Here are the current site statistics.
        </p>
        <div className={styles.grid}>
          {statistics.pages.map((website: any) => (
            <WebpageSummary key={website.id} webpage={website} />
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/2023-02-07+11:39:44.json");
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}