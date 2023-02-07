const CHC = require("chrome-har-capturer");
const fs = require("fs");

const WEBSITE_URLS = [
  "https://torchbox.com",
  "https://torchbox.com/careers",
  "https://www.oxfam.org.uk/",
];

function getDateTimeString() {
  let date_time = new Date();

  // get current date
  // adjust 0 before single digit date
  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = date_time.getHours();
  let minutes = date_time.getMinutes();
  let seconds = date_time.getSeconds();

  return (
    year +
    "-" +
    month +
    "-" +
    date +
    "+" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds
  );
}

function generateWebpageOutputJSON(pages, entries) {
  let output = {};
  output.pages = [];

  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];

    output.pages.push({
      title: page.title,
      id: page.id,
      timings: page.pageTimings,
      requests: [],
    });
  }

  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    let url = entry.request.url;
    let resourceType = entry._resourceType;
    let transferSize = entry.response._transferSize;

    const pageIndex = output.pages.findIndex(
      (page) => page.id === entry.pageref
    );

    output.pages[pageIndex].requests.push({
      url: url,
      resourceType: resourceType,
      transferSize: transferSize,
    });
  }

  return output;
}

function outputStats(minifiedStats) {
  const statJson = JSON.stringify(minifiedStats, null, 4);
  const dateTime = getDateTimeString();
  const statOutput = fs.createWriteStream(
    __dirname.replace("scripts", "data") + `/${dateTime}.json`
  );
  statOutput.write(statJson);
  statOutput.write("\n");
  statOutput.end();
}

/* // Uncomment for debugging purposes
function outputHar(har) {
  const harJson = JSON.stringify(har, null, 4);
  const harOutput = fs.createWriteStream("torchbox-har.json");
  harOutput.write(harJson);
  harOutput.write("\n");
  harOutput.end();
}
*/

CHC.run(WEBSITE_URLS, {
  content: false,
})
  .on("load", (url) => {
    process.stderr.write("loading\n");
  })
  .on("done", (url) => {
    process.stderr.write("done\n");
  })
  .on("fail", (url, err) => {
    process.stderr.write("failed\n");
  })
  .on("har", (har) => {
    let minifiedStats = generateWebpageOutputJSON(
      har.log.pages,
      har.log.entries
    );
    outputStats(minifiedStats);
    process.stderr.write("output\n");
  });
