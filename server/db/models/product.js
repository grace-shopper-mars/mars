const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.pexels.com/photos/226597/pexels-photo-226597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product
