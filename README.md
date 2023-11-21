# Shadowbox

A performance dashboard for monitoring the sustainability of a website.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the crawler

Modify the `startUrls` array at the top of `site-crawler/main.js` with the root URL of the website you'd like to crawl.

Optional: configure the `maxRequestsPerCrawl` to a higher number to crawl more pages of the site automatically.

To run the crawler, run the following commands:

```bash
cd /site-crawler
fnm use # (or nvm use - make sure you're using the Node version in .nvmrc)
npm install
npm run crawl
```

When finished, the main website will have been analysed, but not any embedded iframes. To analyse the iframes, run the following commands:

```bash
npm run iframes
```

To process the results of the crawler, run the following commands:

```bash
npm run export
```

## Dashboard development

To view the crawler results, run the development server. `cd` into the root directory, then

```bash
fnm use # (or nvm use - make sure you're using the Node version in .nvmrc)
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
