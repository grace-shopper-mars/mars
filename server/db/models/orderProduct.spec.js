/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const OrderProduct = db.model('OrderProduct')

let orderProduct
beforeEach(() => {
  orderProduct = OrderProduct.build({
    quantity: 3
  })
})

afterEach(() => {
  return Promise.all([orderProduct.truncate({cascade: true})])
})

describe('attributes definition', () => {
  it('includes `quantity` fields', async () => {
    const savedOrderProduct = await orderProduct.save()
    expect(savedOrderProduct.quantity).to.equal(3)
  })

  it('requires `quantity`', async () => {
    orderProduct.quantity = null

    let result, error
    try {
      result = await orderProduct.validate()
    } catch (err) {
      error = err
    }

    if (result) throw Error('validation should fail when quantity is null')

    expect(error).to.be.an.instanceOf(Error)
  })
})
