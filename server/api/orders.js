const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')
const isAdmin = require('../auth/isAdmin-middleware')
module.exports = router

router.get('/', [isAdmin], async (req, res, next) => {
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

router.put('/cart', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {boughtStatus: false, userId: req.session.passport.user}
    })
    if (!req.session.order) {
      req.session.order = order[0].id
    }
    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {
        boughtStatus: true,
        shippingAddress: req.body.shippingAddress,
        billingAddress: req.body.billingAddress
      },
      {
        where: {id: req.session.order}
      }
    )
    req.session.order = null
    res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
})
