import axios from 'axios'

//Action types
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'

//Action creators
const gotCartItems = items => ({
  type: GOT_CART_ITEMS,
  items
})

//Thunk creators
export const getCartItems = orderId => async dispatch => {
  if (orderId) {
    try {
      const {data} = await axios.get(`/api/orderProducts/${orderId}`)
      dispatch(gotCartItems(data))
    } catch (err) {
      console.log(err)
    }
  } else {
    dispatch(gotCartItems([]))
  }
}

//initial state
const orderProductsInitialState = {
  items: []
}

//reducer
export default function(state = orderProductsInitialState, action) {
  switch (action.type) {
    case GOT_CART_ITEMS:
      return {...state, items: action.items}
    default:
      return state
  }
}
