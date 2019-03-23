import React, { Component } from "react"
import { connect } from "react-redux"
import { getUsers } from "./redux/reducers"
import { Arwes, Blockquote, Button, Image } from "arwes"
import Icon from "@mdi/react"
import { mdiChemicalWeapon } from "@mdi/js"
import get from "lodash.get"

const ASSETS = `${process.env.PUBLIC_URL}/assets`

const isProduction = process.env.NODE_ENV === "production"
const envURL =
  process.env.REACT_APP_API_URL || "https://cybersocial.herokuapp.com"
const PUBLIC_URL = isProduction ? envURL : "http://localhost:8080"

class Users extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  renderImage = user => {
    const getUserId = get(user, "_id", "000")
    const photoUrl = `${PUBLIC_URL}/user/photo/${getUserId}?${new Date().getTime()}`
    const photoFallBack = `${ASSETS}/avatarm.png`
    {
      /*<Image animate resources={`${ASSETS}/avatarm.png`} />*/
    }
    return (
      <div style={{ margin: "0 auto", padding: 20, maxWidth: 130 }}>
        <img
          style={{ maxWidth: "80px" }}
          animate
          src={photoUrl}
          onError={e => {
            if (e.target.src !== photoFallBack) {
              e.target.src = photoFallBack
            }
          }}
        />
      </div>
    )
  }

  render() {
    const { user } = this.props
    return (
      <Arwes>
        <div
          style={{
            margin: "100px",
            marginLeft: this.props.isExpanded ? "250px" : "100px",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {user.loadedUsers.length &&
            user.loadedUsers.map(user => {
              return (
                <div>
                  <div style={{ width: "200px" }}>
                    <Blockquote data-layer="success">
                      <div
                        style={{ margin: "0 auto", padding: 20, maxWidth: 130 }}
                      >
                        {this.renderImage(user)}
                        {/*<Image animate resources={`${ASSETS}/avatarm.png`} />*/}
                        {user.name}
                      </div>
                      <Button
                        animate
                        layer="success"
                        onClick={() =>
                          this.props.history.push(`user/${user._id}`)
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
