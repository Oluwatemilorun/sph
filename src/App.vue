<template>
	<v-app>
		<router-view :showSnackbar="showSnackbar" />

		<v-snackbar
			v-model="snackbar"
			:color="snackbarColor"
		>
			{{snackbarText}}
			<v-btn flat color="accent" @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
export default {
	data () {
		return {
			snackbar: false,
			snackbarText: null,
			snackbarColor: 'green'
		}
	},
	methods: {
		showSnackbar(type, text) {
			this.snackbarText = text || 'Processing...'
			this.snackbarColor = type == 'error' ? 'error' : type == 'success' ? 'success' : 'blue-grey darken-3'
			this.snackbar = true;
		},
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