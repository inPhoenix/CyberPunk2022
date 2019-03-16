import React, { Component } from "react"
import { connect } from "react-redux"
import { getUsers } from "./redux/reducers"
import { Arwes, Blockquote } from "arwes"

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { user } = this.props
    console.log("%c user", "background: red", user)

    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px"
          }}
        >
          {user.loadedUsers.length &&
            user.loadedUsers.map(user => {
              return <Blockquote data-layer="success">{user.name}</Blockquote>
            })}
        </div>
      </Arwes>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

export default connect(
  mapState,
  { getUsers }
)(Users)
