import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Edit from '@/components/Edit'

// edit
import Personal from '@/components/_edit/Personal';
import School from '@/components/_edit/School';

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		name: 'index',
		//   component: HelloWorld
		redirect: { path: '/register' }
	},
	{
		path: '/register',
		component: Signup
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/u',
		component: Profile
	},
	{
		path: '/u/edit',
		component: Edit,
		children: [
			{
				path: '',
				redirect: 'personal'
			},
			{
				path: 'personal',
				component: Personal
			},
			{
				path: 'school',
				component: School
			}
		]
	}
  ],
  mode: 'history'
});
