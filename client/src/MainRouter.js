import React from "react"
import { Route, Router, Switch, withRouter } from "react-router-dom"
import Home from "./core/Home"
import { connect } from "react-redux";
import SignupContainer from "./components/user/SignupContainer"
import history from './history'
import SignInContainer from "./components/user/SignInContainer"
import Homepage from "./components/homepage/Homepage"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const MainRouter = () => (
  <div>
    <Router history={history}>
      <Route render={({ location, history }) => (
        <React.Fragment>
          <SideNav
            componentClass='phoenix'
            onSelect={(selected) => {
              const to = '/' + selected;
              if (location.pathname !== to) {
                history.push(to);
              }
            }}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="home">
                <NavIcon>
                  <i className="icon-color fa fa-fw fa-home" style={{ fontSize: '1.50em' }} />
                </NavIcon>
                <NavText>
                  Home
                </NavText>
              </NavItem>
              <NavItem eventKey="signIn">
                <NavIcon>
                  <i className="icon-color fas fa-sign-in-alt" style={{ fontSize: '1.50em' }} />
                </NavIcon>
                <NavText>
                  Login
                </NavText>
              </NavItem><NavItem eventKey="signUp">
                <NavIcon>

                  <i className="icon-color fas fa-user-plus" style={{ fontSize: '1.50em' }} />
                </NavIcon>
                <NavText>
                  Sign Up
                </NavText>
              </NavItem>
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

const mapState = state => {
  return {
    header: state.header
  }
}

export default withRouter(connect(mapState)(MainRouter))

