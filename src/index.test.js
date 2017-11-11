import { Rope } from './index'

describe('Rope', () => {
  it('should initialize without an error', done => {
    let rope = new Rope('test', {}, { autoConnect: false })
    done()
  })
})
