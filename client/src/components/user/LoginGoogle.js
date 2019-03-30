import React, { Component } from "react"
import GoogleLogin from "react-google-login"
import { connect } from "react-redux"
import { socialLogin } from "./redux/reducers"
import { Button } from "arwes"

class LoginGoogle extends Component {
  responseGoogle = response => {
    console.log(response)
    const { googleId, name, email, imageUrl } = response.profileObj
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl
    }
    this.props.socialLogin(user)
  }

  render() {
    return (
      <div className="">
        <GoogleLogin
          clientId="665418634223-295bluqldfbutnt3jv5a7oahd4kd1cf1.apps.googleusercontent.com"
          render={renderProps => (
            <Button animate layer="secondary" onClick={renderProps.onClick}>
              Login with Google
            </Button>
          )}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { socialLogin }
)(LoginGoogle)
