import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="home">
      <div className="homeInfo">
        <h2>Welcome, {email}</h2>
        <Link to="/edit">
          <small>edit account</small>
        </Link>
      </div>
      <img
        className="background"
        src="https://wallpaperplay.com/walls/full/9/8/e/54275.jpg"
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
