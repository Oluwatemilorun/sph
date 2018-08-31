<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>



<style>
.pg-bg--wrapper {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
.pg-bg--wrapper .pg-bg {
	height: 100vh;
	width: 100vw;
}
.progress-wrapper {
	position: absolute;
    left: 45%;
    top: 65%;
    z-index: 1;
}
</style>