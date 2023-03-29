const puppeteer = require("puppeteer"); // v13.0.0 or later

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 374,
      height: 796,
    });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await targetPage.goto("https://torchbox.com/careers");
    await Promise.all(promises);
  }
  {
    const targetPage = page;
    await scrollIntoViewIfNeeded(
      [
        [
          "#__next > main > div > div.CTA_container__jINIi > a.Button_button__30ukX.Button_radialBackground__zQ6pn.CTA_jobsButton__83AQJ > div.Button_overflowHider__BAMBX",
        ],
        ['xpath///*[@id="__next"]/main/div/div[7]/a[1]/div[1]'],
      ],
      targetPage,
      timeout
    );
    const element = await waitForSelectors(
      [
        [
          "#__next > main > div > div.CTA_container__jINIi > a.Button_button__30ukX.Button_radialBackground__zQ6pn.CTA_jobsButton__83AQJ > div.Button_overflowHider__BAMBX",
        ],
        ['xpath///*[@id="__next"]/main/div/div[7]/a[1]/div[1]'],
      ],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 185.8515625,
        y: 24.7265625,
      },
    });
  }
  {
    const targetPage = page;
    await scrollIntoViewIfNeeded(
      [
        [
          "#__next > main > div > div.Jobs_contentContainer__K4iJm > div > a:nth-child(6) > p.Jobs_jobTitle__PAn4b",
        ],
        ['xpath///*[@id="__next"]/main/div/div[3]/div/a[4]/p[1]'],
        ["text/Senior Python"],
      ],
      targetPage,
      timeout
    );
    const element = await waitForSelectors(
      [
        [
          "#__next > main > div > div.Jobs_contentContainer__K4iJm > div > a:nth-child(6) > p.Jobs_jobTitle__PAn4b",
        ],
        ['xpath///*[@id="__next"]/main/div/div[3]/div/a[4]/p[1]'],
        ["text/Senior Python"],
      ],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 38.8515625,
        y: 40.7109375,
      },
    });
  }
  {
    const targetPage = page;
    const promises = [];
    promises.push(targetPage.waitForNavigation());
    await scrollIntoViewIfNeeded(
      [
        [
          "#__next > main > div > div:nth-child(8) > div > a > div.ApplyButton_overflowHider__XNMw3",
        ],
        ['xpath///*[@id="__next"]/main/div/div[6]/div/a/div[1]'],
      ],
      targetPage,
      timeout
    );
    const element = await waitForSelectors(
      [
        [
          "#__next > main > div > div:nth-child(8) > div > a > div.ApplyButton_overflowHider__XNMw3",
        ],
        ['xpath///*[@id="__next"]/main/div/div[6]/div/a/div[1]'],
      ],
      targetPage,
      { timeout, visible: true }
    );
    await element.click({
      offset: {
        x: 203.8515625,
        y: 28.4921875,
      },
    });
    await Promise.all(promises);
  }

  await browser.close();

  async function waitForSelectors(selectors, frame, options) {
    for (const selector of selectors) {
      try {
        return await waitForSelector(selector, frame, options);
      } catch (err) {
        console.error(err);
      }
    }
    throw new Error(
      "Could not find element for selectors: " + JSON.stringify(selectors)
    );
  }

  async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
    const element = await waitForSelectors(selectors, frame, {
      visible: false,
      timeout,
    });
    if (!element) {
      throw new Error("The element could not be found.");
    }
    await waitForConnected(element, timeout);
    const isInViewport = await element.isIntersectingViewport({ threshold: 0 });
    if (isInViewport) {
      return;
    }
    await element.evaluate((element) => {
      element.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "auto",
      });
    });
    await waitForInViewport(element, timeout);
  }

  async function waitForConnected(element, timeout) {
    await waitForFunction(async () => {
      return await element.getProperty("isConnected");
    }, timeout);
  }

  async function waitForInViewport(element, timeout) {
    await waitForFunction(async () => {
      return await element.isIntersectingViewport({ threshold: 0 });
    }, timeout);
  }

  async function waitForSelector(selector, frame, options) {
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    if (!selector.length) {
      throw new Error("Empty selector provided to waitForSelector");
    }
    let element = null;
    for (let i = 0; i < selector.length; i++) {
      const part = selector[i];
      if (element) {
        element = await element.waitForSelector(part, options);
      } else {
        element = await frame.waitForSelector(part, options);
      }
      if (!element) {
        throw new Error("Could not find element: " + selector.join(">>"));
      }
      if (i < selector.length - 1) {
        element = (
          await element.evaluateHandle((el) =>
            el.shadowRoot ? el.shadowRoot : el
          )
        ).asElement();
      }
    }
    if (!element) {
      throw new Error("Could not find element: " + selector.join("|"));
    }
    return element;
  }

  async function waitForFunction(fn, timeout) {
    let isActive = true;
    const timeoutId = setTimeout(() => {
      isActive = false;
    }, timeout);
    while (isActive) {
      const result = await fn();
      if (result) {
        clearTimeout(timeoutId);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error("Timed out");
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
