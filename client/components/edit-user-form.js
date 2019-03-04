import React from 'react'
import {connect} from 'react-redux'
import {update} from '../store'

class EditUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState(this.props.user)
  }

  handleChange(event) {
    const newState = {...this.state, [event.target.name]: event.target.value}
    this.setState(newState)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editUser(this.props.user, this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">
          <small>First Name: </small>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="lastName">
          <small>Last Name: </small>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="email">
          <small>email: </small>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  editUser: (user, state) => {
    dispatch(update(user, state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
