import React, { Component } from "react"
import { connect } from "react-redux"
import { getUsers } from "./redux/reducers"
import { Arwes, Blockquote, Button, Image } from "arwes"
import Icon from "@mdi/react"
import { mdiChemicalWeapon } from "@mdi/js"
const ASSETS = `${process.env.PUBLIC_URL}/assets`

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { user } = this.props
    console.log("%c user", "background: red", user)

    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px",
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          {user.loadedUsers.length &&
            user.loadedUsers.map(user => {
              console.log('%c user', 'background: blue', user)
              return (
                <div>
                  <div style={{ width: '200px' }}>
                    <Blockquote data-layer="success">
                      <div
                        style={{ margin: "0 auto", padding: 20, maxWidth: 130 }}
                      >
                        <Image animate resources={`${ASSETS}/avatarm.png`} />
                        {user.name}
                      </div>
                      <Button
                        animate
                        layer="success"
                        onClick={() =>
                          console.log('bo')
                        }
                      >
                        <Icon
                          path={mdiChemicalWeapon}
                          size={0.5}
                          color="green"
                          spin
                        />{" "}
                        View Profile
                      </Button>
                    </Blockquote>
                  </div>
                </div>
              )
            })}
        </div>
      </Arwes>
    )
  }
}

const mapState = state => {
  return { user: state.user }
}

export default connect(
  mapState,
  { getUsers }
)(Users)
