describe('ToDo Task input form', () => {
  beforeEach(() => {
    cy.task('clearDb')
      .visit('/');
  });

  it('should show error when task name is not provided', () => {
    // when
    cy.get('[data-cy=addTask]')
      .click()

      // then
      .get('[data-cy=formError]')
      .find('span')
      .should('be.visible')
      .and('have.text', 'Task name is required');
  });

  it('should add a new Task when Add Task button is clicked', () => {
    // given
    const newTaskName = 'Some new task';

    cy.server()
      .route('POST', '/tasks')
      .as('postTask')

      .get('[data-cy=taskName]')
      .type(newTaskName)

      // when
      .get('[data-cy=addTask]')
      .click()

      // then
      .wait('@postTask').then(xhr => {
        expect(xhr.status).to.be.equal(200);
        cy.log(xhr.requestBody);
      })

      .get('[data-cy=tasksList]')
      .should('be.visible')
      .find('[data-cy=taskItem]')
      .should('have.length', 1)
      .and('have.text', newTaskName);
  });
});
