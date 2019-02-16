import React, { Component } from "react"
import { BrowserRouter, withRouter } from "react-router-dom"
import MainRouter from "./MainRouter"
import { connect, Provider } from "react-redux"
import { configureStore } from "./store/configureStore"
import { ThemeProvider } from "styled-components"

const store = configureStore()

const getTheme = () => {
  return {
    primary: "#a04ed9",
    header: {
      videoOpacity: "0.1"
    }
  }
}

const App = () => (
  <ThemeProvider theme={getTheme()}>
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)

const mapState = state => {
  return {
    placeholder: state
  }
}
export default withRouter(connect(mapState)(App))
