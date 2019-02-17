import React, { Component } from "react"
import Signup from "./Signup"
import { Arwes, Col, Header, Row } from "arwes"
import styled from "styled-components"
import { signUp } from "./redux/reducers"
import { connect } from "react-redux"

const Container = styled.div`
  margin-top: 100px;
`

class SignupContainer extends Component {
  handleSubmit = (values) => {
    this.props.signUp(values)
  }
  render() {
    return (
      <Arwes>
        <Container>
          <Row>
            <Col s={12} m={8} l={6} offset={["m2", "l3"]}>
              <Signup onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        </Container>
      </Arwes>
    )
  }
}

export default connect(
  null,
  { signUp }
)(SignupContainer)
