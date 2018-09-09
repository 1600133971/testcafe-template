import { Selector } from 'testcafe'

fixture 'CoffeeScript Example'
    .page 'http://localhost:8085/web/testcafe/example/index.html'

nameInput = Selector '#developer-name'

test 'Test', (t) =>
  await t
    .typeText(nameInput, 'Peter')
    .typeText(nameInput, 'Paker', { replace: true })
    .typeText(nameInput, 'r', { caretPos: 2 })
    .expect(nameInput.value).eql 'Parker';