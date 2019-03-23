import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Button, Project, Words, Image } from "arwes"
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

const isProduction = process.env.NODE_ENV === "production"
const envURL =
  process.env.REACT_APP_API_URL || "https://cybersocial.herokuapp.com"
const PUBLIC_URL = isProduction ? envURL : "http://localhost:8080"

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

  renderImage = () => {
    const { user } = this.props
    const getUserId = get(user, "loadedUser._id", "000")
    const photoUrl = `${PUBLIC_URL}/user/photo/${getUserId}?${new Date().getTime()}`
    const photoFallBack = `${ASSETS}/avatarm.png`
    {
      /*<Image animate resources={`${ASSETS}/avatarm.png`} />*/
    }
    return (
      <div style={{ margin: "0 auto", padding: 20, maxWidth: 130 }}>
        <img
          style={{ maxWidth: "80px" }}
          animate
          src={photoUrl}
          onError={e => {
            if (e.target.src !== photoFallBack) {
              e.target.src = photoFallBack
            }
          }}
        />
      </div>
    )
  }

  componentDidMount() {
    // const { match } = this.props
    // const getUserId = get(match, 'match.params.userId')
    const getUserId = this.props.match.params.userId

    this.props.getUserInformation(getUserId)
  }

  componentWillReceiveProps(nextProps) {
    const getUserId = this.props.match.params.userId
    const newId = nextProps.match.params.userId

    if (getUserId !== newId) {
      this.props.getUserInformation(newId)
    }
  }

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
    const isCurrentUser = this.hasPermission()

    const isProduction = process.env.NODE_ENV === "production"
    const enableDelete = !isProduction

    const safeUser = {
      loadedUser: {
        name: "",
        email: "",
        about: 'user didnt provide any info about him',

        ...user.loadedUser
      }
    }

    const getName = safeUser.loadedUser.name
    const getEmail = safeUser.loadedUser.email
    const getId = safeUser.loadedUser._id
    const getAbout = safeUser.loadedUser.about

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
              <div style={{ display: "flex" }}>
                <div style={{ display: "", padding: 20, maxWidth: 130 }}>
                  {/*<Image animate resources={`${ASSETS}/avatarm.png`} />*/}

                  {this.renderImage()}
                </div>

                <div>
                  <Words animate show={anim.entered}>
                    {getName}
                  </Words>
                  <div>
                    <Words animate show={anim.entered}>
                      {getEmail}
                    </Words>
                    <br />
                    <Words animate show={anim.entered}>
                      {getAbout}
                    </Words>
                    <div style={{ marginTop: "30px" }} />

                    {(isCurrentUser || enableDelete) && (
                      <ButtonBar>
                        <Button
                          animate
                          layer="success"
                          onClick={() =>
                            this.props.history.push(`/editUser/${getId}`)
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
                            this.props.history.push(`/deleteUser/${getId}`)
                          }
                        >
                          <Icon path={mdiRobot} size={0.5} color="red" /> DELETE
                          USER
                        </Button>
                        <Button
                          animate
                          layer="alert"
                          // onClick={() =>
                          //   this.props.history.push(`/deleteUser/${getId}`)
                          // }
                        >
                          <i className="mdi mdi-chemical-weapon" /> BACK TO HOME
                        </Button>
                      </ButtonBar>
                    )}
                  </div>
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
