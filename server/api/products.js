const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price', 'description']
      // in case we add any private information to the model later.
      // but note that this means we have to update the attributes array if we add non-private information!
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const singleProduct = await Product.findById(productId, {
      attributes: ['id', 'name', 'imageUrl', 'price', 'description']
      // again, we may need to update this later.
      // we also may want to include stuff from the orderProduct table at a later point.
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
