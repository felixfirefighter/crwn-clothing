import React from "react"
import { Route, Switch } from "react-router-dom"

import "./App.css"

import Header from "./components/header/header.component"
import HomePage from "./pages/home/home.page"
import ShopPage from "./pages/shop/shop.page"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.page"

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
}

export default App
