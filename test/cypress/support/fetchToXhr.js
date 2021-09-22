// https://github.com/cypress-io/cypress/issues/95#issuecomment-526839501

const fetchToXhr = () => {
  let polyfill;

  before(() => {
    cy.readFile('node_modules/whatwg-fetch/dist/fetch.umd.js')
      .then(contents => polyfill = contents);
  });

  Cypress.on('window:before:load', win => {
    delete win.fetch;
    win.eval(polyfill);
  });
};

fetchToXhr();
