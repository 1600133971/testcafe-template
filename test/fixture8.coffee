import { Selector } from 'testcafe'
config = require('../config.json');

fixture `CoffeeScript Example`
    .page `${config.url}`

nameInput = Selector '#developer-name'

test 'Test', (t) =>
  await t
    .typeText(nameInput, 'Peter')
    .typeText(nameInput, 'Paker', { replace: true })
    .typeText(nameInput, 'r', { caretPos: 2 })
    .expect(nameInput.value).eql 'Parker';