import axios from 'axios'

//Action types
const GOT_CART = 'GOT_CART'

//Action creators
const gotCart = cart => ({
  type: GOT_CART,
  cart
})

//Thunk creators
export const getCart = userId => async dispatch => {
  if (userId) {
    try {
      const {data} = await axios.put('/api/orders/cart', {userId})
      dispatch(gotCart(data[0]))
    } catch (err) {
      console.log(err)
    }
  } else {
    dispatch(gotCart({}))
  }
}

export const placeOrder = (
  shippingAddress,
  billingAddress
) => async dispatch => {
  try {
    await axios.put('/api/orders/checkout', {
      shippingAddress,
      billingAddress
    })
    dispatch(gotCart({}))
  } catch (err) {
    console.error(err)
  }
}

//initial state
const ordersInitialState = {
  allOrders: [],
  cart: {}
}

//reducer
export default function(state = ordersInitialState, action) {
  switch (action.type) {
    case GOT_CART:
      const newState = {...state, cart: action.cart}
      return newState
    default:
      return state
  }
}
