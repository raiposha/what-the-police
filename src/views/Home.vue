<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer fixed v-model="sideNav" temporary>
      <v-list>
        <v-list-item v-if="!userIsAuthenticated"><app-signup /></v-list-item>
        <v-list-item v-if="!userIsAuthenticated"><app-signin /></v-list-item>
        <v-list-item v-if="userIsAuthenticated">
          <app-add-place
            v-if="userIsAuthenticated"
            :location="searchLocation"
          ></app-add-place>
        </v-list-item>
        <v-list-item>
          <v-btn text :disabled="!userPosition" @click="setUserPosition">
            <v-icon left dark>fas fa-location-arrow</v-icon>
            My position
          </v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn text to="/about">
            <v-icon :icon="['far', 'hand-peace']" size="2x" pull="left" />
            About us
          </v-btn>
        </v-list-item>

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

      <v-toolbar-items class="hidden-sm-and-down">
        <app-add-place
          v-if="userIsAuthenticated"
          :location="searchLocation"
        ></app-add-place>
        <app-signup v-if="!userIsAuthenticated"></app-signup>
        <app-signin v-if="!userIsAuthenticated"></app-signin>

        <v-btn text :disabled="!userPosition" @click="setUserPosition">
          <v-icon dark>fas fa-location-arrow</v-icon>
        </v-btn>

        <v-btn text to="/about">
          <v-icon>far fa-hand-peace</v-icon>
          About us
        </v-btn>

        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- <gmap-map
      @center_changed="updateCenter"
      @click="onClick"
      :center.sync="center"
      :zoom="15"
      style="flex: 100% 1 1"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        {{ infoContent }}
      </gmap-info-window>

      <gmap-marker
        v-if="searchLocation"
        title="Searched location"
        :position="searchLocation"
        :icon="dafaultMarkerImage"
      >
      </gmap-marker>

      <gmap-marker
        v-if="userPosition"
        title="Searched location"
        :position="userPosition"
        :icon="mySelfImage"
      >
      </gmap-marker>

      <google-cluster>
        <gmap-marker
          :key="m.id"
          :icon="markerImage"
          v-for="m in places"
          :position="{ lat: m.locationLat, lng: m.locationLng }"
          :clickable="true"
          @click="toggleInfoWindow(m, m.id)"
        >
        </gmap-marker>
      </google-cluster>
    </gmap-map> -->
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      center: {
        lat: 55.75,
        lng: 37.61
      },
      userPosition: null,
      zoom: 15,
      sideNav: false,
      searchLocation: null,
      markerImage: {
        url: "@/assets/img/policeMarker.svg",
        scaledSize: {
          width: 40,
          height: 40,
          f: "px",
          b: "px"
        }
      },
      dafaultMarkerImage: {
        url: "@/assets/img/defaultMarker.svg",
        scaledSize: {
          width: 40,
          height: 40,
          f: "px",
          b: "px"
        }
      },
      mySelfImage: {
        url: "@/assets/img/person.svg",
        scaledSize: {
          width: 23,
          height: 37,
          f: "px",
          b: "px"
        }
      },
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    centerOnUser(center) {
      this.center = {
        lat: center.latitude,
        lng: center.longitude
      };
    },
    setUserPosition() {
      this.center = this.userPosition;
      return (this.sideNav = false);
    },
    updateCenter(center) {
      this.center = {
        lat: center.lat(),
        lng: center.lng()
      };
    },
    onLogout() {
      this.$store.dispatch("logout");
    },
    onClick({ latLng }) {
      this.searchLocation = latLng;
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = {
        lat: marker.locationLat,
        lng: marker.locationLng
      };
      this.infoContent = marker.title;
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    places() {
      return this.$store.getters.loadedMeetups;
    }
  },
  mounted: function() {
    if (navigator.geolocation) {
      var self = this;
      navigator.geolocation.getCurrentPosition(function(center) {
        self.center = {
          lat: center.coords.latitude,
          lng: center.coords.longitude
        };
        self.userPosition = {
          lat: center.coords.latitude,
          lng: center.coords.longitude
        };
      });
    }
  }
};
</script>
