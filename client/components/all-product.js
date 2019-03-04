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
        <h1>Producks</h1>
        <div className="ducks">
          {this.props.allProducts.map(duck => (
            <div className="oneDuck" key={duck.id}>
              <img src={duck.imageUrl} width="300px" height="300px" />
              <Link to={`/products/${duck.id}`}>{duck.name}</Link>
              <p>${duck.price}</p>
            </div>
          ))}
        </div>
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
