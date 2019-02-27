import axios from 'axios'

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//initial state
const allProducts = []

//Action creators
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

//Thunk creators
export const getAllProductsThunk = async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (err) {
    console.log(err)
  }
}

//reducer
export default function(state = allProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
