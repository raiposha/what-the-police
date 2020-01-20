import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import * as firebase from "firebase";
// import firebase from "firebase/app";

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: "AIzaSyAxfxTSuYpxSbonaIIFE0HmAS7XiDOiIxA",
    libraries: "places"
  }
});
Vue.component("google-cluster", VueGoogleMaps.Cluster);

import vuetify from "./plugins/vuetify";

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
  vuetify,

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
