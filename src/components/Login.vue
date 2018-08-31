<template>
	<v-fade-transition>
		<v-container fluid fill-height class="pa-0">
			<v-toolbar color="transparent" flat app>
			<v-toolbar-title>
				<img src="@/assets/logo.png" height="50" alt="Logo">
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn color="primary" to="/register">register</v-btn>
			</v-toolbar>
			<div class="pg-bg--wrapper">
				<img class="pg-bg" src="@/assets/pg-bg.png">
			</div>
			<v-layout justify-center align-center>
				<v-flex xs10 sm8 md7>
					<v-card color="white" width="100%" height="auto" class="scrollable py-5">
						<h3 class="mb-4 font-weight-light text-xs-center headline">Login to Account</h3>
						<v-container class="pa-0">
							<v-form v-model="accountForm">
								<v-layout justify-center row wrap>
									<v-flex xs11 md8>
										<v-text-field
											v-model="email"
											name="email"
											label="Your Email"
											id="email"
											required
											:rules="emailRule"
										></v-text-field>
									</v-flex>
									<v-flex xs11 md8>
										<v-text-field
											v-model="password"
											name="password"
											label="Your password"
											id="password"
											type="password"
											required
											:rules="passwordRule"
										></v-text-field>
									</v-flex>
									<v-flex xs11 md8>										
										<v-btn :disabled="!accountForm" :loading="loading" color="primary mx-auto d-block" @click="processLogin">log in</v-btn>
									</v-flex>
								</v-layout>
							</v-form>
						</v-container>
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
	props: ['showSnackbar'],
	data () {
		return {
			email: '',
			emailRule: [
				v => !!v || 'E-mail is required',
				v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail is invalid'
			],
			password: '',
			passwordRule: [
				v => !!v || 'Please input a password',
				v => v.length >= 8 || 'Password must be more than 8 characters',
			],
			loading: false,
			accountForm: false
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
		processLogin () {
			this.loading = true;
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then((res) => {
					this.$router.replace('/u');
				})
				.catch((error) => {
					this.loading = false;
					this.processError(error);
				});
		}
	}
}
</script>

<style>

</style>
