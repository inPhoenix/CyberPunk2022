import React, { Component } from "react"
import { getFormValues, reduxForm, reset } from "redux-form"
import get from "lodash.get"
import { connect } from "react-redux"
import { Button, Frame as FrameC, Loading, Project } from "arwes"
import { createPost, fetchPosts } from "./redux/reducers"
import Icon from "@mdi/react"
import { mdiChemicalWeapon, mdiCancel } from "@mdi/js"
import { ButtonBar } from "../Styled"
import TextAreaField from "../ReduxForm/TextAreaField"
import InputField from "../ReduxForm/InputField"
import styled from "styled-components"

const Hide = styled.div`
  display: ${props => (props.enable ? "in-block" : "none")};
`
const LoadingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`

const type = {
  type: "button"
}

class NewPost extends Component {
  state = {
    enableCreate: false
  }

  enableCreatePost = () => {
    this.props.dispatch(reset("NewPost"))
    this.setState(prev => ({
      enableCreate: !prev.enableCreate
    }))
  }
  //
  onSubmit = values => {
    const { user } = this.props
    const getUserId = get(user, "loaded.user._id")
    if (getUserId) {
      this.props.createPost(values, getUserId)
      this.enableCreatePost() // close the form
    } else {
      console.error(
        "%c you are in dev mode, and logged out",
        "background: yellow; color: red"
      )
    }
  }

  render() {
    const { handleSubmit } = this.props
    const { enableCreate } = this.state
    return (
      <Project animate header={"Create new Post"}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Hide enable={enableCreate}>
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
                <InputField name={"title"} />
                <TextAreaField name={"body"} />
              </div>
            </FrameC>

            <ButtonBar right>
              <Button animate layer="success">
                <Icon path={mdiChemicalWeapon} size={0.7} color="green" spin />{" "}
                Save Changes
              </Button>
              <Button
                animate
                layer="alert"
                buttonProps={type}
                onClick={this.enableCreatePost}
              >
                <Icon path={mdiCancel} size={0.7} color="red" /> Cancel
              </Button>
            </ButtonBar>
          </Hide>
        </form>

        <Hide enable={!enableCreate}>
          <ButtonBar>
            <Button animate layer="success" onClick={this.enableCreatePost}>
              <Icon path={mdiChemicalWeapon} size={0.7} color="green" spin />{" "}
              New Post
            </Button>
          </ButtonBar>
          {this.props.posts.isLoading && (
            <LoadingContainer>
              <Loading animate small />
            </LoadingContainer>
          )}
        </Hide>
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
  { createPost, fetchPosts }
)(form)
