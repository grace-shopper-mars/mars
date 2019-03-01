const router = require('express').Router()
const {OrderProduct} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    }).then(function(row) {
      if (row) {
        return row.update({quantity: req.body.quantity})
      } else {
        return OrderProduct.create({
          productId: req.body.productId,
          orderId: req.body.orderId,
          quantity: req.body.quantity
        })
      }
    })
    res.json(orderProduct)
  } catch (error) {
    next(error)
  }
})
