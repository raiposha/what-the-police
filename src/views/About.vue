<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer fixed v-model="sideNav" temporary>
      <v-list>
        <v-list-item v-if="!userIsAuthenticated"><app-signup /></v-list-item>
        <v-list-item v-if="!userIsAuthenticated"><app-signin /></v-list-item>

        <v-list-item>
          <v-btn text v-if="userIsAuthenticated" @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>
            Logout
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-toolbar dark class="primary" :height="50">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="
			cursor: pointer; 
			text-transform: uppercase;"
          >Where is the police ?
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <app-signup v-if="!userIsAuthenticated"></app-signup>
        <app-signin v-if="!userIsAuthenticated"></app-signin>

        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="http://www.publicdomainpictures.net/pictures/10000/velka/sunset-over-mountains-11284647453ZOV5.jpg"
            height="300px"
            xs12
          >
            <v-layout column class="media">
              <v-spacer></v-spacer>
              <v-card-title class="white--text pt-5">
                <v-flex xs8 offset-xs2>
                  <h1
                    class="text-xs-center"
                    style="
									text-transform: uppercase;
									font-weight: 300;
									font-size: 60px;"
                  >
                    About us
                  </h1>
                </v-flex>
              </v-card-title>
            </v-layout>
          </v-img>
          <v-card-text>
            <v-flex xs8 offset-xs2>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
              dignissimos fugit officia cupiditate recusandae voluptates
              expedita temporibus cumque, vel error eos qui a, iure explicabo
              minima dolor at vitae quos, sapiente repudiandae architecto nobis
              ratione? Aliquam amet qui commodi culpa laboriosam ipsa. Porro
              optio animi itaque quibusdam nemo officia quod!
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-flex xs8 offset-xs2>
              <v-btn fab dark color="primary">
                <v-icon>fab fa-vk</v-icon>
              </v-btn>
              <v-btn fab dark color="primary">
                <v-icon>fab fa-twitter</v-icon>
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-footer class="pa-3">
      <v-layout row>
        <v-btn text color="primary">
          <v-icon left dark>fas fa-envelope</v-icon>
          raipon@yandex.ru
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="primary">
          <v-icon>far fa-copyright</v-icon>
          Raipon {{ new Date().getFullYear() }}
        </v-btn>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  }
};
</script>
