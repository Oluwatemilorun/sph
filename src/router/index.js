import Vue from 'vue'
import Router from 'vue-router'

// import HelloWorld from '@/components/HelloWorld'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

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
	}
  ],
  mode: 'history'
});
