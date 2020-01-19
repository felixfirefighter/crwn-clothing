import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyB2Sf8IBncOqWM1m59dQ4IuiCBxoxesiMo",
  authDomain: "crwn-db-82e00.firebaseapp.com",
  databaseURL: "https://crwn-db-82e00.firebaseio.com",
  projectId: "crwn-db-82e00",
  storageBucket: "crwn-db-82e00.appspot.com",
  messagingSenderId: "229517717796",
  appId: "1:229517717796:web:c9b4774a2c3a0b8513c3b1",
  measurementId: "G-685H8L9ZYQ"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
