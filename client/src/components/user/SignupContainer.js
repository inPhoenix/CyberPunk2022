import React, { Component } from "react"
import Signup from "./Signup"

class SignupContainer extends Component {
  handleSubmit = () => {
    console.log('%c submiitted', 'background: yellow')
  }
  render() {
    return (
      <div>
        <Signup onSubmit={this.handleSubmit}/>

      </div>
    )
  }
}

export default SignupContainer
