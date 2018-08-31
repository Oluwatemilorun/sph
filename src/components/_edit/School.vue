<template>
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
				<v-flex xs12>
					<v-btn :loading="isLoading" color="primary" :disabled="!schoolForm" class="mx-auto" @click="save">
						save
					</v-btn>
				</v-flex>
			</v-layout>
		</v-form>
	</v-container>
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
			schoolForm: false,
			defaultRule: [
				v => !!v || 'Field is required'
			],
			isLoading: false
		}
	},
	methods: {
		save () {
			const db = firebase.firestore();

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
				clinic: this.clinic,
				clinicId: this.clinicId,
				currentStep: this.e1
			}, { merge: true })
				.then(() => {
					this.isLoading = false;
					this.showSnackbar('success', 'Saved successfuly');
					this.$router.replace('/u');
				})
				.catch(err => {
					this.isLoading = false;
					this.processError(error);
				});
		}
	}
}
</script>

<style>

</style>
