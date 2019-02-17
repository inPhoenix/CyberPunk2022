import React from "react"
import { Route, Router, Switch, withRouter } from "react-router-dom"
import Home from "./core/Home"
import { connect } from "react-redux"
import SignupContainer from "./components/user/SignupContainer"
import history from "./history"
import SignInContainer from "./components/user/SignInContainer"
import Homepage from "./components/homepage/Homepage"
import { signOut } from "./components/user/redux/reducers"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"

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

const MainRouter = ({ signOut, user }) => {
  return (
    <div>
      <Router history={history}>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                componentClass="div"
                className="phoenix"
                onSelect={selected => {
                  const to = "/" + selected
                  if (location.pathname !== to) {
                    history.push(to)
                  }
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
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
                  {renderLogout(user, signOut)}
                </SideNav.Nav>
              </SideNav>
              <Switch>
                <Route path="/signUp" component={SignupContainer} />
                <Route path="/signIn" component={SignInContainer} />
                <Route path="/Homepage" component={Homepage} />
                <Route path="/" component={Home} />
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
