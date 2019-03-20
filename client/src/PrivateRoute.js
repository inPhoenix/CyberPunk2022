import React, { Component } from "react"
import { isAuthenticatedPure } from "./components/user/redux/reducers"
import { Route } from "react-router-dom"
import { Arwes, Project } from "arwes"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth =
    isAuthenticatedPure() &&
    isAuthenticatedPure().payload &&
    isAuthenticatedPure().payload.token
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Component {...props} isExpanded={rest.isExpanded} />
        ) : (
          <div>
            <Arwes>
              <div style={{ margin: "150px" }}>
                <Project animate header={"Edit Profile"}>
                  Access Denied
                </Project>
              </div>
            </Arwes>
          </div>
        )
      }
    />
  )
}

export default PrivateRoute
