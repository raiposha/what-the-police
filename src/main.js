import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import * as firebase from "firebase";
// import firebase from "firebase/app";

import * as FontAwesomeIcon from "@fortawesome/vue-fontawesome";
Vue.component("font-awesome-icon", FontAwesomeIcon);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: "AIzaSyDdZQS9E0sA6Y-lgbbIdyB8FcA8T2cqAkE",
    libraries: "places"
  }
});
Vue.component("google-cluster", VueGoogleMaps.Cluster);

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
Vue.use(Vuetify, {
  theme: {
    primary: "#3f99ce",
    secondary: "#bdbdbd",
    accent: "#FF5252",
    error: "#D50000",
    info: "#42A5F5",
    success: "#81C784",
    warning: "#ffa000"
  }
});

// import "./importScripts.js";

// Components //

import AlertCmp from "./components/Shared/Alert.vue";
import SignIn from "./components/User/Signin.vue";
import SignUp from "./components/User/Signup.vue";
import AddPlace from "./components/Places/Addplace.vue";

Vue.component("app-alert", AlertCmp);
Vue.component("app-signin", SignIn);
Vue.component("app-signup", SignUp);
Vue.component("app-add-place", AddPlace);

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDbSgPNSAXoYgzpFqXru-biEU08mVw3xAc",
      authDomain: "policestationapp.firebaseapp.com",
      databaseURL: "https://policestationapp.firebaseio.com",
      projectId: "policestationapp",
      storageBucket: "policestationapp.appspot.com",
      messagingSenderId: "274818351565"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
        this.$store.dispatch("fetchUserData");
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
