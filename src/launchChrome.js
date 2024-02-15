import puppeteer from 'puppeteer';

const launchChrome = async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  const port = (new URL(browser.wsEndpoint())).port;
  return { browser, port };
};

export default launchChrome;
