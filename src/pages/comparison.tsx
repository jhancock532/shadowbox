import path from "path";
import fs from "fs";
import styles from "@/styles/Home.module.css";
import Metadata from "@/components/Metadata";
import JourneyComparison from "@/components/JourneyComparison";

export default function Comparison({ journeys }: { journeys: any }) {
  return (
    <>
      <Metadata
        title="User Journey Comparison"
        description="Comparing the requests made by two different user journeys."
      />
      <main className={styles.main}>
        <div className="contentContainer">
          <div className={styles.header}>
            <h1>User Journey Comparison</h1>
            <p>Comparing the requests made by two different user journeys.</p>
          </div>
        </div>

        <JourneyComparison journeys={journeys} />
      </main>
    </>
  );
}

async function loadJSONFilesFromDirectory(directoryPath: string) {
  let filesList = [];

  const files = await fs.promises.readdir(directoryPath);

  for (let file of files) {
    if (file.endsWith(".json")) {
      const data = await fs.promises.readFile(
        `${directoryPath}/${file}`,
        "utf8"
      );
      filesList.push(JSON.parse(data));
    }
  }

  return filesList;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data/journey-results");
  const userJourneys = await loadJSONFilesFromDirectory(filePath);

  return {
    props: {
      journeys: userJourneys,
    },
  };
}