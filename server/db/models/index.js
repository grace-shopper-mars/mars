const User = require('./user')
const OrderProduct = require('./orderproduct')
const Product = require('./product')
const Order = require('./order')

OrderProduct.belongsTo(Product)
Product.hasMany(OrderProduct)

OrderProduct.belongsTo(Order)
Order.hasMany(OrderProduct)

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  OrderProduct,
  Order,
  Product
}
