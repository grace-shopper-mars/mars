const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "product",
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'order',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
})

module.exports = OrderProduct
