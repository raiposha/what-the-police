<template>
  <v-dialog v-model="signupDialog" max-width="500">
    <template #activator="{ on }">
      <v-btn text accent v-on="on">
        <v-icon left dark>fas fa-user</v-icon>
        Sign Up
      </v-btn>
    </template>
    <v-card>
      <v-flex xs12 v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
      <v-flex class="d-flex justify-end" xs12>
        <v-btn fab outlined error @click="signupDialog = false">
          <v-icon>fas fa-times</v-icon>
        </v-btn>
      </v-flex>
      <v-img contain src="@/assets/img/user.svg" height="150px"> </v-img>
      <v-card-text>
        <v-container>
          <form @submit.prevent="onSignup">
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
                  prepend-icon="fas fa-lock"
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
                  outlined
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
