import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/allProducts'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadDucks()
  }

  render() {
    console.log('PROPS: ', this.props)
    return (
      <div className="allProducts">
        <h1>All Producks</h1>
        <ul>
          {this.props.products.map(duck => (
            <li key={duck.id}>
              <h5>{duck.name}</h5>
              <img src={duck.imageUrl} width="100px" />
              <p>${duck.price}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('STATE: ', state)
  return {products: state.products}
}

const mapDispatchToProps = dispatch => ({
  loadDucks: function() {
    dispatch(getAllProductsThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
