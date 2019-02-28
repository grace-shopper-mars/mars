import React from 'react'
import {connect} from 'react-redux'
import {getOneProductThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.loadOneDuck(productId)
  }

  render() {
    const currentProduct = this.props.currentProduct
    return (
      <div className="oneProduct">
        <h1>Produck</h1>
        <h5>{currentProduct.name}</h5>
        <img src={currentProduct.imageUrl} width="100px" />
        <p>${currentProduct.price}</p>
        <p>{currentProduct.description}</p>
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Add to cart</button>
        <p />
        <Link to="/products">Back to all Producks</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {currentProduct: state.products.currentProduct}
}

const mapDispatchToProps = dispatch => ({
  loadOneDuck: function(productId) {
    dispatch(getOneProductThunk(productId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
