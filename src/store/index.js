import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import shared from "./shared";
import layout from "./layout/";
import places from "./places/";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    layout: layout,
    places: places
  }
});

export default store;
