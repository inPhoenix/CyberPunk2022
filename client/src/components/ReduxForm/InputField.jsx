import React, { Component } from "react"
import { Field } from "redux-form"

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

class InputField extends Component {
  render() {
    const { name } = this.props
    return (
      <div>
        <Field name={name} component={renderField} type="input" />
      </div>
    )
  }
}

export default InputField
