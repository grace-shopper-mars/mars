const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      atttributes: ['name', 'imageUrl', 'price', 'description']
      // in case we add any private information to the model later.
      // but note that this means we have to update the attributes array if we add non-private information!
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})
