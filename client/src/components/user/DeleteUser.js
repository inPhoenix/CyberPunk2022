import React, { Component } from "react"
import { Arwes, Button, Header, Frame as FrameC } from "arwes"
import Icon from "@mdi/react"
import { mdiChemicalWeapon } from "@mdi/js"
import styled from "styled-components"
import { connect } from "react-redux"
import get from "lodash.get"
import { deleteUser, signOut } from "./redux/reducers"
import { Redirect } from "react-router-dom"

const GUEST_ID = '5c92b9bf934bf41012beb524'

const ButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 50px;
  padding-bottom: 30px;
`

class DeleteUser extends Component {
  state = {
    show: false,
    confirm: false,
    warning: false
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true
      })
    }, 1000)
  }

  handleDelete = () => {
    const {user} = this.props
    const getId = get(user, "loadedUser._id")
    if(getId !== GUEST_ID) {
    this.props.deleteUser(getId)
    this.props.signOut()


    } else {
      this.setState({
        confirm: false,
        warning: true,
      })
    }

  }

  render() {
    const { isExpanded, user } = this.props
    if(user.deletedUser) {
      return <Redirect to="/signIn" />
    }
    const getName = get(user, "loadedUser.name")
    return (
      <Arwes>
        <div style={{ padding: 20 }}>
          <Header animate>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Delete Profile
            </h1>
          </Header>
        </div>
        <div
          style={{
            marginLeft: isExpanded ? "250px" : "100px",
            marginRight: "40px"
          }}
        >
          <FrameC
            show={this.state.show}
            animate={true}
            level={3}
            corners={4}
            layer="success"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "32px"
              }}
            >
              {getName}
            </div>
          </FrameC>
        </div>
        <ButtonBar>
          <Button
            animate
            layer="alert"
            onClick={() => this.setState({ confirm: true })}
          >
            <Icon path={mdiChemicalWeapon} size={0.5} color="red" spin /> Delete
            Profile
          </Button>
        </ButtonBar>
        {this.state.warning && (
          <div
            style={{
              marginLeft: isExpanded ? "250px" : "100px",
              marginRight: "40px"
            }}
          >
          <FrameC
            animate={true}
            level={3}
            corners={4}
            layer="alert"
          >
            <div
              style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}
            >You cannot delete our Guest User!</div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '30px' }}>
            <Button
              animate
              layer="success"
              onClick={() => this.setState({ warning: false })}
            >
              <Icon path={mdiChemicalWeapon} size={0.5} color="green" spin />{" "}
              Dismiss
            </Button>
            </div>

          </FrameC>
          </div>

        )}
        {this.state.confirm && (
          <div
            style={{
              marginLeft: isExpanded ? "250px" : "100px",
              marginRight: "40px",
              marginTop: "40px",
            }}
          >
            <FrameC
              show={this.state.show}
              animate={true}
              level={3}
              corners={4}
              layer="alert"
            >
              <div
                style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}
              >Are you sure?</div>
              <ButtonBar>
              <Button
                animate
                layer="alert"
                onClick={this.handleDelete}
              >
                <Icon path={mdiChemicalWeapon} size={0.5} color="red" spin />{" "}
                Delete
              </Button>
              <Button
                animate
                layer="success"
                onClick={() => this.setState({ confirm: false })}
              >
                <Icon path={mdiChemicalWeapon} size={0.5} color="green" spin />{" "}
                Cancel
              </Button>
              </ButtonBar>
            </FrameC>
          </div>
        )}
      </Arwes>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapState,
  { deleteUser, signOut }
)(DeleteUser)
