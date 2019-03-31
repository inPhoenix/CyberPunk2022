import React, { Component } from "react"
import { Arwes, Button, Loading, Project, Words } from "arwes"
import { connect } from "react-redux"
import { commentPost, deletePost, fetchSinglePost } from "./redux/reducers"
import { Text } from "../../common/styled/Text"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import isSameDay from "date-fns/isSameDay"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import Icon from "@mdi/react"
import { ButtonBar } from "../Styled"
import styled from "styled-components"
import { Field, getFormValues, reduxForm, reset } from "redux-form"
import get from "lodash.get"
import Comment from "./Comment"

const CommentBoxContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`

const CommentsContainer = styled.div`
  margin-top: 80px;
  span {
    font-size: 0.8rem;
    padding-left: 30px;
    color: aqua;
  }
`

class PostInfo extends Component {
  state = {
    showText: false
  }
  componentDidMount() {
    const { match } = this.props
    this.props.fetchSinglePost(match.params.postId)
    setTimeout(() => {
      this.setState({
        showText: true
      })
    }, 700)
  }

  renderComments = () => {
    const { match, user, post } = this.props
    const getPostId = match.params.postId
    const getUserId = get(user, "loaded.user._id")

    const getComments = get(post, "comments", [])
    if (!getComments.length) {
      return
    }
    return (
      <CommentsContainer>
        {getComments.map(comment => {
          return (
            <Comment comment={comment} postId={getPostId} userId={getUserId} />
          )
        })}
      </CommentsContainer>
    )
  }

  deletePost = postId => {
    this.props.deletePost(postId)
    this.props.history.push("/homepage")
  }

  submit = comment => {
    const { match, user } = this.props
    const getPostId = match.params.postId
    const getUserId = get(user, "loaded.user._id")
    this.props.commentPost(getUserId, getPostId, comment)
    this.props.dispatch(reset("PostInfo"))
  }

  render() {
    const { post, isLoading } = this.props

    const postedBy = post && post.postedBy && post.postedBy.name

    const safePost = {
      created: "2019-03-30T11:56:03.575Z",
      ...post
    }

    const newDate = parseISO(safePost.created)
    const date = format(newDate, "do MMM")
    const isToday = isSameDay(new Date(), new Date(safePost.created))

    const displayDate = isToday ? `Today` : `${date}`

    if (isLoading) {
      return (
        <Arwes>
          <div style={{ position: "relative", height: 300, margin: "0 auto" }}>
            <Loading animate full />
          </div>
        </Arwes>
      )
    }
    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px"
          }}
        >
          <Project animate header={post.title || "loading"}>
            {anim => (
              <p>
                <Words animate show={this.state.showText}>
                  {post.body}
                </Words>
              </p>
            )}
          </Project>
          <Text color={"red"}>
            Posted by {postedBy} at {displayDate}
          </Text>
          <ButtonBar>
            <Button
              animate
              layer="success"
              onClick={() => this.props.history.push(`/editPost/${post._id}`)}
            >
              <Icon path={mdiChemicalWeapon} size={0.5} color="green" spin />{" "}
              EDIT POST
            </Button>
            <Button
              animate
              layer="alert"
              onClick={() => this.deletePost(post._id)}
            >
              <Icon path={mdiRobot} size={0.5} color="red" /> DELETE POST
            </Button>
            <Button
              animate
              layer="alert"
              onClick={() => this.props.history.push(`/homepage`)}
            >
              <i className="mdi mdi-chemical-weapon" /> BACK TO HOME
            </Button>
          </ButtonBar>
          {this.renderComments()}
          <CommentBoxContainer>
            <Field name="text" component="input" className="form-control" />
            <div>
              <Button onClick={this.props.handleSubmit(this.submit)}>
                Submit Comment
              </Button>
            </div>
          </CommentBoxContainer>
        </div>
      </Arwes>
    )
  }
}

const FORM_NAME = "PostInfo"
const form = reduxForm({ form: FORM_NAME })(PostInfo)

const mapStateToProps = state => {
  return {
    formValues: getFormValues(FORM_NAME)(state),
    post: state.posts.single,
    isLoading: state.posts.isLoading,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { fetchSinglePost, deletePost, commentPost }
)(form)
