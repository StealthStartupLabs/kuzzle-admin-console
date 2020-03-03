describe('Collection management', function() {
  const kuzzleUrl = 'http://localhost:7512'
  const indexName = 'testindex'
  const collectionName = 'testcollection'

  beforeEach(() => {
    // reset database and setup
    cy.request('POST', `${kuzzleUrl}/admin/_resetDatabase`)
    cy.request('POST', `${kuzzleUrl}/${indexName}/_create`)

    // create environment
    const validEnvName = 'valid'
    localStorage.setItem(
      'environments',
      JSON.stringify({
        [validEnvName]: {
          name: validEnvName,
          color: 'darkblue',
          host: 'localhost',
          ssl: false,
          port: 7512,
          token: 'anonymous'
        }
      })
    )
  })

  it('is able to create a realtime collection and access it', function() {
    cy.visit(`/#/data/${indexName}/create`)
    cy.get('.CollectionCreate').should('be.visible')

    cy.get(
      '.col > .row > .Mapping-realtimeOnly > label > #realtime-collection'
    ).check('on', { force: true })
    cy.get('div > .row > .col > .Mapping-name > label').click({ force: true })
    cy.get('div > .row > .col > .Mapping-name > #collection-name').type(
      collectionName
    )
    cy.get('.col > .Mapping > .row > .col > .Mapping-submitBtn').click({
      force: true
    })
    cy.get(`[data-cy="CollectionList-name--${collectionName}"]`).click()
    cy.contains(collectionName)
    cy.contains('You did not subscribe yet')
  })

  it('is able to delete a collection', function() {
    cy.request('PUT', `${kuzzleUrl}/${indexName}/${collectionName}`)

    cy.visit(`/#/data/${indexName}/`)

    cy.get(`[data-cy="CollectionList-delete--${collectionName}"]`).click()
    cy.get('[data-cy="DeleteCollectionPrompt-confirm"]').type(collectionName)
    cy.get('[data-cy="DeleteCollectionPrompt-OK"]').click()
    cy.should('not.contain', collectionName)
  })
})
