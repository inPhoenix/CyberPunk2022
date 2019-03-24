import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchPosts } from "./redux/reducers"
import { Content, Frame as FrameC, List } from "arwes"
import styled from "styled-components"

const Title = styled.div`
  padding: 10px 10px 10px 15px;
`

class ListPosts extends Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  componentWillReceiveProps() {
    //if()
  }

  render() {
    const { posts } = this.props
    return (
      <div>
        {posts.posts.length &&
          posts.posts.map(post => {
            return (
              <FrameC animate level={2} corners={1} layer={"success"}>
                <Content node="ul" key={post._id}>
                  <Title data-layer="disabled">{post.title}</Title>
                  <blockquote data-layer="disabled">{post.body}</blockquote>
                </Content>
              </FrameC>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    posts: state.posts
  }
}

export default connect(
  mapState,
  { fetchPosts }
)(ListPosts)
