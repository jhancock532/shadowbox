#!/usr/bin/env node
"use strict";

const CHC = require("chrome-har-capturer");
const fs = require("fs");
const chalk = require("chalk");
const { parse, format } = require("url");

const TORCHBOX_URLS = [
  "https://torchbox.com/",
  "https://torchbox.com/digital-products/",
  "https://torchbox.com/wagtail-cms/",
  "https://torchbox.com/digital-marketing/",
  "https://torchbox.com/blog/",
  "https://torchbox.com/team/",
  "https://torchbox.com/careers/",
  "https://torchbox.com/careers/jobs/",
  "https://torchbox.com/careers/about-us/",
  "https://torchbox.com/careers/academy/",
  "https://torchbox.com/seo-super-trumps/",
  "https://torchbox.com/seo-super-trumps/state-of-the-sector/",
  "https://torchbox.com/seo-super-trumps/childrens-charities/",
  "https://torchbox.com/seo-super-trumps/homelessness-charity-seo/",
];

const OXFAM_URLS = [
  "https://www.oxfam.org.uk/",
  "https://www.oxfam.org.uk/donate/",
  "https://www.oxfam.org.uk/about-us/",
  "https://www.oxfam.org.uk/get-involved/fundraise-with-oxfam/pay-your-fundraising/",
  "https://www.oxfam.org.uk/about-us/working-oxfam/oxfam-trainee-scheme/",
  "https://www.oxfam.org.uk/oxfam-in-action/water-for-all/",
  "https://www.oxfam.org.uk/oxfam-in-action/impact-stories/emmily-celebrating-getting-water-running-zimbabwe/",
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

  return `${year}-${month}-${date}+${hours}:${minutes}:${seconds}`;
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

function prettify(url) {
  try {
    const urlObject = parse(url);
    urlObject.protocol = chalk.gray(urlObject.protocol.slice(0, -1));
    urlObject.host = chalk.bold(urlObject.host);
    return format(urlObject).replace(/[:/?=#]/g, chalk.gray("$&"));
  } catch (err) {
    // invalid URL delegate error detection
    return url;
  }
}

function log(string) {
  process.stderr.write(string);
}

CHC.run(TORCHBOX_URLS, {
  content: false,
})
  .on("load", (url) => {
    log(`- ${prettify(url)} `);
  })
  .on("done", (url) => {
    log(chalk.green("✓\n"));
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
    log("\n");
    log(
      chalk.bold(chalk.bgGreen(chalk.black(" * Success! * "))) +
        "\nResults saved to data folder.\n"
    );
  });
