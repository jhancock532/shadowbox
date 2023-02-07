# Generating Statistics

The asset weight and load time statistics are generated via the same setup found in the Chrome DevTools network panel. We run a headless chrome build and use chrome-har-capturer to generate a HAR file, which includes all the statistics we need. The HAR file is simplified and then written to a JSON file, which is referenced by Next.js at build time.

## Setting up your local device

Please ensure that you have Chrome installed on your local machine.
Then, macOS users should create an alias for the Chrome executable:

```bash
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
```

This line should be added in your `~/.bash_profile` or `~/.zshrc` file.

## Running Headless Chrome

Run the following command in a new terminal window

```bash
chrome --headless --remote-debugging-port=9222
```

You should see logs in the terminal window.

## Generating the statistics file

In a new terminal window, run the following commands:

```bash
fnm use # (or nvm use - make sure you're using the Node version in .nvmrc)
npm install
npm run analysis
```

## Adding new sites to the report

Update the static list of sites in `scripts/analysis.js`
