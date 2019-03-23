import React, { Component } from "react"
import { Arwes, Col, Content, Frame as FrameC, Header, Words } from "arwes"
import { connect } from "react-redux"
import { MarginTop } from "../../common/styled/MarginTop"

class Homepage extends Component {
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
    if (!this.isAuthenticated) {
      return this.notAuthorized()
    }
    return (
      <Arwes style={{ marginLeft: this.props.isExpanded ? "240px" : "0" }}>
        <MarginTop />
        <Col s={12} m={8} l={6} offset={["m2", "l3"]}>
          <FrameC animate level={2} corners={1} layer={"success"}>
            <h3 style={{ margin: 20 }}>
              <Words animate layer="success">
                Welcome to Cyberpunk Communications
              </Words>
            </h3>
          </FrameC>
          <div>You are Logged</div>
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
