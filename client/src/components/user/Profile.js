import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Button, Project, Words } from "arwes"
import Icon from "@mdi/react"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import styled from "styled-components"
import get from "lodash.get"

import {
  checkIsAuthenticated,
  isAuthenticated,
  getUserInformation
} from "./redux/reducers"
import { Redirect } from "react-router-dom"
const ASSETS = `${process.env.PUBLIC_URL}/assets`

const ButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
`

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
    // const { match } = this.props
    // const getUserId = get(match, 'match.params.userId')
    const getUserId = this.props.match.params.userId

    console.log('%c getUserId', 'background: red', getUserId)
    this.props.getUserInformation(getUserId)
  }

  // componentWillReceiveProps(nextProps) {
  //   const getUserId = this.props.match.params.userId
  //   const newId = nextProps.match.params.userId
  //   if (getUserId !== newId) {
  //     this.props.getUserInformation(newId)
  //   }
  // }

  hasPermission = () => {
    const { user } = this.props
    const loggedUser = get(user, "loaded.user._id")
    const profileUser = get(user, "loadedUser._id")
    if (loggedUser != null && loggedUser === profileUser) {
      return true
    }
    return false
  }

  render() {
    const { user } = this.props
    console.log('%c user', 'background: red', user)
    const isCurrentUser = this.hasPermission()

    const safeUser = {
      loadedUser: {
        user: {
          name: "",
          email: ""
        },
        ...user.loadedUser
      }
    }

    const getName = safeUser.loadedUser.name
    const getEmail = safeUser.loadedUser.email

    if (!this.isAuthenticated) {
      //return this.notAuthorized()
    }

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
                  <div style={{ marginTop: "30px" }} />

                  {isCurrentUser && (
                    <ButtonBar>
                      <Button
                        animate
                        layer="success"
                        onClick={() =>
                          console.log(this.props.history.push("/homepage"))
                        }
                      >
                        <Icon
                          path={mdiChemicalWeapon}
                          size={0.5}
                          color="green"
                          spin
                        />{" "}
                        EDIT PROFILE
                      </Button>
                      <Button
                        animate
                        layer="alert"
                        onClick={() =>
                          console.log(this.props.history.push("/homepage"))
                        }
                      >
                        <Icon path={mdiRobot} size={0.5} color="red" /> BACK
                        TO HOME
                      </Button>
                      <Button
                        animate
                        layer="success"
                        onClick={() =>
                          console.log(this.props.history.push("/homepage"))
                        }
                      >
                        <i className="mdi mdi-chemical-weapon" /> BACK TO
                        HOME
                      </Button>
                    </ButtonBar>
                  )}
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
