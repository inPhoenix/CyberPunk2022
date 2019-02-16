import React from "react"
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./core/Home"
import { connect } from "react-redux";
import SignupContainer from "./components/user/SignupContainer"

const MainRouter = () => (
  <div>
    <Switch>
      <Route path="/" component={SignupContainer} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
)

const mapState = state => {
  return {
    header: state.header
  }
}

export default withRouter(connect(mapState)(MainRouter))

