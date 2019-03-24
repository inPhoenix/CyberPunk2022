import React, { Component } from "react"
import { Field } from "redux-form"

const renderTextAreaField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label className={"text-muted"}>{label}</label>
    <div>
      <textarea
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

class TextAreaField extends Component {
  render() {
    const { name } = this.props
    return (
      <div>
        <Field name={name} component={renderTextAreaField} type="input" />
      </div>
    )
  }
}

export default TextAreaField
