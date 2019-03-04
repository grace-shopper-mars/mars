import axios from 'axios'

//Action types
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_ONE_PRODUCT = 'GOT_ONE_PRODUCT'
const GOT_ERROR = 'GOT_ERROR'

//Action creators
const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

const gotOneProduct = product => ({
  type: GOT_ONE_PRODUCT,
  currentProduct: product
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

export const getOneProductThunk = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotOneProduct(data))
  } catch (err) {
    console.log(err)
  }
}

//initial state
const productInitialState = {
  allProducts: [],
  currentProduct: {},
  error: null,
  loading: false
}

//reducer
export default function(state = productInitialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, allProducts: action.products}
    case GOT_ONE_PRODUCT:
      return {...state, currentProduct: action.currentProduct}
    default:
      return state
  }
}
