const router = require('express').Router()
const {OrderProduct, Product} = require('../db/models')
const isAdmin = require('../auth/isAdmin-middleware')
module.exports = router

router.post('/', [isAdmin], async (req, res, next) => {
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

router.get('/:orderId', async (req, res, next) => {
  try {
    console.log('we hit the backend get request orderProducts')
    const orderId = req.params.orderId
    console.log(orderId)
    const cartItems = await OrderProduct.findAll({
      where: {
        orderId
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})
