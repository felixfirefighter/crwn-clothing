import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { createStructuredSelector } from 'reselect'

import "./App.css"

import Header from "./components/header/header.component"
import CheckoutPage from './pages/checkout/checkout.page'
import HomePage from "./pages/home/home.page"
import ShopPage from "./pages/shop/shop.page"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.page"

import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions'

class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props
    checkUserSession()
  }

  render() {
    const { currentUser } = this.props

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={() => currentUser ? (<Redirect to="/" />) : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
