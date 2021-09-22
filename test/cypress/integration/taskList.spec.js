describe('ToDo Task list', () => {
  beforeEach(() => {
    cy.task('clearDb');
  });

  it('should show tasks from DB', () => {
    // given
    const expectedTasks = [
      {
        name: 'First inserted task',
        status: 'pending',
        createdDate: new Date('2020-01-01T12:00:00Z'),
      },
      {
        name: 'Second inserted task',
        status: 'pending',
        createdDate: new Date('2020-01-02T12:00:00Z'),
      },
    ];

    expectedTasks.forEach(task =>
      cy.request('POST', `${Cypress.env('apiUrl')}/tasks`, task)
        .then(res => expect(res.status).to.equal(200))
    );

    // when
    cy.server()
      .route('GET', '/tasks')
      .as('getTasks')

      .visit('/')
      .wait('@getTasks')

      // then
      .get('[data-cy=tasksList]')
      .find('[data-cy=taskItem]')
      .should('have.length', expectedTasks.length)
      .as('taskItems');

    expectedTasks.forEach(task => {
      cy.get('@taskItems')
        .contains(task.name)
        .should('be.visible');
    });
  });
});
