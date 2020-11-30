import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .mount("#app");

// import { ref } from 'vue'
// import firebase from 'firebase'

// firebase.initializeApp(
//   {
//     apiKey: "AIzaSyACeycVaIpwdsFacsjZlKwJNBZqXVJDQ4g",
    // authDomain: "catan2-c56f2.firebaseapp.com",
    // databaseURL: "https://catan2-c56f2.firebaseio.com",
    // projectId: "catan2-c56f2",
    // storageBucket: "catan2-c56f2.appspot.com",
    // messagingSenderId: "720801087325",
    // appId: "1:720801087325:web:958b5a8627cdd9446632b4"
//   }
// )

// export const AuthStore = ref({
//   currentUser: null
// })
// export const auth = firebase.auth()
// export const db = firebase.firestore()

// auth.onAuthStateChanged(user => {
//   AuthStore.value.currentUser = user
// })
