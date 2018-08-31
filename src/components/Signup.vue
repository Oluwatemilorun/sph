<template>
	<v-fade-transition>
		<v-container fluid fill-height class="pa-0">
			<v-toolbar color="transparent" flat app>
			<v-toolbar-title>
				<img src="@/assets/logo.png" height="50" alt="Logo">
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn color="primary" to="/login">log in</v-btn>
			</v-toolbar>
			<div class="pg-bg--wrapper">
				<img class="pg-bg" src="@/assets/pg-bg.png">
			</div>
			<v-layout justify-center align-center>
				<v-flex xs10 sm8 md7>
					<v-card color="white" width="100%" height="60vh" class="scrollable">
						<v-layout style="height: calc(100% - 50px)">
							<v-flex xs12>
								<v-stepper v-model="e1" class="elevation-0" @input="stepChange" style="height: 100%; overflow-y: auto;">
									<v-stepper-header class="dense flat pa-0 elevation-0" style="height: 45px">
										<v-stepper-step color="green lighten-3" class="pa-4" :complete="e1 > 1" step="1">Account</v-stepper-step>

										<v-divider></v-divider>

										<v-stepper-step color="green lighten-3" class="pa-4" :complete="e1 > 2" step="2">Personal Info</v-stepper-step>

										<v-divider></v-divider>

										<v-stepper-step color="green lighten-3" class="pa-4" :complete="e1 > 3" step="3">School Info</v-stepper-step>
										
										<v-divider></v-divider>

										<v-stepper-step color="green lighten-3" class="pa-4" :complete="e1 > 4" step="4">Medical Info</v-stepper-step>
										
										<v-divider></v-divider>

										<v-stepper-step color="green lighten-3" class="pa-4" step="5">Share</v-stepper-step>
									</v-stepper-header>

									<v-stepper-items>
										<v-stepper-content step="1">
											<h3 class="mb-4 font-weight-light text-xs-center headline">Create an Account</h3>
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
															<v-checkbox label="I have read and accept the terms and conditions" v-model="t_c" value="" required :rules="t_cRule"></v-checkbox>
														</v-flex>
													</v-layout>
												</v-form>
											</v-container>
										</v-stepper-content>

										<v-stepper-content step="2" class="pa-0">
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
															</v-layout>
														</v-form>
													</v-container>
												</v-flex>
											</v-layout>

										</v-stepper-content>

										<v-stepper-content step="3">
											<v-container grid-list-md fluid class="pa-0">
												<v-form v-model="schoolForm">
													<v-layout row wrap>
														<v-flex xs12>
															<v-autocomplete
																v-model="institution"
																:items="institutionItem"
																label="Institution / University"

																:rules="defaultRule"
																required
															></v-autocomplete>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="faculty"
																name="faculty"
																label="School / Faculty"
																id="faculty"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="department"
																name="department"
																label="Department / Course"
																id="department"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="matricNo"
																name="matric_no"
																label="Matric No. / Registration No."
																id="matric-no"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="level"
																name="level"
																label="Level / Year"
																id="level"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="clinic"
																name="clinic"
																label="School Hospital / Cinic Name"
																id="clinic"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
														<v-flex xs12 md6>
															<v-text-field
																v-model="clinicId"
																name="clinic_id"
																label="Clinic card no. / Patient ID"
																id="clinic-id"
																:rules="defaultRule"
																required
															></v-text-field>
														</v-flex>
													</v-layout>
												</v-form>
											</v-container>
										</v-stepper-content>

										<v-stepper-content step="4">
											<p class="font-weight-bold text-xs-center">Please fill this form with the guidance of a medical practitioner</p>
											<v-container grid-list-md fluid class="pa-0">
												<v-form v-model="medicalForm">
													<v-layout row wrap>
														<v-flex xs12 md6>
															<v-select
																:items="bloodgroupItem"
																v-model="bloodgroup"
																label="Blood group"
																:rules="defaultRule"
																required
															></v-select>
														</v-flex>
														<v-flex xs12 md6>
															<v-select
																:items="genotypeItem"
																v-model="genotype"
																label="Genotype"
																:rules="defaultRule"
																required
															></v-select>
														</v-flex>
													</v-layout>
												</v-form>
											</v-container>
										</v-stepper-content>

										<v-stepper-content step="5">
											<v-layout justify-center align-center fill-height column>
												<!-- <v-flex xs6> -->
													<v-icon size="150" class="">mdi-emoticon-excited</v-icon>
													<h3 class="font-weight-light display-1 text-xs-center">THANKS FOR REGISTERING</h3>
													<p>Please share with your friends and colleagues.</p>
													<v-flex xs12>
														<v-tooltip bottom>
															<v-btn slot="activator" icon :href="processShare('whatsapp')" target="_blank">
																<v-icon>mdi-whatsapp</v-icon>
															</v-btn>
															<span>Share on WhatsApp</span>
														</v-tooltip>
														<v-tooltip bottom>
															<v-btn slot="activator" icon :href="processShare('facebook')" target="_blank">
																<v-icon>mdi-facebook</v-icon>
															</v-btn>
															<span>Share on Facebook</span>
														</v-tooltip>
														<v-tooltip bottom>
															<v-btn slot="activator" icon :href="processShare('twitter')" target="_blank">
																<v-icon>mdi-twitter</v-icon>
															</v-btn>
															<span>Share on Twitter</span>
														</v-tooltip>
													</v-flex>

													<v-btn color="primary">view profile</v-btn>
												<!-- </v-flex> -->
											</v-layout>
										</v-stepper-content>
									</v-stepper-items>
								</v-stepper>
							</v-flex>
						</v-layout>

						<v-card-actions>
							<v-btn v-if="e1 > 1" icon @click.stop="e1 = e1 - 1">
								<v-icon>mdi-arrow-left</v-icon>
							</v-btn>
							<v-btn v-if="user.uid && e1 < 4" icon @click.stop="e1 = e1 + 1">
								<v-icon>mdi-arrow-right</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								v-if="nextBtn"
								color="primary"
								:loading="isLoading"
								@click.stop="processStep(e1)"
							>
								{{nextBtnText}}
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
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
	props: ['showSnackbar'],
	data () {
		return {
			e1: 0,
			userIsLive: false,
			user: {},
			nextBtn: true,
			nextBtnText: 'Next',
			isLoading: false,
			snackbar: false,
			snackbarText: '',
			accountForm: false,
			profileForm: false,
			schoolForm: false,
			medicalForm: false,
			isUploading: false,
			avatarSrc: '',
			profilePicture: null,
			stepIsValid: false,
			defaultRule: [
				v => !!v || 'Field is required'
			],
			fullname: '',
			nameRule: [
				v => !!v || 'Name is required',
			],
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
			t_c: false,
			t_cRule: [
				v => !!v || ''
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
			institutionItem: [
				'Federal University of Technology, Akure (FUTA)',
				'University of Ibadan, Ibadan (UI)',
				'Obafemi Awolowo University, Ile-ife (OAU)',
				'Univesity of Benin, Benin-city (UNIBEN)',
				'Ekiti State University (EKSU)',
				'University of Ilorin, Ilorin (UNILORIN)',
			],
			institution: '',
			faculty: '',
			department: '',
			matricNo: '',
			level: '',
			clinic: '',
			clinicId: '',
			bloodgroupItem: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O-', 'O+'],
			// [
			// 	O-     No A or B Marker
			// 	O+    No A or B Marker + Rhesus factor (One of the Two Most Common Types)
			// 	A-      A Marker Only
			// 	A+     A Marker but No B Marker + Rhesus factor (One of the Two Most Common Types)
			// 	B-      B Marker Only
			// 	B+     B Marker but No A maker + Rhesus factor
			// 	AB-    A and B Markers Only
			// 	AB+   All 3 Types of Markers: A, B and Rhesus factor
			// ]
			bloodgroup: '',
			genotypeItem: ['AA', 'AS', 'SS', 'AC'],
			genotype: ''
		}
	},
	methods: {
		stepChange () {
			if (this.e1 == 1) {
				this.nextBtnText = 'Create account'
			}
			else if (this.e1 >= 2 && this.e1 < 5) {
				this.nextBtn = true
				this.nextBtnText = 'Save and Continue'
			}
			else if (this.e1 == 4) {
				this.nextBtnText = 'Save'
			}
			else if (this.e1 >= 5) {
				this.nextBtn = false
			}
		},
		loadAvatar (e) {
			let reader = new FileReader();
			reader.onload = () => {
				this.avatarSrc = reader.result
			}
			reader.readAsDataURL(e.target.files[0]);
		},
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
		processShare (platform) {
			let url = '';
			switch (platform) {
				case 'whatsapp':
					url = 'whatsapp://send?text=';
					break;
				case 'twitter':
					url = 'https://twitter.com/intent/tweet?text='
					break;
				case 'facebook':
					url = 'https://www.facebook.com/sharer/sharer.php?u='
					return url + encodeURIComponent('http://spatialhealth.co');
					break;
				default:
					break;
			}

			let text = 'I just registered on Spatial Health. You should do the same. Visit http://spatialhealth.co now.';
			let encodedText = encodeURIComponent(text);

			return url + encodedText;
		},
		processStep (step) {
			step = parseInt(step);
			const db = firebase.firestore();
			switch (step) {
				case 1:
					if (!this.accountForm) {
						return this.showSnackbar('neutral', 'Make sure all inputs are not empty and valid');
					}
					this.isLoading = true;

					(async () => {
						try {
							let res = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
							let user = firebase.auth().currentUser;
							
							await user.sendEmailVerification();
							
							this.isLoading = false;
							this.showSnackbar('success', 'Account created. Please verify your email address.')
							this.e1 = 2;

						} catch (error) {
							this.isLoading = false;
							this.processError(error);
						}
					})();

					break;

				case 2:
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
								}, { merge: true });

								this.isLoading = false;
								this.showSnackbar('success', 'Saved successfuly');
								this.e1 = 3;
							}
							else {
								this.isLoading = false;
							}

						} catch (error) {
							this.isLoading = false;
							this.processError(error);
						}
					})();

					break;

				case 3:
					if (!this.schoolForm) {
						return this.showSnackbar('neutral', 'Make sure all inputs are not empty and valid');
					}
					this.isLoading = true;

					db.collection('user').doc(this.user.uid).set({
						institution: this.institution,
						faculty: this.faculty,
						department: this.department,
						level: this.level,
						matric_no: this.matricNo,
						currentStep: this.e1
					}, { merge: true })
						.then(() => {
							this.isLoading = false;
							this.showSnackbar('success', 'Saved successfuly');
							this.e1 = 4;
						})
						.catch(err => {
							this.isLoading = false;
							this.processError(error);
						});

					break;

				case 4:
					if(!this.medicalForm) {
						return this.showSnackbar('neutral', 'Make sure all inputs are not empty and valid');
					}
					this.isLoading = true;

					db.collection('user').doc(this.user.uid).set({
						bloodgroup: this.bloodgroup,
						genotype: this.genotype,
						currentStep: this.e1
					}, { merge: true })
						.then(() => {
							this.isLoading = false;
							this.showSnackbar('success', 'Saved successfuly');
							this.e1 = 5;
						})
						.catch(err => {
							this.isLoading = false;
							this.processError(error);
						});

					break;
				case 5:

			
				default:
					break;
			}
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
	},
	mounted () {
		// check for user
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.userIsLive = true;
				this.user = user;

				firebase.firestore().collection('user').doc(user.uid).get()
					.then(doc => {
						if (!doc.exists) return this.e1 = 2;

						this.e1 = doc.data().currentStep + 1;
					})
					.catch(err => {
						console.log(error);
						this.e1 = 2;
					});
			}
			else {
				this.userIsLive = false;
				this.user = {}
			}
		});
	}
}
</script>

