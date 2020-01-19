import React from "react"
import { Route, Switch } from "react-router-dom"

import "./App.css"

import Header from "./components/header/header.component"
import HomePage from "./pages/home/home.page"
import ShopPage from "./pages/shop/shop.page"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.page"

import { auth, createUserProfileDocument } from "./firebase/firebase.utils"

class App extends React.Component {
  state = {
    currentUser: null
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({ currentUser: {
            id: snapshot.id,
            ...snapshot.data()
          }})
        })
      } else {
        this.setState({ currentUser: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App
