import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import VueMaterial from 'vue-material'
//import VueGoogleMaps from 'vue-googlemaps'

import * as VueGoogleMaps from 'vue2-google-maps'

// Font Awesome //
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

// Font Awesome Icons //
import faCopyright from '@fortawesome/fontawesome-free-regular/faCopyright'
import faHandPeace from '@fortawesome/fontawesome-free-regular/faHandPeace'
import faVk from '@fortawesome/fontawesome-free-brands/faVk'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'

// Font Awesome Library //
fontawesome.library.add(faCopyright)
fontawesome.library.add(faHandPeace)
fontawesome.library.add(faTwitter)
fontawesome.library.add(faVk)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueRouter)
Vue.use(Vuex)

//Vue.use(VueMaterial)
Vue.use(VueGoogleMaps, {
	load: {
		apiKey: 'AIzaSyDdZQS9E0sA6Y-lgbbIdyB8FcA8T2cqAkE',
		libraries: 'places'
	},
})

Vue.component('google-cluster', VueGoogleMaps.Cluster)