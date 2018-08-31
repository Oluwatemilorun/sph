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
	apiKey: "API_KEY",
	authDomain: "AUTH_DOMAIN",
	databaseURL: "DATABASE_URL",
	projectId: "PROJECT_ID",
	storageBucket: "STORAGE_BUCKET",
	messagingSenderId: "MESSAGING_SENDER_ID"
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
