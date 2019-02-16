import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm } from "redux-form"

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: ""
  }

  go = () => {
    console.log('%c submit now', 'background: red')
  }
  render() {
    const {formValues, handleSubmit} = this.props
    console.log('%c formValues', 'background: red', formValues)
    return (
      <form onSubmit={handleSubmit}>
        <Field
        name='data.name'
        component='input'
        />
        <Field
          name='data.password'
          component='input'
        />
        <button
          type='submit'
        > submit</button>

      </form>
    )
  }
}


const FORM_NAME = 'signup'
const form = reduxForm({ form: FORM_NAME })(Signup)
const selector = formValueSelector(FORM_NAME)
const mapStateToProps = state => {
  const values = selector(state, 'data')
  return {
    formValues: values,
    home: state.home
  }
}

export default connect(mapStateToProps)(form)
