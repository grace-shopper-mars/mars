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
  try {
    console.log('userId in thunk creator: ', userId)
    const {data} = await axios.put('/api/orders/cart', {userId})
    dispatch(gotCart(data[0]))
  } catch (err) {
    console.log(err)
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
      return {...state, cart: action.cart}
    default:
      return state
  }
}
