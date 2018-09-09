import { Selector } from 'testcafe';
let config = require('../config.json');

fixture`Getting sixth`
  .page`${config.url}`;

test('#1', async t => {
  try {
    //console.log("try!");

    await t
      .typeText('#developer-name', 'John Smith')
      .click('#submit-button')

      // Use the assertion to check if the actual header text is equal to the expected one
      .expect(Selector('#article-header').innerText).eql('Thank you, John Smith1!');
  }
  catch(e) {
    //console.log("catch!");
  }
  finally {
    //console.log("finally!");
  }
});

test('#2', async t => {
  try {
    //console.log("try!");

    await t
      .typeText('#developer-name', 'John Smith')
      .click('#submit-button')

      // Use the assertion to check if the actual header text is equal to the expected one
      .expect(Selector('#article-header').innerText).eql('Thank you, John Smith1!');
  }
  finally {
    //console.log("finally!");
  }
});