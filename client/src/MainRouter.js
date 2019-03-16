import React, { useState } from "react"
import { Route, Router, Switch, withRouter } from "react-router-dom"
import Home from "./core/Home"
import { connect } from "react-redux"
import SignupContainer from "./components/user/SignupContainer"
import history from "./history"
import SignInContainer from "./components/user/SignInContainer"
import Homepage from "./components/homepage/Homepage"
import { signOut } from "./components/user/redux/reducers"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import Profile from "./components/user/Profile"
import get from "lodash.get"

const PATH = process.env.NODE_ENV === "production" ? "/" : "/"

const renderLogout = (user, signOut) => {
  if (!user.loaded.token) {
    return
  }

  return (
    <NavItem eventKey="signOut" onClick={signOut}>
      <NavIcon>
        <i
          className="icon-color fas fa-sign-out-alt"
          style={{ fontSize: "1.50em" }}
        />
      </NavIcon>
      <NavText>
        <div className="link-color">Logout</div>
      </NavText>
    </NavItem>
  )
}

const renderProfile = user => {
  if (!user.loaded.token) {
    return
  }

  return (
    <NavItem eventKey={`profile`}>
      <NavIcon>
        <i className="icon-color fas fa-user" style={{ fontSize: "1.50em" }} />
      </NavIcon>
      <NavText>
        <div className="link-color">Profile</div>
      </NavText>
    </NavItem>
  )
}

const renderHomepage = user => {
  if (!user.loaded.token) {
    console.log("%c user", "background: red", user.loaded.token)
    return
  }

  return (
    <NavItem eventKey="homepage">
      <NavIcon>
        <i className="icon-color fas fa-home" style={{ fontSize: "1.50em" }} />
      </NavIcon>
      <NavText>
        <div className="link-color">Home</div>
      </NavText>
    </NavItem>
  )
}

const MainRouter = ({ signOut, user }) => {
  function clickedTest() {
    setExpanded(!expanded)
  }

  const getUserId = get(user, "loaded.user._id")
  const isLoggedIn = user.loaded.token
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <Router history={history}>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                onToggle={() => clickedTest()}
                componentClass="div"
                className="phoenix"
                onSelect={selected => {
                  const to = "/" + selected
                  if (selected === "profile") {
                    return history.push(`user/${getUserId}`)
                  }
                  if (location.pathname !== to) {
                    history.push(to)
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  {!isLoggedIn && (
                    <NavItem eventKey="home">
                      <NavIcon>
                        <i
                          className="icon-color fa fa-fw fa-home"
                          style={{ fontSize: "1.50em" }}
                        />
                      </NavIcon>
                      <NavText>
                        <div className="link-color">Home</div>
                      </NavText>
                    </NavItem>
                  )}
                  {!isLoggedIn && (
                    <NavItem eventKey="signIn">
                      <NavIcon>
                        <i
                          className="icon-color fas fa-sign-in-alt"
                          style={{ fontSize: "1.50em" }}
                        />
                      </NavIcon>
                      <NavText>
                        <div className="link-color">Login</div>
                      </NavText>
                    </NavItem>
                  )}
                  {!isLoggedIn && (
                    <NavItem eventKey="signUp">
                      <NavIcon>
                        <i
                          className="icon-color fas fa-user-plus"
                          style={{ fontSize: "1.50em" }}
                        />
                      </NavIcon>
                      <NavText>
                        <div className="link-color">Sign Up</div>
                      </NavText>
                    </NavItem>
                  )}
                  {renderHomepage(user)}
                  {renderProfile(user)}
                  {renderLogout(user, signOut)}
                </SideNav.Nav>
              </SideNav>

              <Switch>
                <Route
                  path={`${PATH}signUp`}
                  render={props => (
                    <SignupContainer isExpanded={expanded} {...props} />
                  )}
                />
                <Route
                  path={`${PATH}signIn`}
                  render={props => (
                    <SignInContainer isExpanded={expanded} {...props} />
                  )}
                />
                <Route
                  path={`${PATH}homepage`}
                  render={props => (
                    <Homepage isExpanded={expanded} {...props} />
                  )}
                />
                <Route
                  path={`${PATH}user/:userId`}
                  render={props => <Profile isExpanded={expanded} {...props} />}
                />
                <Route
                  path={`${PATH}`}
                  render={props => <Home isExpanded={expanded} {...props} />}
                />
              </Switch>
            </React.Fragment>
          )}
        />
      </Router>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default withRouter(
  connect(
    mapState,
    { signOut }
  )(MainRouter)
)
