import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Arwes, Link as Lnk, Words, Row, Col, Frame as FrameC } from "arwes"
import styled from "styled-components"
const MarginTop = styled.div`
  margin-top: 100px;
`

class Home extends Component {
  render() {
    return (
      <Arwes>
        <MarginTop />
        <Row>
          <Col s={12} m={8} l={6} offset={["m2", "l3"]}>
            <FrameC animate level={2} corners={1} layer={"success"}>
              <h3 style={{ margin: 20 }}>
                <Words animate layer="success">
                  Cyberpunk Communications
                </Words>
              </h3>

              <div style={{ margin: 20 }}>
                <Link to={"/signUp"}>
                  <Lnk>SignUp</Lnk>
                </Link>
              </div>
              <div style={{ margin: 20 }}>
                <Link to={"/Login"}>
                  <Lnk>Login</Lnk>
                </Link>
              </div>
            </FrameC>
          </Col>
        </Row>
      </Arwes>
    )
  }
}

export default Home
