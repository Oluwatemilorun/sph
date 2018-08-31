<template>
	<v-layout fill-height row wrap justify-center align-center>
		<v-flex xs12 md5 style="position: relative">
			<v-layout fill-height justify-center align-center column>
				<h5 class="headline font-weight-light text-xs-center my-4">Profile Picture</h5>
				<label for="preview-avatar">
					<div v-if="isUploading" class="progress-wrapper">
						<v-progress-circular indeterminate color="secondary"></v-progress-circular>
					</div>
					<v-tooltip bottom>
						<v-avatar
							slot="activator"
							size="120"
							color="grey lighten-5"
							class="elevation-3"
						>
							<img v-if="avatarSrc && avatarSrc != ''" :src="avatarSrc" alt="avatar">
							<v-icon v-else size="90">mdi-account</v-icon>
						</v-avatar>
						<!-- <img id="category-cover-preview" slot="activator" src="@/assets/upload.png" alt="cover" style="width: 100%; height: 200px"> -->
						<span>upload a profile picture</span>
					</v-tooltip>
					<input type="file" name="cover" id="preview-avatar" accept="image/*" hidden @change="loadAvatar($event)">
				</label>
			</v-layout>
		</v-flex>
		<v-flex xs12 md7>
			<v-container grid-list-md fluid class="pa-0">
				<v-form v-model="profileForm">
					<v-layout row wrap>
						<v-flex xs12 md4>
							<v-text-field
								v-model="name.first"
								name="firstname"
								label="First name"
								id="first-name"
								:rules="defaultRule"
								required
							></v-text-field>
						</v-flex>
						<v-flex xs12 md4>
							<v-text-field
								v-model="name.middle"
								name="middlename"
								label="Middle name"
								id="middle-name"
								:rules="defaultRule"
								required
							></v-text-field>
						</v-flex>
						<v-flex xs12 md4>
							<v-text-field
								v-model="name.last"
								name="lastname"
								label="Last name"
								id="last-name"
								:rules="defaultRule"
								required
							></v-text-field>
						</v-flex>
						<v-flex xs12>
							<v-textarea
								v-model="address"
								name="address"
								label="Home address"
								id="address"
								:no-resize="true"
								rows="2"
								:rules="defaultRule"
								required
							></v-textarea>
						</v-flex>
						<v-flex xs12>
							<v-textarea
								v-model="lodge"
								name="lodhe"
								label="Hostel/Lodge address"
								id="lodge"
								:no-resize="true"
								rows="2"
								:rules="defaultRule"
								required
							></v-textarea>
						</v-flex>
						<v-flex xs12 md4>
							<v-text-field
								v-model="phone"
								name="phone"
								label="Phone no."
								id="phone"
								:rules="defaultRule"
								required
							></v-text-field>
						</v-flex>
						<v-flex xs12 md4>
							<v-select
								:items="genderItem"
								v-model="gender"
								label="Gender"
								:rules="defaultRule"
								required
							></v-select>
						</v-flex>
						<v-flex xs12 md4>
							<v-text-field
								v-model="dob"
								name="date"
								label="Date of Birth"
								id="date_property"
								@focus="dateDialog = true"
								:rules="defaultRule"
								required
							></v-text-field>
							<v-dialog
								v-model="dateDialog"
								max-width="300px"
								transition="dialog-transition"
							>
								<v-date-picker full-width header-color="secondary" v-model="dob"></v-date-picker>
							</v-dialog>
						</v-flex>
						<v-flex xs12>
							<v-btn :loading="isLoading" color="primary" :disabled="!profileForm" class="mx-auto" @click="save">
								save
							</v-btn>
						</v-flex>
					</v-layout>
				</v-form>
			</v-container>
		</v-flex>
		</v-layout>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

export default {
	props: ['showSnackbar', 'processError'],
	data () {
		return {
			profileForm: false,
			defaultRule: [
				v => !!v || 'Field is required'
			],
			fullname: '',
			nameRule: [
				v => !!v || 'Name is required',
			],
			dob: '',
			dateDialog: false,
			detailsIsValid: false,
			genderItem: ['Female', 'Male', 'Other'],
			gender: '',
			name: {
				first: '',
				middle: '',
				last: '',
			},
			address: '',
			phone: '',
			isUploading: false,
			avatarSrc: '',
			lodge: null,
			isLoading: false,
		}
	},
	methods: {
		loadAvatar (e) {
			let reader = new FileReader();
			reader.onload = () => {
				this.avatarSrc = reader.result
			}
			reader.readAsDataURL(e.target.files[0]);
		},
		save () {
			const db = firebase.firestore();
			
			if (!this.profileForm) {
				return this.showSnackbar('neutral', 'Make sure all inputs are not empty and valid');
			}
			this.isLoading = true;

			(async () => {
				try {
					let upload = await this.uploadAvatar();
					if (upload) {
						await db.collection('user').doc(this.user.uid).set({
							name: this.name,
							gender: this.gender,
							address: this.address,
							phone: this.phone,
							currentStep: this.e1,
							profilePicture: this.profilePicture,
							dob: this.dob,
							lodge: this.lodge
						}, { merge: true });

						this.isLoading = false;
						this.showSnackbar('success', 'Saved successfuly');
						this.$router.replace('/u');
					}
					else {
						this.isLoading = false;
					}

				} catch (error) {
					this.isLoading = false;
					this.processError(error);
				}
			})();

		},
		uploadAvatar () {
			return new Promise((resolve, reject) => {
				let file = document.getElementById('preview-avatar').files[0];

				if (file) {
					this.isUploading = true;
					let auth = firebase.auth();
					let storageRef = firebase.storage().ref();
					let metadata = {
						'contentType': file.type
					};
		
					storageRef.child('profile-pictures/' + file.name).put(file, metadata)
						.then(snapshot => {
							console.log('uploaded', snapshot.totalBytes, 'bytes.');
							console.log('file metadata', snapshot.metadata);
		
							snapshot.ref.getDownloadURL()
								.then(url => {
									this.profilePicture = url;
									this.uploadSuccess = true;
									this.isUploading = false;
									resolve(true);
								});
						})
						.catch(err => {
							console.log(err);
							this.isUploading = false;
							this.showSnackbar('error', 'Error occured while uploading profile picture');
							reject(false);
						});
				}
				else {
					resolve(true);
				}
			});
		}
	}
};
</script>

<style>
</style>
