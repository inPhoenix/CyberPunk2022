import React, { Component } from "react"
import { connect } from "react-redux"
import { Arwes, Content } from "arwes"

class Profile extends Component {
  state = {
    user: '',
    redirectToSignin: false,
  }

  get isAuthenticated() {
    const {user} =this.props
    return !!user.loaded.token
  }

  notAuthorized() {
    return (
      <Arwes style={{ marginLeft:  this.props.isExpanded ? '190px' : '0' }}>
        <Content style={{ margin: '20px 50px' }}>
          <blockquote data-layer='alert'>ACCESS DENIED</blockquote>
        </Content>
      </Arwes>
    )
  }

  componentDidMount() {
    const getUserId = this.props.match.params.userId
    console.log('%c getUserId', 'background: red', getUserId)
  }

  render() {
    const {user} =this.props
    if (!this.isAuthenticated) {
      return this.notAuthorized()
    }

    console.log('%c user', 'background: red', user)
    return (
      <div className='container'>

        asdfasdfasdf


      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }

}

export default connect(mapState)(Profile)
