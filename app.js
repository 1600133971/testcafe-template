'use strict';

let createTestCafe = require('testcafe');
let fs = require('fs');
let config = require('./config.json');
let c = require('./utils/common');

let testcafe = null;
createTestCafe('localhost')
  .then(tc => {
    testcafe = tc;
    let runner = testcafe.createRunner();
    let date = c.getFmtDate();
    let jsonFilePath = config.path.result + 'report_' + date + '.json';
    let jsonStream = fs.createWriteStream(jsonFilePath);
    let htmlStream = fs.createWriteStream(config.path.result + 'report_' + date + '.html');
    return runner
      .startApp('node ' + config.path.web + 'server.js 8085', 4000)
      .src([config.path.test + '*.js', config.path.test + '*.coffee'])
      .browsers('chrome:headless')
      .reporter('st')
      .reporter('json', jsonStream)
      .reporter('st-html', htmlStream)
      .concurrency(4)
      .screenshots(config.path.result)
      .run({skipUncaughtErrors:true})
      .then(failedCount => {
        if (failedCount > 0) {
          return runner
            .concurrency(1)
            .filter((testName, fixtureName) => {return c.checkFailedTest(testName, fixtureName, jsonFilePath);})
            .run();
        }
      })
      .then(failedCount => {
        jsonStream.end();
        htmlStream.end();
      });
  })
  .then(failedCount => {
    testcafe.close();
  });
