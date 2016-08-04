import { mutations } from '../../../../src/vuex/modules/list/store'

const { DELETE_DOCUMENT, RECEIVE_DOCUMENTS, DELETE_DOCUMENTS, SET_BASIC_FILTER } = mutations

describe('collection mutations', () => {
  describe('DELETE_DOCUMENT', () => {
    it('should delete the document from list', () => {
      let state = {documents: [{id: 'doc1'}, {id: 'doc2'}, {id: 'doc3'}]}

      DELETE_DOCUMENT(state, 'doc2')
      expect(state.documents).to.eql([{id: 'doc1'}, {id: 'doc3'}])
    })
  })

  describe('RECEIVE_DOCUMENTS', () => {
    it('should add documents and total in store', () => {
      let state = {documents: [{id: 'doc1'}], total: 1}

      RECEIVE_DOCUMENTS(state, {documents: [{id: 'doc2'}, {id: 'doc3'}], total: 2})
      expect(state.documents).to.eql([{id: 'doc2'}, {id: 'doc3'}])
      expect(state.total).to.equal(2)
    })
  })

  describe('DELETE_DOCUMENTS', () => {
    it('should delete documents from list and reset selectedDocuments', () => {
      let state = {documents: [{id: 'doc1'}, {id: 'doc2'}, {id: 'doc3'}], selectedDocuments: ['doc1', 'doc3']}

      DELETE_DOCUMENTS(state, ['doc1', 'doc3'])
      expect(state.documents).to.eql([{id: 'doc2'}])
      expect(state.selectedDocuments).to.eql([])
    })
  })

  describe('SET_BASIC_FILTER', () => {
    it('should set basicFilter value', () => {
      let state = {basicFilter: undefined}

      SET_BASIC_FILTER(state, 'filter')
      expect(state.basicFilter).to.equals('filter')
    })
  })
})