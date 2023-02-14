#!/usr/bin/env node
"use strict";

const CHC = require("chrome-har-capturer");
const fs = require("fs");
const chalk = require("chalk");
const parser = require("xml2json");
const { parse, format } = require("url");

const TORCHBOX_SITEMAP_URLS = [
  "https://torchbox.com/sitemap.xml",
  "https://torchbox.com/careers/sitemap.xml",
  "https://torchbox.com/seo-super-trumps/sitemap.xml",
];

function getDateTimeString() {
  let date_time = new Date();

  let date = ("0" + date_time.getDate()).slice(-2);
  let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year = date_time.getFullYear();
  let hours = ("0" + date_time.getHours()).slice(-2);
  let minutes = ("0" + date_time.getMinutes()).slice(-2);
  let seconds = ("0" + date_time.getSeconds()).slice(-2);

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

async function fetchSitemap(sitemapURL) {
  const rawXML = await fetch(sitemapURL)
    .then((response) => response.text())
    .catch(function (err) {
      console.log("Unable to fetch -", err);
    });
  log("Parsing sitemap.xml...\n");
  const sitemapItems = JSON.parse(parser.toJson(rawXML)).urlset.url;
  const urls = sitemapItems.map((item) => item.loc);
  console.log("Now analysing " + urls.length + " urls.");
  return urls;
}

async function main() {
  const urls = await fetchSitemap("https://torchbox.com/careers/sitemap.xml");
  CHC.run(urls, {
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
}

main();
