import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm } from "redux-form"
import { Arwes, Button, Col, Frame as FrameC, Loading, Project } from "arwes"
import { MarginTop } from "../../common/styled/MarginTop"
import styled from "styled-components"

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
        className={"form-control-alt"}
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

const color = '#d813ff';
const Container = styled.div`
display: flex;
justify-content: center;
border-top: ${color} 1px solid;
border-bottom: ${color} 1px solid;
padding: 20px 0;

`

const BtnContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
`

const BtnModifier = styled.div`
  padding: 0 20px;
`

class SignInInternal extends Component {
  render() {
    const { handleSubmit } = this.props
    const { user } = this.props
    if (user.isLoading) {
      return (
        <Arwes>
          <MarginTop />
          <Col s={12} m={8} l={6} offset={["m2", "l3"]}>
            <Loading full animate />
          </Col>
        </Arwes>
      )
    }
    return (
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Field
              name="email"
              type={"email"}
              label={"Email"}
              component={renderField}
            />
            <Field
              name="password"
              type={"password"}
              label={"Password"}
              component={renderField}
            />
              <BtnContainer>
            <Button animate layer="control">
              <BtnModifier>
              <i className="mdi mdi-chemical-weapon" /> Login
              </BtnModifier>
            </Button>
              </BtnContainer>
          </div>
        </form>
      </Container>
    )
  }
}

const FORM_NAME = "loginForm"
const form = reduxForm({ form: FORM_NAME })(SignInInternal)
const selector = formValueSelector(FORM_NAME)

const initialValues = {
  email: "guest@guest.com",
  password: "default123"
}
const mapStateToProps = state => {
  const values = selector(state, "data")
  return {
    formValues: values,
    user: state.user,
    initialValues: initialValues
  }
}

export default connect(mapStateToProps)(form)
