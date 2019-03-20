import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Button, Project, Words, Image, Frame as FrameC } from "arwes"
import Icon from "@mdi/react"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import styled from "styled-components"
import get from "lodash.get"
import {
  checkIsAuthenticated,
  isAuthenticated,
  getUserInformation, editUserProfile
} from "./redux/reducers"
import { Redirect } from "react-router-dom"
import { Field, formValueSelector, getFormValues, reduxForm } from "redux-form"

const ASSETS = `${process.env.PUBLIC_URL}/assets`

const Hide = styled.div`
  display: ${props => (props.enable ? "flex" : "none")};
`

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

const ButtonBar = styled.div`
  display: flex;
  justify-content: ${props => props.right ? 'flex-end' : 'space-evenly'}
  margin-bottom: 10px;
`

class EditProfile extends Component {
  state = {
    isEditName: false,
    isEditPassword: false,
    isEditEmail: false
  }

  componentDidMount() {
    // const { match } = this.props
    // const getUserId = get(match, 'match.params.userId')
    const getUserId = this.props.match.params.userId

    this.props.getUserInformation(getUserId)
  }

  enableEditName = () => {
    this.setState(prev => ({
      isEditName: !prev.isEditName
    }))
  }
  enableEditEmail = () => {
    this.setState(prev => ({
      isEditEmail: !prev.isEditEmail
    }))
  }
  enableEditPassword = () => {
    this.setState(prev => ({
      isEditPassword: !prev.isEditPassword
    }))
  }

  onSubmit = (values) => {
    const { user } = this.props
    const getUserId = get(user, "loadedUser._id")
    this.props.editUserProfile(values, getUserId)


  }

  render() {
    const { user, isExpanded, handleSubmit } = this.props
    const getName = get(user, "loadedUser.name")
    const getEmail = get(user, "loadedUser.email")
    const getUserId = get(user, "loadedUser._id")

    if (!this.isAuthenticated) {
      //return this.notAuthorized()
    }

    const type = {
      type: "button"
    }
    return (
      <Arwes>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div
            style={{
              margin: "100px",
              marginLeft: isExpanded ? "250px" : "100px"
            }}
          >
            <Project animate header={"Edit Profile"}>
              <div style={{ display: "inline-block", padding: "20px" }}>
                <FrameC
                  show={true}
                  animate={true}
                  level={3}
                  corners={4}
                  layer="primary"
                >
                  <div style={{ padding: "20px 40px", fontSize: "32px" }}>
                    <Hide enable={this.state.isEditName}>
                      <Field
                        name="name"
                        component={renderField}
                        type="input"
                      />
                    </Hide>
                    <Hide enable={!this.state.isEditName}>{getName}</Hide>
                  </div>
                  <ButtonBar>
                    <Button
                      buttonProps={type}
                      animate
                      layer="success"
                      onClick={this.enableEditName}
                    >
                      <Icon
                        path={mdiChemicalWeapon}
                        size={0.7}
                        color="green"
                        spin
                      />{" "}
                      Edit Name
                    </Button>
                  </ButtonBar>
                </FrameC>
                <FrameC
                  show={true}
                  animate={true}
                  level={3}
                  corners={4}
                  layer="primary"
                >
                  <div style={{ padding: "20px 40px", fontSize: "32px" }}>
                    <Hide enable={this.state.isEditEmail}>
                      <Field
                        name="email"
                        component={renderField}
                        type="input"
                      />
                    </Hide>
                    <Hide enable={!this.state.isEditEmail}>{getEmail}</Hide>
                  </div>
                  <ButtonBar>
                    <Button
                      buttonProps={type}
                      type="button"
                      animate
                      layer="success"
                      onClick={this.enableEditEmail}
                    >
                      <Icon
                        path={mdiChemicalWeapon}
                        size={0.7}
                        color="green"
                        spin
                      />{" "}
                      Edit Email
                    </Button>
                  </ButtonBar>
                </FrameC>

                <FrameC
                  show={true}
                  animate={true}
                  level={3}
                  corners={4}
                  layer="primary"
                >
                  <div
                    style={{
                      padding: "20px 40px",
                      fontSize: "32px",
                      textAlign: "center"
                    }}
                  >
                    <Hide enable={this.state.isEditPassword}>
                      <Field
                        name="password"
                        component={renderField}
                        type="input"
                      />
                    </Hide>
                    <Hide enable={!this.state.isEditPassword}>*****</Hide>
                  </div>
                  <ButtonBar>
                    <Button
                      buttonProps={type}
                      type="button"
                      animate
                      layer="control"
                      onClick={this.enableEditPassword}
                    >
                      <Icon
                        path={mdiChemicalWeapon}
                        size={0.7}
                        color="green"
                        spin
                      />{" "}
                      Edit Password
                    </Button>
                  </ButtonBar>
                </FrameC>
              </div>
              <ButtonBar right>
                <Button
                  animate
                  layer="success"
                >
                  <Icon
                    path={mdiChemicalWeapon}
                    size={0.7}
                    color="green"
                    spin
                  />{" "}
                  Save Changes
                </Button>
              </ButtonBar>
            </Project>
          </div>
        </form>
      </Arwes>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const FORM_NAME = "EditProfile"
const form = reduxForm({ form: FORM_NAME })(EditProfile)

const mapStateToProps = state => {
  const getName = get(state.user, "loadedUser.name")
  const getEmail = get(state.user, "loadedUser.email")
  const initialValues = {
    name: getName,
    email: getEmail
  }
  return {
    formValues: getFormValues(FORM_NAME)(state),
    user: state.user,
    initialValues: initialValues
  }
}

export default connect(
  mapStateToProps,
  { checkIsAuthenticated, getUserInformation, editUserProfile }
)(form)
