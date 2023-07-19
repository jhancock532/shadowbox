// import path from "path";
// import fs from "fs";
// import styles from "@/styles/Home.module.css";
// import Metadata from "@/components/Metadata";
// import RequestVisualiser from "@/components/RequestVisualiser";

// export default function Home({ statistics }: { statistics: any }) {
//   return (
//     <>
//       <Metadata
//         title="Torchbox Request Performance Overview"
//         description="An overview of the request performance of Torchbox's digital estate."
//       />
//       <main className={styles.main}>
//         <div className="contentContainer">
//           <div className={styles.header}>
//             <h1>Torchbox.com Network Request Audit</h1>
//             <p>
//               View a breakdown of the requests made by each page listed in
//               Torchbox.com&apos;s sitemaps.
//             </p>
//           </div>
//         </div>

//         <RequestVisualiser webpages={statistics.pages} />
//       </main>
//     </>
//   );
// }

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), "data/chi-2023-06-20.json");
//   const fileData = fs.readFileSync(filePath);
//   const statistics = JSON.parse(fileData as unknown as string);

//   return {
//     props: {
//       statistics: statistics,
//     },
//   };
// }
