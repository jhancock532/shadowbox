import fs from "fs";

import {
  saveNetworkRequestsToFileSystem,
  getNetworkRequestSizes,
  TEST_REQUEST_SIZES,
} from "../utils.js";

let pageData = JSON.parse(
  fs.readFileSync("./storage/key_value_stores/output/results.json", "utf8")
);

// const requestSizes = await getNetworkRequestSizes(pageData);

// Save the results to a new JSON file in a webpage specific subdirectory

saveNetworkRequestsToFileSystem(pageData, TEST_REQUEST_SIZES);
