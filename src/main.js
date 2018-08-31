// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import 'firebase/firestore'

Vue.use(Vuetify, {
	iconfont: 'mdi',
	theme: {
		primary: "#81C784",
		secondary: "#66BB6A",
		accent: "#FF4081",
		error: "#D32F2F",
		warning: "#ffeb3b",
		info: "#7986CB",
		success: "#F5F5F5"
	}
})

Vue.config.productionTip = false

// Initialize Firebase
let config = {
	apiKey: "AIzaSyDw7xq7aA9pZdN0DRN6gW7vwjXYQPUYu-U",
	authDomain: "spatialhealth-9a8f7.firebaseapp.com",
	databaseURL: "https://spatialhealth-9a8f7.firebaseio.com",
	projectId: "spatialhealth-9a8f7",
	storageBucket: "spatialhealth-9a8f7.appspot.com",
	messagingSenderId: "513390501485"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {
	/* your settings... */ 
	timestampsInSnapshots: true 
};
firestore.settings(settings);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
