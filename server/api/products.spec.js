/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let storedProducts

  const productData = [
    {
      name: 'Quackers',
      imageUrl:
        'https://www.munchkin.com/media/catalog/product/3/1/31001_white_hot_safety_bath_ducky.jpg',
      price: 25.0,
      description:
        'Quackers is your average rubber duck, perfectly suitable to talk through any task with you. She is your classic “jack of all trades, master on none” duck.'
    },
    {
      name: 'Rosie',
      imageUrl:
        'https://www.amsterdamduckstore.com/wp-content/uploads/2017/03/Rosie-the-Riveter-Rubber-Duck-Amsterdam-Duck-Store.jpg',
      price: 25.0,
      description:
        'Rosie is the perfect companion for when you are the only female programmer in the office. She promises to never mansplain to you.'
    }
  ]

  describe('/api/product/', () => {
    beforeEach(async () => {
      const createdProducts = await Product.bulkCreate(productData)
      storedProducts = createdProducts.map(product => product.dataValues)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.be.equal(storedProducts[0].name)
    })
  })
})
