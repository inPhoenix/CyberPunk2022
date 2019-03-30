import React, { Component } from "react"
import { Content, Frame as FrameC, List, Words } from "arwes"
import styled from "styled-components"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import isSameDay from "date-fns/isSameDay"
import { Text } from "../../common/styled/Text"

const Title = styled.div`
  padding: 10px 10px 10px 15px;
`
// const Text = styled.div`
//   padding: 0 20px 5px 0;
//   color: ${props => (props.color ? props.color : "aqua")};
// `

const ByContainer = styled.div`
  display: flex;
 
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.7rem;
  span {
  color: #6fbfff;
  }
`

class Post extends Component {
  state = {
    count: "success",
    corner: 1
  }
  mouseOver = (key, postId) => {
    const { data } = this.props

    this.setState({
      count: "control",
      corner: 4
    })
  }
  mouseLeave = () => {
    this.setState({
      count: "success",
      corner: 1
    })
  }

  render() {
    const { post } = this.props
    const newDate = parseISO(post.created)
    const date = format(newDate, "do MMM")
    const isToday = isSameDay(new Date(), new Date(post.created))

    const displayDate = isToday ? `Today` : `${date}`

    const postBody = post.body.substring(0, 100)

    return (
      <div style={{ marginBottom: "8px" }}>
        <FrameC
          onMouseOver={() => this.mouseOver()}
          onMouseLeave={this.mouseLeave}
          animate
          level={2}
          corners={this.state.corner}
          layer={this.state.count}
        >
          <Content node="ul" key={post._id}>
            <Title data-layer="disabled">{post.title}</Title>
            <blockquote data-layer="disabled">{postBody}</blockquote>
            <ByContainer>
              <Text><span>Posted by</span> {post.postedBy.name}</Text>
              <Text color={"#d1ffdb"}>{displayDate}</Text>
            </ByContainer>
          </Content>
        </FrameC>
      </div>
    )
  }
}

export default Post
