import React from "react"
import { Route, Router, Switch, withRouter } from "react-router-dom"
import Home from "./core/Home"
import { connect } from "react-redux";
import SignupContainer from "./components/user/SignupContainer"
import history from './history'
import SignInContainer from "./components/user/SignInContainer"
import Homepage from "./components/homepage/Homepage"

const MainRouter = () => (
  <div>
    <Router history={history}>
    <Switch>
      <Route path="/signUp" component={SignupContainer} />
      <Route path="/signIn" component={SignInContainer} />
      <Route path="/Homepage" component={Homepage} />
      <Route path="/" component={Home} />
    </Switch>
    </Router>
  </div>
)

const mapState = state => {
  return {
    header: state.header
  }
}

export default withRouter(connect(mapState)(MainRouter))

