import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Arwes, Link as Lnk, Words, Row, Col, Frame as FrameC } from "arwes"
import styled from "styled-components"
import { connect } from "react-redux"
import { signIn } from "../components/user/redux/reducers"
import SignInInternal from "../components/user/SignInInternal"

const ASSETS = `${process.env.PUBLIC_URL}/assets`

const MarginTop = styled.div`
  margin-top: 50px;
`
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
`

class Home extends Component {
  state = {
    show: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 300)
  }
  handleSubmit = values => {
    this.props.signIn(values)
  }
  render() {
    return (
      <Arwes
        animate
        background={`${ASSETS}/image.png`}
        pattern={`${ASSETS}/window.png`}
      >
        <MarginTop />
        <Right>
          <FrameC
            show={this.state.show}
            animate
            level={2}
            corners={1}
            layer={"primary"}
          >
            <div style={{ height: "80vh" }}>
              <h3 style={{ margin: 20 }}>
                <Words animate layer="header">
                  Cyber Communications
                </Words>
              </h3>
              <SignInInternal onSubmit={this.handleSubmit} />

              <div style={{ margin: 20 }}>
                <Words layer="secondary">New User?</Words>
                <div>
                  <Link to={"/signUp"}>
                    <Lnk>SignUp</Lnk>
                  </Link>
                </div>
              </div>
            </div>
          </FrameC>
        </Right>
      </Arwes>
    )
  }
}

export default connect(
  null,
  { signIn }
)(Home)
