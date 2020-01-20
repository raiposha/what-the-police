<template>
  <!-- <div>test</div> -->
  <v-app>
    test
    <!-- <router-view /> -->
  </v-app>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

html,
body,
#app {
  height: 100%;
}
body {
  margin: 0;
  font-family: "Montserrat", sans-serif;
}
.tip {
  padding: 12px;
  font-size: 16px;
  color: #aaa;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .md-icon {
    margin-top: 0;
    margin-bottom: 16px;
  }
}
</style>
