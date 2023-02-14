import Head from "next/head";
import Link from "next/link";
import path from "path";
import fs from "fs";
// import WebsiteSummary from "@/components/WebsiteSummary";
import styles from "@/styles/Home.module.css";
import Metadata from "@/components/Metadata";

export default function Home({ statistics }: { statistics: any }) {
  return (
    <>
      <Metadata
        title="Torchbox Request Performance Overview"
        description="An overview of the request performance of Torchbox's digital estate."
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Site Results</h1>
        <p className={styles.description}>
          View a detailed breakdown of the requests made to each page in
          Torchbox&apos;s digital estate.
        </p>
        <ul className={styles.links}>
          <li>
            <Link href="/main">torchbox.com</Link>
          </li>
          <li className={styles.link}>
            <Link href="/careers">/careers/</Link>
          </li>
          <li className={styles.link}>
            <Link href="/super-trumps">/seo-super-trumps/</Link>
          </li>
        </ul>
        {/* <div className={styles.grid}>
          {statistics.pages.map((website: any) => (
            <WebsiteSummary key={website.id} webpage={website} />
          ))}
        </div> */}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/2023-02-07+17:20:00.json");
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
