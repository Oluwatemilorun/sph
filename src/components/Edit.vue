<template>
	<v-fade-transition>
		<v-container fluid fill-height class="pa-0">
			<v-toolbar color="transparent" flat app>
				<v-toolbar-title>
					<img src="@/assets/logo.png" height="50" alt="Logo">
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn color="primary" @click="logout">log out</v-btn>
				</v-toolbar>
			<div class="pg-bg--wrapper">
				<img class="pg-bg" src="@/assets/pg-bg.png">
			</div>
			<v-layout justify-center align-center>
				<v-flex xs10 sm8 md7>
					<v-card color="white" width="100%" height="70vh" class="pa-2" style="overflow-y: scroll">
						<router-view :showSnackbar="showSnackbar" :processError="processError" />
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-fade-transition>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';

export default {
	props: ['showSnackbar',],
	data () {
		return {

		}
	},
	methods: {
		processError (error) {
			console.log(error);
			if (error.code == "auth/network-request-failed") {
                this.showSnackbar('error', 'Network Error');
            }
            else if (error.code == "auth/email-already-in-use") {
                this.showSnackbar('error', 'Email already in use');
            }
            else if (error.code == "auth/wrong-password") {
                this.showSnackbar('error', "Invalid username or password");
            }
            else if (error.code == "auth/invalid-email") {
                this.showSnackbar('error', "Invalid username or password");
            }
            else if (error.code == "auth/user-not-found") {
                this.showSnackbar('error', "Invalid username or password");
            }
            else {
                this.showSnackbar('error', 'An Error occured');
            }
		},
		logout () {
			firebase.auth().signOut()
				.then(() => {
					this.$router.replace('/login');
				})
				.catch((error) => {
					this.processError(error);
				})
		}
	},
	beforeRouteEnter (to, from, next) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				next();
			}
			else {
				next('/register');
			}
		});
	},
	beforeRouteUpdate (to, from, next) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				next();
			}
			else {
				next('/register');
			}
		});
	}
}
</script>

<style>

</style>
