import fs from 'fs';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { urlData } from './data.js';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import mobileConfig from 'lighthouse/core/config/lr-mobile-config.js';

const launchChrome = () => chromeLauncher.launch({ chromeFlags: ['--headless']});

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const writeReportToFile = (pageFolder, outputPath, reportHtml) => {
  fs.writeFileSync(path.join(pageFolder, outputPath), reportHtml);
  console.log(`Report is done for ${outputPath}`);
};

const saveCategoryScores = (pageFolder, websiteName, pageType, configType, categoryScores) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const jsonFileName = `category_${currentDate}.json`;
  const jsonFilePath = path.join(pageFolder, jsonFileName);
  
  const lighthouseScores = {
    websiteName,
    pageType,
    configType,
    scores: Object.fromEntries(Object.entries(categoryScores).map(([category, value]) => [category, Math.round(value.score * 100)])),
  };

  const formattedJson = JSON.stringify(lighthouseScores, null, 2);
  fs.writeFileSync(jsonFilePath, formattedJson);
  console.log(`Category scores saved to ${jsonFilePath}`);
};


const runLighthouseForUrl = async (websiteName, pageType, outputPath, config, configType) => {
  const chromeInstance = await launchChrome();
  try {
    const url = urlData[websiteName]?.[pageType];
    console.log(`Processing URL for ${websiteName} - ${pageType} - ${configType}: ${url}`);

    if (!url) {
      console.error(`URL not found for website: ${websiteName} and pageType: ${pageType}`);
      return;
    }

    const lighthouseOptions = {
      logLevel: 'info',
      output: 'html',
      categories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chromeInstance.port,
    };
    
    
    const lighthouseResult = await lighthouse(url, lighthouseOptions, config);
    const reportHtml = lighthouseResult.report;

    const reportsFolder = 'reports';
    const configFolder = config === desktopConfig ? 'desktop' : 'mobile';

    const websiteFolder = path.join(reportsFolder, configFolder, websiteName);
    const pageFolder = path.join(websiteFolder, pageType);

    createFolderIfNotExists(reportsFolder);
    createFolderIfNotExists(websiteFolder);
    createFolderIfNotExists(pageFolder);

    writeReportToFile(pageFolder, outputPath, reportHtml);
    saveCategoryScores(pageFolder, websiteName, pageType, configType, lighthouseResult.lhr.categories);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    chromeInstance.kill();
  }
};

const processWebsites = async () => {
  for (const [websiteName, pageTypes] of Object.entries(urlData)) {
    for (const [pageType] of Object.entries(pageTypes)) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const outputFileName = `${currentDate}.html`;

      await runLighthouseForUrl(websiteName, pageType, outputFileName, desktopConfig, 'desktop');
      await runLighthouseForUrl(websiteName, pageType, outputFileName, mobileConfig, 'mobile');
    }
  }
};

processWebsites();
