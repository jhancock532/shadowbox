import path from "path";
import fs from "fs";
import Bar from "@/components/Bar";
import styles from "@/styles/Home.module.css";

export default function ReportPageDetailsView({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    `data/${params.date}/${params.pageUrl}/networkRequests.json`
  );
  const fileData = fs.readFileSync(filePath);
  const statistics = JSON.parse(fileData as unknown as string);

  const max = statistics.reduce((acc: number, curr: any) => {
    return acc + curr.size;
  }, 0);

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Network requests for page URL: {params.pageUrl}</h1>
      </div>
      {statistics.map((page: any) => {
        return (
          <Bar
            key={page.url}
            title={page.url}
            values={[page]}
            maxValue={max}
            colors={[
              "#eb4747",
              "#ebb447",
              "#b4eb47",
              "#47b4eb",
              "#4747eb",
              "#eb47b4",
              "#8884d8",
            ]}
          />
        );
      })}
    </main>
  );
}
