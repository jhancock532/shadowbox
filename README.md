# Shadowbox

A performance dashboard for monitoring the sustainability of a website and site crawler script to fetch this data.

Includes support for dark mode and comparison of reports.

**[View demo of the live site here.](https://tbx-shadowbox.vercel.app/)**

<details>
<summary>Demo screenshots</summary>
  
  _Lightmode_
  
  <img width="1313" alt="Screenshot 2023-11-21 at 16 36 42" src="https://github.com/jhancock532/shadowbox/assets/18164832/a667f579-d78b-4784-8321-d54d6d9098c2">
  
  _Darkmode with comparison_
  
<img width="1167" alt="Screenshot 2023-11-21 at 16 19 16" src="https://github.com/jhancock532/shadowbox/assets/18164832/f0fa1209-a785-4639-adc2-3d06885aac3c">

  _A summary of network requests sent by the least performant pages_
  
  <img width="1421" alt="Screenshot 2023-11-21 at 16 30 49" src="https://github.com/jhancock532/shadowbox/assets/18164832/eb720aff-d4ea-4aaf-ad30-bd82671a9430">
  
  _A summary of requests sent by iframes loaded within the page._
  
  <img width="1406" alt="Screenshot 2023-11-21 at 16 17 59" src="https://github.com/jhancock532/shadowbox/assets/18164832/2d6ec596-0aa2-40b0-a672-cbcc719ec9ef">
</details>

This is an informal project with several outstanding bugs and issues, but generally useful to get a sense of how optimised a website is at a glance, and what might be holding it back.



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

## Dashboard

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
