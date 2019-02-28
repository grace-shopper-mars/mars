const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {boughtStatus: true},
      include: [
        {
          model: OrderProduct
        }
      ]
    })

    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {boughtStatus: false},
      include: [
        {
          model: OrderProduct
        }
      ]
    })

    res.json(order)
  } catch (error) {
    next(error)
  }
})
