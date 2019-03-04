import React from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/orderProduct'
import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.props.loadCartItems(this.props.cart.id)
    }
  }

  async handleSubmit(evt) {
    try {
      const id = this.props.cart.id
      const shippingAddress = evt.target.shippingAddress.value
      const billingAddress = evt.target.billingAddress.value
      await axios.put('/api/orders/checkout', {
        id,
        shippingAddress,
        billingAddress
      })
      alert('Your order has been placed')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const cartItems = this.props.items
    if (cartItems && cartItems.length) {
      return (
        <div>
          <h1>Cart</h1>
          <div>
            {cartItems.map(item => (
              <div key={item.id}>
                <h3>{item.product.name}</h3>
                <img src={item.product.imageUrl} width="200px" />
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>Total Cost: </h3>
            <p>
              ${cartItems.reduce(function(accum, currVal) {
                return accum + Number(currVal.product.price)
              }, 0)}
            </p>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Shipping Address:</label>
              <input type="text" name="shippingAddress" />
              <label>Billing Address:</label>
              <input type="text" name="billingAddress" />
              <br />
              <button type="submit">Checkout</button>
            </form>
          </div>
        </div>
      )
    } else {
      return <h3>Your cart is empty!</h3>
    }
  }
}

const mapStateToProps = state => {
  return {
    items: state.orderProduct.items, // Rows from OrderProduct table
    cart: state.orders.cart // Row from Order table
  }
}

const mapDispatchToProps = dispatch => ({
  loadCartItems: orderId => dispatch(getCartItems(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
