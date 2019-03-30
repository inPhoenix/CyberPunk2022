import React, { Component } from "react"
import { Arwes, Button, Loading, Project, Words } from "arwes"
import { connect } from "react-redux"
import { deletePost, fetchSinglePost } from "./redux/reducers"
import { Text } from "../../common/styled/Text"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import isSameDay from "date-fns/isSameDay"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import Icon from "@mdi/react"
import { ButtonBar } from "../Styled"

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

  deletePost = postId => {
    console.log("%c postId", "background: red", postId)
    this.props.deletePost(postId)
    this.props.history.push('/homepage')
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
              onClick={() => this.props.history.push(`/homepage`)}
            >
              <Icon path={mdiChemicalWeapon} size={0.5} color="green" spin />{" "}
              EDIT POST
            </Button>
            <Button animate layer="alert" onClick={() => this.deletePost(post._id)}>
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
        </div>
      </Arwes>
    )
  }
}

const mapState = state => {
  return {
    post: state.posts.single,
    isLoading: state.posts.isLoading
  }
}

export default connect(
  mapState,
  { fetchSinglePost, deletePost }
)(PostInfo)
