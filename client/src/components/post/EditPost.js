import React, { Component } from "react"
import { Field, getFormValues, reduxForm } from "redux-form"
import get from "lodash.get"
import { connect } from "react-redux"
import { Arwes, Button } from "arwes"
import { fetchSinglePost, updatePost } from "./redux/reducers"
import TextAreaField from "../ReduxForm/TextAreaField"

class EditPost extends Component {
  componentDidMount() {
    const { match } = this.props
    const getPostId = match.params.postId
    this.props.fetchSinglePost(getPostId)
  }

  submit = values => {
    const { match } = this.props
    const getPostId = match.params.postId
    this.props.updatePost(values, getPostId)
  }

  render() {
    const { handleSubmit, posts } = this.props
    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px"
          }}
        >
          <div>
            <h2>Edit Post</h2>
            <Field
              name={"title"}
              component={"input"}
              className={"form-control full-width"}
            />
          </div>
          <div style={{ width: "100%" }}>
            <TextAreaField
              name={"body"}
              component={"input"}
              className={"full-width"}
            />
          </div>
          <Button
            buttonProps={{ type: "button" }}
            onClick={handleSubmit(this.submit)}
          >
            Save
          </Button>
        </div>
      </Arwes>
    )
  }
}

const FORM_NAME = "EditPost"
const form = reduxForm({ form: FORM_NAME })(EditPost)

const mapStateToProps = state => {
  const getTitle = get(state.posts, "single.title")
  const getBody = get(state.posts, "single.body")

  const initialValues = {
    title: getTitle,
    body: getBody
  }
  return {
    formValues: getFormValues(FORM_NAME)(state),
    posts: state.posts,
    initialValues: initialValues
  }
}

export default connect(
  mapStateToProps,
  { fetchSinglePost, updatePost }
)(form)
