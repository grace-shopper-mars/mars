import React from 'react'
import {connect} from 'react-redux'
import {getCartItems, editItem, deleteItem} from '../store/orderProduct'
import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      guestCart: JSON.parse(localStorage.getItem('guestCart'))
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  componentDidMount() {
    this.props.loadCartItems(this.props.cart.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart && this.props.isLoggedIn) {
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
    } else {
      alert('You have to be logged in to checkout!')
    }
  }

  handleChange(evt, productId) {
    const newQuant = evt.target.value
    if (this.props.isLoggedIn) {
      this.props.updateQuantity(newQuant, productId)
    } else {
      const currentCart = JSON.parse(localStorage.getItem('guestCart'))
      const newCart = currentCart.map(item => {
        if (item.productId === productId) {
          return {...item, quantity: newQuant}
        } else {
          return item
        }
      })
      localStorage.setItem('guestCart', JSON.stringify(newCart))
      this.setState({guestCart: newCart})
    }
  }

  handleDeleteItem(evt, productId, productName) {
    if (this.props.isLoggedIn) {
      this.props.removeFromCart(productId)
    } else {
      const currentCart = JSON.parse(localStorage.getItem('guestCart'))
      const newCart = currentCart.filter(item => item.productId !== productId)
      localStorage.setItem('guestCart', JSON.stringify(newCart))
      this.setState({guestCart: newCart})
    }
    alert(`You have removed ${productName} from your cart!`)
  }

  render() {
    let cartItems
    if (this.props.items && this.props.items.length) {
      cartItems = this.props.items
    } else if (this.state.guestCart.length !== 0 && !this.props.isLoggedIn) {
      cartItems = this.state.guestCart
    } else {
      return <h3>Your cart is empty!</h3>
    }
    return (
      <div className="cart">
        <div className="cartItems">
          <h1 className="cartName">Cart</h1>
          {cartItems.map(item => (
            <div className="item" key={item.productId}>
              <h3>{item.product.name}</h3>
              <img src={item.product.imageUrl} width="200px" />
              <label>Quantity: </label>
              <select
                value={item.quantity}
                onChange={event => this.handleChange(event, item.productId)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <p>Price: ${item.product.price}</p>
              <button
                type="button"
                onClick={event =>
                  this.handleDeleteItem(
                    event,
                    item.productId,
                    item.product.name
                  )
                }
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
        <div className="checkout">
          <div>
            <h4>Total Cost: </h4>
            <p>
              ${cartItems.reduce(function(accum, currVal) {
                return accum + Number(currVal.product.price)
              }, 0)}
            </p>
          </div>
          <br />
          <div className="checkoutForm">
            <form onSubmit={this.handleSubmit}>
              <label>Shipping Address:</label>
              <input type="text" name="shippingAddress" />
              <label>Billing Address:</label>
              <input type="text" name="billingAddress" />
              <br />
              <button className="checkoutButton" type="submit">
                CHECKOUT
              </button>
            </form>
          </div>
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
  loadCartItems: orderId => dispatch(getCartItems(orderId)),
  updateQuantity: (quantity, productId) =>
    dispatch(editItem(quantity, productId)),
  removeFromCart: productId => dispatch(deleteItem(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// adding fake text to create change.
