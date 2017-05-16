import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Signup from './../imports/ui/Signup';
import Link from './../imports/ui/Link';
import NotFound from './../imports/ui/NotFound';
import Login from './../imports/ui/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Login}/>
		<Route path='/signup' component={Signup}/>
		<Route path='/links' component={Link}/>
		<Route path='*' component={NotFound}/>
	</Router>
);

Tracker.autorun(()=>{
	const isAuthenticated = !!Meteor.userId();
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);

	if(isAuthenticated && isUnauthenticatedPage) {
		browserHistory.push('/links');
	} else if (!isAuthenticated && isAuthenticatedPage) {
		browserHistory.push('/');
	}
});

Meteor.startup(()=> {
	ReactDOM.render(routes, document.getElementById('app'));
});