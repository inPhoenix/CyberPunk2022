import React, { Component } from "react"
import { Blockquote, Button } from "arwes"
import styled from "styled-components"
import get from "lodash.get"
import { connect } from "react-redux"
import { uncommentPost } from "./redux/reducers"

const Hide = styled.div`
  display: ${props => (props.enable ? "flex" : "none")};
`

class Comment extends Component {
  state = {
    show: false
  }
  enableButton = () => {
    this.setState({
      show: true
    })
  }

  delete = comment => {
    const { userId, postId } = this.props
    this.props.uncommentPost(userId, postId, comment)
  }

  disableButton = () => {
    this.setState({
      show: false
    })
  }
  render() {
    const { comment } = this.props
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        onMouseOver={this.enableButton}
        onMouseLeave={this.disableButton}
      >
        <Blockquote>
          {comment.text}
          {get(comment, "postedBy.name") && (
            <span>Posted by: {comment.postedBy.name} </span>
          )}
        </Blockquote>
        <Hide enable={this.state.show}>
          <Button onClick={() => this.delete(comment)}>Delete</Button>
        </Hide>
      </div>
    )
  }
}

export default connect(
  null,
  { uncommentPost }
)(Comment)
