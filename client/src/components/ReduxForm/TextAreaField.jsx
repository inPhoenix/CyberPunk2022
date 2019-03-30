import React, { Component } from "react"
import { Field } from "redux-form"

const renderTextAreaField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error, warning }
}) => {
  const classname = ["form-control", className ? className : ""].join(" ")
  return (
    <div>
      <label className={"text-muted"}>{label}</label>
      <div>
        <textarea
          className={classname}
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
}

class TextAreaField extends Component {
  render() {
    const { name, label, className } = this.props
    return (
      <div>
        <Field
          name={name}
          className={className}
          label={label}
          component={renderTextAreaField}
          type="input"
        />
      </div>
    )
  }
}

export default TextAreaField
