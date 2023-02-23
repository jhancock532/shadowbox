import path from "path";
import fs from "fs";
import styles from "@/styles/Home.module.css";
import Metadata from "@/components/Metadata";
import AllWebsiteRequests from "@/components/AllWebsiteRequests";
import Link from "next/link";

export default function Home({ statistics }: { statistics: any }) {
  return (
    <>
      <Metadata
        title="Torchbox Request Performance Overview"
        description="An overview of the request performance of Torchbox's digital estate."
      />
      <main className={styles.main}>
        <div className="contentContainer">
          <div className={styles.header}>
            <h1>Torchbox.com Network Request Audit</h1>
            <p>
              View a breakdown of the requests made by each page listed in
              Torchbox.com&apos;s sitemaps.
            </p>
          </div>
          <h2>General statistics</h2>
          <p>
            <strong>{statistics.pages.length}</strong> pages were analysed
            across <strong>3</strong> sitemaps.
          </p>

          <p>
            Sitemaps were found at <Link href="/main">torchbox.com</Link>,{" "}
            <Link href="/careers">/careers/</Link>,{" "}
            <Link href="/super-trumps">/seo-super-trumps/</Link>.
          </p>
        </div>

        <AllWebsiteRequests webpages={statistics.pages} tall />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/combined-2023-02-14.json");
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  return {
    props: {
      statistics: statistics,
    },
  };
}
