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
				<v-avatar
					size="100"
					color="grey lighten-4"
				>
					<img src="" alt="">
				</v-avatar>
			</v-layout>
		</v-container>
	</v-fade-transition>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

export default {
	data () {
		return  {
			user: {}
		}
	},
	beforeRouteEnter (to, from, next) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				nex(vm => {
					vm.user = user;

					firebase.firestore().collection('user').doc(user.uid).get()
						.then(doc => {
							if (!doc.exists) return this.e1 = 2;

							this.e1 = doc.data().currentStep + 1;
						})
						.catch(err => {
							console.log(error);
							this.e1 = 2;
						});
				});
			}
			else {
				next(false);
			}
		});
	}
}
</script>

<style>

</style>
