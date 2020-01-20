<template>
  <v-dialog v-model="signupDialog" max-width="500">
    <v-btn flat accent slot="activator">
      <v-icon left dark>face</v-icon>
      Sign Up
    </v-btn>
    <v-card>
      <v-flex xs12 v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
      <v-flex class="text-xs-right" xs12>
        <v-btn fab outline error @click="signupDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-flex>
      <v-card-media contain src="/static/user.svg" height="150px">
      </v-card-media>
      <v-card-text>
        <v-container>
          <form @submit.prevent="onSignup">
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="mail"
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
                  prepend-icon="lock"
                  name="password"
                  label="Enter your password"
                  hint="At least 6 characters"
                  v-model="password"
                  type="password"
                  min="6"
                  require
                ></v-text-field>
                <!-- 
:append-icon="passVisible ? 'visibility' : 'visibility_off'"
:append-icon-cb="() => (passVisible = !passVisible)"
:type="passVisible ? 'password' : 'text'" 
-->
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  prepend-icon="lock"
                  name="confirmPassword"
                  label="Confirm Password"
                  v-model="confirmPassword"
                  :rules="[comparePasswords]"
                  :type="passVisible ? 'password' : 'text'"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6 offset-xs3>
                <v-btn
                  success
                  block
                  outline
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                >
                  Sign up
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
      confirmPassword: "",
      passVisible: true,
      signupDialog: false
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
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
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
      this.signupDialog = false;
    }
  }
};
</script>
