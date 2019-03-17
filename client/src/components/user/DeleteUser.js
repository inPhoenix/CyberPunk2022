import React, { Component } from "react"
import { Arwes, Button } from "arwes"
import Icon from "./Profile"
import { mdiChemicalWeapon, mdiRobot } from "@mdi/js"
import styled from "styled-components"

const ButtonBar = styled.div`
  display: flex;
  justify-content: space-evenly;
`

class DeleteUser extends Component {
  render() {
    return (
      <Arwes>
        <ButtonBar>
          <Button
            animate
            layer="alert"
            onClick={() => console.log(this.props.history.push("/homepage"))}
          >
            <Icon path={mdiChemicalWeapon} size={0.5} color="red" spin /> Delete
            Profile
          </Button>
        </ButtonBar>
      </Arwes>
    )
  }
}

export default DeleteUser
