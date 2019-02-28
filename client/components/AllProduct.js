import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/allProducts'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadDucks()
  }

  render() {
    return (
      <div className="allProducts">
        <h1>All Producks</h1>
        <ul>
          {this.props.allProducts.map(duck => (
            <div key={duck.id}>
              <Link to={`/products/${duck.id}`}>{duck.name}</Link>
              <img src={duck.imageUrl} width="100px" />
              <p>${duck.price}</p>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {allProducts: state.products.allProducts}
}

const mapDispatchToProps = dispatch => ({
  loadDucks: function() {
    dispatch(getAllProductsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
