import App from './components/App.vue'

import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.css'

Vue.config.productionTip = false
// import 'vue-googlemaps/dist/vue-googlemaps.css'

import * as firebase from 'firebase'
// import 'vue-material/dist/vue-material.css'

import router from './router/'
import store from './store'

import './plugins/'
import './style.css'

// Components //

import AlertCmp from './components/Shared/Alert.vue'
import SignIn from './components/User/Signin.vue'
import SignUp from './components/User/Signup.vue'
import AddPlace from './components/Places/Addplace.vue'



// import Googlemap from './components/Googlemap.vue'
// Vue.component('google-map', Googlemap)





Vue.component('app-alert', AlertCmp)
Vue.component('app-signin', SignIn)
Vue.component('app-signup', SignUp)
Vue.component('app-add-place', AddPlace)

Vue.use(Vuetify, { theme: {
  primary: '#3f99ce',
  secondary: '#bdbdbd',
  accent: '#FF5252',
  error: '#D50000',
  info: '#42A5F5',
  success: '#81C784',
  warning: '#ffa000'
}})

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	router,
	store,
	...App,
	created () {
    firebase.initializeApp({
    apiKey: "AIzaSyDbSgPNSAXoYgzpFqXru-biEU08mVw3xAc",
    authDomain: "policestationapp.firebaseapp.com",
    databaseURL: "https://policestationapp.firebaseio.com",
    projectId: "policestationapp",
    storageBucket: "policestationapp.appspot.com",
    messagingSenderId: "274818351565"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})