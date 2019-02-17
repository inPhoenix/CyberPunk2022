import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm } from "redux-form"
import { Button, Frame as FrameC, Project } from "arwes"

const renderField = ({
                       input,
                       label,
                       type,
                       meta: { touched, error, warning }
                     }) => (
  <div>
    <label className={"text-muted"}>{label}</label>
    <div>
      <input
        className={"form-control"}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))}
    </div>
  </div>
)

class SignIn extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Project header={"Login"} animate level={1} corners={3}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Field
              name="email"
              type={"email"}
              label={"email"}
              component={renderField}
            />
            <Field
              name="password"
              type={"password"}
              label={"password"}
              component={renderField}
            />
            <Button animate layer="success">
              <i className="mdi mdi-chemical-weapon" /> Login
            </Button>
          </div>
        </form>
      </Project>
    )
  }
}

const FORM_NAME = "loginForm"
const form = reduxForm({ form: FORM_NAME })(SignIn)
const selector = formValueSelector(FORM_NAME)
const mapStateToProps = state => {
  const values = selector(state, "data")
  return {
    formValues: values,
  }
}

export default connect(mapStateToProps)(form)
