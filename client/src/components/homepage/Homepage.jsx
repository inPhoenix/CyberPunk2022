import React, { Component } from "react"
import { Arwes, Col, Content, Frame as FrameC, Header, Words } from "arwes"
import { connect } from "react-redux"
import { MarginTop } from "../../common/styled/MarginTop"
import NewPost from "../post/NewPost"
import ListPosts from "../post/ListPosts"

const isProduction = process.env.NODE_ENV === "production"

class Homepage extends Component {
  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 1000)
  }
  get isAuthenticated() {
    const { user } = this.props
    return !!user.loaded.token
  }

  notAuthorized() {
    return (
      <Arwes style={{ marginLeft: this.props.isExpanded ? "190px" : "0" }}>
        <Content style={{ margin: "20px 50px" }}>
          <blockquote data-layer="alert">ACCESS DENIED</blockquote>
        </Content>
      </Arwes>
    )
  }
  render() {
    if (!this.isAuthenticated && isProduction) {
      return this.notAuthorized()
    }
    return (
      <Arwes style={{ marginLeft: this.props.isExpanded ? "240px" : "0" }}>
        <MarginTop />
        <Col s={12} m={8} l={6} offset={["m2", "l3"]}>
          <div style={{ margin: "30px" }}>
            <FrameC
              show={this.state.show}
              animate
              level={2}
              corners={4}
              layer={"alert"}
            >
              <h3 style={{ textAlign: "center" }}>
                <Words animate layer="alert">
                  Cyberpunk Communications
                </Words>
              </h3>
            </FrameC>
          </div>

          <div style={{ margin: "30px" }}>
            <NewPost />
          </div>

          <div style={{ margin: "30px" }}>
            <ListPosts />
          </div>
        </Col>
      </Arwes>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    posts: state.posts
  }
}

export default connect(mapState)(Homepage)
