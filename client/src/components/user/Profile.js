import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Button, Content, Project, Words } from "arwes"
import {
  checkIsAuthenticated,
  isAuthenticated,
  getUserInformation
} from "./redux/reducers"
import { Redirect } from "react-router-dom"
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
    return <Redirect to="/signIn" />
  }

  componentDidMount() {
    const getUserId = this.props.match.params.userId
    this.props.getUserInformation(getUserId)
  }

  // componentWillReceiveProps(nextProps) {
  //   const getUserId = this.props.match.params.userId
  //   const newId = nextProps.match.params.userId
  //   if (getUserId !== newId) {
  //     this.props.getUserInformation(newId)
  //   }
  // }

  render() {
    const { user } = this.props
    const safeUser = {
      loadedUser: {
        user: {
          name: "",
          email: ""
        },
        ...user.loadedUser
      }
    }

    console.log("%c safeUser", "background: red", safeUser)
    const getName = safeUser.loadedUser.name
    const getEmail = safeUser.loadedUser.email

    if (!this.isAuthenticated) {
      return this.notAuthorized()
    }

    console.log("%c user", "background: red", user)
    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px"
          }}
        >
          <Project animate header="Profile">
            {anim => (
              <div>
                <Words animate show={anim.entered}>
                  {getName}
                </Words>
                <div>
                  <Words animate show={anim.entered}>
                    {getEmail}
                  </Words>
                  <br />
                  <Button
                    animate
                    layer="success"
                    onClick={() =>
                      console.log(this.props.history.push("/homepage"))
                    }
                  >
                    <i className="mdi mdi-chemical-weapon" /> BACK TO HOME
                  </Button>
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

export default connect(
  mapState,
  { checkIsAuthenticated, getUserInformation }
)(Profile)
