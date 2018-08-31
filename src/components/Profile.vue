<template>
	<v-fade-transition>
		<v-container fluid fill-height class="pa-0">
			<v-toolbar color="transparent" flat app>
				<v-toolbar-title>
					<img src="@/assets/logo.png" height="50" alt="Logo">
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn color="primary">log out</v-btn>
			</v-toolbar>
			<div class="pg-bg--wrapper">
				<img class="pg-bg" src="@/assets/pg-bg.png">
			</div>
			<v-layout justify-center align-center>
				<v-flex xs10 sm8 md5>
					<v-card height="80vh" class="pa-3" style="overflow-y: scroll">		
						<v-layout justify-center>
							<v-avatar
								size="250"
								color="grey lighten-4"
								tile
								class="my-3"
							>
								<img v-if="user.profilePicture" :src="user.profilePicture" alt="">
								<v-icon v-else size="100">mdi-account</v-icon>
							</v-avatar>
						</v-layout>

						<!-- account -->
						<div class="section-divider column align-content-center my-3">
							<v-divider light></v-divider>
							<span class="white pr-3 caption grey--text">ACCOUNT</span>
						</div>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">E-mail</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.email}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Phone</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.phone}}</div>
							</v-flex>
						</v-layout>

						<!-- personal info -->
						<div class="section-divider column align-content-center my-3">
							<v-tooltip left>
								<v-btn slot="activator" small icon to="/u/edit/personal"><v-icon small>mdi-pencil</v-icon></v-btn>
								<span>Edit info</span>
							</v-tooltip>
							<v-divider light></v-divider>
							<span class="white pr-3 caption grey--text">PERSONAL INFO</span>
						</div>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Name</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.name.first}} {{user.name.middle}} {{user.name.last}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Home Address</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.address}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Gender</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.gender}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Date of Birth</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.dob}}</div>
							</v-flex>
						</v-layout>

						<!-- school info -->
						<div class="section-divider column align-content-center my-3">
							<v-tooltip left>
								<v-btn slot="activator" small icon to="/u/edit/school"><v-icon small>mdi-pencil</v-icon></v-btn>
								<span>Edit info</span>
							</v-tooltip>
							<v-divider light></v-divider>
							<span class="white pr-3 caption grey--text">SCHOOL INFO</span>
						</div>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">University / Institution</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.institution}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">School / Faculty</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.faculty}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Department / Course</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.department}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Matric / Reg no.</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.matric_no}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Level / Year</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.level}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Clinic / Hospital name</div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.clinic}}</div>
							</v-flex>
						</v-layout>
						<v-layout align-center row class="my-2">
							<v-flex xs4 sm3 md4>
								<div class="body-1 font-weight-bold">Clinic No. / Patient ID </div>
							</v-flex>
							<v-flex xs8>
								<div class="secondary--text">{{user.clinic}}</div>
							</v-flex>
						</v-layout>


						<!-- medical info -->
						<div class="section-divider column align-content-center my-3">
							<v-tooltip left>
								<v-btn slot="activator" small icon><v-icon small>mdi-pencil</v-icon></v-btn>
								<span>Edit info</span>
							</v-tooltip>
							<v-divider light></v-divider>
							<span class="white pr-3 caption grey--text">MEDICAL INFO</span>
						</div>

					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</v-fade-transition>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/storage';
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
				next(vm => {
					firebase.firestore().collection('user').doc(user.uid).get()
						.then(doc => {
							if (!doc.exists) return vm.$router.replace('/register');

							let userdoc = doc.data();
							vm.user = { ...user, ...userdoc }
							console.log(vm.user);
						})
						.catch(err => {
							console.log(error);
							vm.showSnackbar('error', 'Error getting data. Check your internet cables');
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

.section-divider {
	height: 48px;
	display: flex;
	align-items: center;
    flex-direction: row-reverse;
}
</style>
