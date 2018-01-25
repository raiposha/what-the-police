import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    addPlace (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('places').once('value')      
        .then((data) => {
          const places = []
          const obj = data.val()
          for (let key in obj) {
            var nowDate = Math.round(new Date().getTime()/1000.0)
            var oldDate = obj[key].date
            var sinseAdd = nowDate - oldDate
            var removed = false
            if (sinseAdd > 86400) {
              // Если с момента создания прошло более 24 часов - удаляем метку //
              firebase.database().ref().child('places/' + key + '/').remove()
              removed = true
            } else {
              // Если не прошло 24 часа, то загружаем метку //
              removed = false             
            }
            if (!removed) {
              places.push({
                  id: key,
                  title: obj[key].title,
                  date: obj[key].date,
                  locationLat: obj[key].locationLat,
                  locationLng: obj[key].locationLng,
                  creatorId: obj[key].creatorId
                })
            }
          }
          commit('setLoadedMeetups', places)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
      // firebase.database().ref('places').once('value')      
      //   .then((data) => {
      //     const places = []
      //     const obj = data.val()
      //     for (let key in obj) {
      //         places.push({
      //           id: key,
      //           title: obj[key].title,
      //           date: obj[key].date,
      //           locationLat: obj[key].locationLat,
      //           locationLng: obj[key].locationLng,
      //           creatorId: obj[key].creatorId
      //         })
      //     }
      //     commit('setLoadedMeetups', places)
      //     commit('setLoading', false)
      //   })
      //   .catch(
      //     (error) => {
      //       console.log(error)
      //       commit('setLoading', false)
      //     }
      //   )    
    },
    addPlace ({commit, getters}, payload) {
      const place = {
        title: payload.title,
        date: payload.date,
        creatorId: getters.user.id,
        locationLat: payload.locationLat,
        locationLng: payload.locationLng
      }     
      // const location = {
      //   locationLat: payload.locationLat,
      //   locationLng: payload.locationLng
      // } 
      let imageUrl
      let key
      firebase.database().ref('places').push(place)
      // firebase.database().ref('locations').push(location)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('addPlace', {
            ...place,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.time) {
        updateObj.time = payload.time
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
