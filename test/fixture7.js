import { Selector } from 'testcafe';
import { f } from '../utils/testcafe-helper';
let config = require('../config.json');

fixture`Getting seventh`
  .page`${config.url}`;

test('#1', async t => {
  await f.waitForAppear('#developer-name', 1000);
  await f.inquiryForAppear('#developer-name', 500);
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button');
  await f.waitForDisappear('#developer-name', 1000);
  await f.inquiryForDisappear('#developer-name', 500);
  await f.waitForAppear('#article-header', 1000);
  await f.inquiryForAppear('#article-header', 500);
  // Use the assertion to check if the actual header text is equal to the expected one
  await t
    .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
});