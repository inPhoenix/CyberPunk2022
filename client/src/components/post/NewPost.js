import React, { Component } from "react"
import { Field, getFormValues, reduxForm } from "redux-form"
import get from "lodash.get"
import { connect } from "react-redux"
import { Button, Frame as FrameC, Project } from "arwes"
import { createPost } from "./redux/reducers"
import Icon from "@mdi/react"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import { ButtonBar } from "../Styled"
import TextAreaField from "../ReduxForm/TextAreaField"
import InputField from "../ReduxForm/InputField"


class NewPost extends Component {
//
  onSubmit = values => {
    const { user } = this.props
    const getUserId = get(user, "loaded.user._id")
    if(getUserId) {
    this.props.createPost(values, getUserId)
    } else {
      console.error('%c you are in dev mode, and logged out', 'background: yellow; color: red', )

    }
  }

  render() {
    const { handleSubmit, user } = this.props
    console.log('%c user', 'background: red', user)
    return (
      <Project animate header={"Create new Post"}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
              <InputField name={'title'}/>
              <TextAreaField name={'body'}/>
            </div>
          </FrameC>

          <ButtonBar right>
            <Button animate layer="success">
              <Icon path={mdiChemicalWeapon} size={0.7} color="green" spin />{" "}
              Save Changes
            </Button>
          </ButtonBar>
        </form>
      </Project>
    )
  }
}

const FORM_NAME = "NewPost"
const form = reduxForm({ form: FORM_NAME })(NewPost)

const mapStateToProps = state => {
  const posts = get(state.posts, "loadedUser.name")

  const initialValues = {
    posts: posts
  }
  return {
    formValues: getFormValues(FORM_NAME)(state),
    posts: state.posts,
    user: state.user,
    initialValues: initialValues
  }
}

export default connect(
  mapStateToProps,
  { createPost }
)(form)
