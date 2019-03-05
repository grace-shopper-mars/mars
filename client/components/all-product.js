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
        <div className="ducks">
          {this.props.allProducts.map(duck => (
            <Link className="link" key={duck.id} to={`/products/${duck.id}`}>
              <div className="oneDuck">
                <img src={duck.imageUrl} width="300px" height="300px" />
                <p>{duck.name}</p>
                <p>${duck.price}</p>
              </div>
            </Link>
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
