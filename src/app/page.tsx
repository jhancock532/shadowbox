import path from "path";
import fs from "fs";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Header from "@/components/Header";

const filePath = path.join(process.cwd(), `data/`);

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const fileData = getDirectories(filePath);

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.header}>
          <Header websiteName="torchbox.com" />
          <h1>Site reports</h1>
          {fileData.map((page: any) => {
            return (
              <p key={page}>
                <Link href={`/${page}`}>{page}</Link>
              </p>
            );
          })}
        </div>
      </main>
    </>
  );
}
