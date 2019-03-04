/* global describe beforeEach it */

const {expect} = require('chai')
import reducer from './allProducts'

const products = [{name: 'New York'}, {name: 'Chicago'}, {name: 'Pluto'}]

describe('products reducer', () => {
  const initialState = {
    allProducts: [],
    currentProduct: {}
  }

  const newState = reducer(initialState, {
    type: 'GOT_ALL_PRODUCTS',
    products: products
  })

  it('returns a new state with the updated products', () => {
    expect(newState.allProducts).to.deep.equal(products)
    expect(newState.currentProduct).to.equal(initialState.currentProduct)
  })

  it('does not modify the previous state', () => {
    expect(initialState).to.deep.equal({
      allProducts: [],
      currentProduct: {}
    })
  })
})
