# SPH

> A simple vue + firebase auth + firestore + firebase storage, implementation for spatial health using the vuetify framework

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Firebase Setup
Navigate to `/src/main.js` and edit the configuration setup accordingly to suit your firebase project or you can create a new [firebase project](https://firebase.google.com) to get a configuration setup.

> /src/main.js
``` js
...
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
...

```

For detailed explanation on Vue.js, checkout the [documentation](https://vuejs.org)
For detailed explanation on Vue.js Router, check out the [guide](https://router.vuejs.org/guide)
For detailed explanation on Firebase, check out the [docs](https://firebase.google.com/docs/)
For detailed explanation on how webpack things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

