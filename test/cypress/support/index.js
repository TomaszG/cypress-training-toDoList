require('./commands');
require('./fetchToXhr');

before(() => cy.task('initDb'));
after(() => cy.task('tearDownDb'));
