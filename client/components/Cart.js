import React from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/orderProduct'

class Cart extends React.Component {
  componentDidMount() {
    //console.log('cart inside Mount: ', this.props.cart)
    //this.props.loadCartItems(this.props.cart.id)
  }

  componentDidUpdate(prevProps) {
    //console.log('curr cart: ', this.props.cart, 'prev cart: ', prevProps.cart)
    if (this.props.cart !== prevProps.cart) {
      console.log('this.props.cart.id: ', this.props.cart.id)
      this.props.loadCartItems(this.props.cart.id)
    }
  }

  render() {
    const cartItems = this.props.items
    if (cartItems && cartItems.length) {
      console.log('props: ', this.props)
      return (
        <div>
          <h3>Cart</h3>
          <div>
            {cartItems.map(item => (
              <div key={item.id}>
                <h3>{item.product.name}</h3>
                <img src={item.product.imageUrl} width="200px" />
                <p>{item.quantity}</p>
                <p>${item.product.price}</p>
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
        </div>
      )
    } else {
      return <h3>Your cart is empty!</h3>
    }
  }
}

const mapStateToProps = state => {
  //console.log('state inside cart: ', state)
  return {
    items: state.orderProduct.items, // Rows from OrderProduct table
    cart: state.orders.cart // Row from Order table
  }
}

const mapDispatchToProps = dispatch => ({
  loadCartItems: orderId => dispatch(getCartItems(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
