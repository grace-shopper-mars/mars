import axios from 'axios'

//Action types
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const ITEM_EDITED = 'ITEM_EDITED'
const ITEM_DELETED = 'ITEM_DELETED'

//Action creators
const gotCartItems = items => ({
  type: GOT_CART_ITEMS,
  items
})

const itemEdited = item => ({
  type: ITEM_EDITED,
  item
})

const itemDeleted = productId => ({
  type: ITEM_DELETED,
  productId
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

export const editItem = (quantity, productId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orderProducts/${productId}`, {
      quantity
    })
    console.log('data: ', data)
    dispatch(itemEdited(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteItem = productId => async dispatch => {
  try {
    await axios.delete(`/api/orderProducts/${productId}`)
    dispatch(itemDeleted(productId))
  } catch (error) {
    console.error(error)
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
    case ITEM_EDITED:
      console.log('action.item: ', action.item)
      console.log('state.items: ', state.items)
      return {
        ...state,
        items: state.items.map(item => {
          if (item.productId === action.item.productId) {
            return {...item, quantity: action.item.quantity}
          } else {
            return item
          }
        })
      }
    case ITEM_DELETED:
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.productId)
      }
    default:
      return state
  }
}
