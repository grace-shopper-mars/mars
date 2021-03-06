const router = require('express').Router()
const {OrderProduct, Product} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.session.order
      }
    }).then(function(row) {
      if (row) {
        return row.update({quantity: req.body.quantity})
      } else {
        return OrderProduct.create({
          productId: req.body.productId,
          orderId: req.session.order,
          quantity: req.body.quantity
        })
      }
    })
    res.json(orderProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const [, orderProductArray] = await OrderProduct.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          productId: req.params.productId,
          orderId: req.session.order
        },
        returning: true,
        plain: true
      }
    )
    res.json(orderProductArray)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    await OrderProduct.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.session.order
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.session.order
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
