import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm } from "redux-form"
import { Button, Frame, Project } from "arwes"

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label className={'text-muted'}>{label}</label>
    <div>
      <input className={'form-control'} {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class Signup extends Component {
  render() {
    const { formValues, handleSubmit } = this.props
    console.log("%c formValues", "background: red", formValues)
    return (
      <Project header={'SignUp'}animate level={1} corners={3}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Field name="data.name" component={renderField} />
            <Field name="data.password" component={renderField} />
            <Button animate layer='success'>
              <i className='mdi mdi-chemical-weapon' /> Signin
            </Button>

          </div>
        </form>
      </Project>

    )
  }
}

const FORM_NAME = "signup"
const form = reduxForm({ form: FORM_NAME })(Signup)
const selector = formValueSelector(FORM_NAME)
const mapStateToProps = state => {
  const values = selector(state, "data")
  return {
    formValues: values,
    home: state.home
  }
}

export default connect(mapStateToProps)(form)
