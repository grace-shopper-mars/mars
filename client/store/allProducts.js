import axios from 'axios'

//Action types
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

//Action creators
const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

//Thunk creators
export const getAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  } catch (err) {
    console.log(err)
  }
}

//initial state
const allProducts = []

//reducer
export default function(state = allProducts, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
