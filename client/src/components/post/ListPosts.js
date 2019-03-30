import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchPosts } from "./redux/reducers"
import { Link } from "react-router-dom"
import Post from "./Post"


class ListPosts extends Component {
  state = {
    count: "success",
    corner: 1
  }
  componentDidMount() {
    this.props.fetchPosts()
  }

  componentWillReceiveProps() {
    //if()
  }

  render() {
    const { data } = this.props
    return (
      <div>
        {data.posts.length &&
          data.posts.map((post) => {
            return (
              <div key={post._id}>
                <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                 <Post post={post}/>
                </Link>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    data: state.posts
  }
}

export default connect(
  mapState,
  { fetchPosts }
)(ListPosts)
