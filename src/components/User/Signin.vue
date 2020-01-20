<template>
  <v-dialog disebled v-model="signinDialog" max-width="500">
    <template #activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left dark>fas fa-lock-open</v-icon>
        Sign In
      </v-btn>
    </template>
    <v-card>
      <v-flex xs12 v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"> </app-alert>
      </v-flex>
      <v-flex class="d-flex justify-end" xs12>
        <v-btn fab outlined error @click="signinDialog = false">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-flex>
      <v-img contain src="@/assets/img/user.svg" height="150px"> </v-img>
      <v-card-text>
        <v-container>
          <form @submit.prevent="onSignin">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="fas fa-envelope"
                  name="email"
                  label="Mail"
                  v-model="email"
                  type="email"
                  require
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="fas fa-lock"
                  name="password"
                  label="Enter your password"
                  v-model="password"
                  type="password"
                  require
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 offset-xs3>
                <v-btn
                  success
                  block
                  outlined
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                >
                  Sign in
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      signinDialog: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
      this.signinDialog = false;
    }
  }
};
</script>
