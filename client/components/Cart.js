import React from 'react'
import {connect} from 'react-redux'
import {getCart} from '../store/orders'

class Cart extends React.Component {
  // componentDidMount(){
  //   const userId = state.user.id
  //   this.props.loadCart(userId)
  // }

  render() {
    const cartItems = this.props.cartItems
    return (
      <div>
        <h3>Cart</h3>
        <div>{cartItems.map(item => <div key={item.id} />)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.orders.cart.orderProducts,
    products: state.products
  }
}

// const mapDispatchToProps = dispatch => ({
//   loadCart: function(userId){
//     dispatch(getCart(userId))
//   }
// })
