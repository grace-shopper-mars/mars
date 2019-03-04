import React from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/orderProduct'
import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestCart: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.cart.id) {
      this.props.loadCartItems(this.props.cart.id)
    } else {
      this.setState({
        guestCart: JSON.parse(localStorage.getItem('guestCart'))
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.props.loadCartItems(this.props.cart.id)
    }
  }

  async handleSubmit(evt) {
    const shippingAddress = evt.target.shippingAddress.value
    const billingAddress = evt.target.billingAddress.value
    if (this.props.isLoggedIn) {
      const id = this.props.cart.id
      try {
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
  }

  render() {
    let cartItems
    if (this.props.items && this.props.items.length) {
      cartItems = this.props.items
    } else if (Object.keys(this.state.guestCart).length !== 0) {
      cartItems = this.state.guestCart
    } else {
      return <h3>Your cart is empty!</h3>
    }
    return (
      <div>
        <h1>Cart</h1>
        <div>
          {cartItems.map(item => (
            <div key={item.productId}>
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
  }
}

const mapStateToProps = state => {
  return {
    items: state.orderProduct.items, // Rows from OrderProduct table
    cart: state.orders.cart, // Row from Order table
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  loadCartItems: orderId => dispatch(getCartItems(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
