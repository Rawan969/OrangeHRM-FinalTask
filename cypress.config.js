const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

/*import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import * as path from 'path';*/

module.exports = defineConfig({
  //projectId: "s3yd5a",
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    //baseUrl: "https://conduit.productionready.io",
    setupNodeEvents(on, config) {
      /*on('task', {
       async convertXlsxToJson(xlsxPath){
          const workbook = XLSX.readFile(xlsxPath); //read file from rhe provided path from test case
          const worksheet = workbook.Sheets(workbook.SheetNames[0]); //take this and get the first sheet inside it
          const jsonData = XLSX.utils.sheet_to_json(worksheet);//convert this sheet to json file
          const fileName = path.basename(xlsxPath,'.xlsx'); //provide the name of the json file from the downloaded xlsx file
          const jsonFilePath = `cypress/fixtures/${fileName}.json`; // provide the path for the json file
          writeFileSync(jsonFilePath,JSON.stringify(jsonData,null,1));//write the json file as provided path and convert javascript object to json string 
          return null
        }
      })*/
      require('@cypress/grep/src/plugin')(config)
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      allure: true,
      allureResulsPath: "allure-results",
      snapshotOnly: true,
      
    },

    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});
