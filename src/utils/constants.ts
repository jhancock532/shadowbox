export const FILTER_OPTIONS = [
  "document",
  "script",
  "stylesheet",
  "image",
  "font",
  "xhr",
];

export type NetworkRequest = typeof FILTER_OPTIONS[number];

export const BAR_COLORS: { [key: string]: string } = {
  document: "#eb4747",
  script: "#ebb447",
  stylesheet: "#b4eb47",
  image: "#47b4eb",
  font: "#4747eb",
  xhr: "#eb47b4",
  json: "#8884d8",
};
