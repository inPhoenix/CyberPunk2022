import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Content, Project, Words } from "arwes"
const ASSETS = `${process.env.PUBLIC_URL}/assets`

class Profile extends Component {
  state = {
    user: "",
    redirectToSignin: false
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

  componentDidMount() {
    const getUserId = this.props.match.params.userId
    console.log("%c getUserId", "background: red", getUserId)
  }

  render() {
    const { user } = this.props
    console.log("%c user", "background: red", user)
    const safeUser = {
      loaded: {
        user: {
          name: "",
          email: ""
        },
        ...user.loaded
      }
    }

    console.log("%c safeUser", "background: red", safeUser)
    const getName = safeUser.loaded.user.name
    const getEmail = safeUser.loaded.user.email

    if (!this.isAuthenticated) {
      return this.notAuthorized()
    }

    console.log("%c user", "background: red", user)
    return (
      <Arwes>
        <div style={{ margin: '100px', marginLeft: this.props.isExpanded ? "250px" : "100px" }}>
        <Project animate header="Profile">
          {anim => (
            <div><Words animate show={anim.entered}>
              {getName}
              </Words>
              <div>
                <Words animate show={anim.entered}>
                  {getEmail}
                </Words>
              </div>

            </div>
          )}
        </Project>
        </div>
      </Arwes>

    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Profile)
