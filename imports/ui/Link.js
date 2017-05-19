import React, {Component} from 'react';
import { Accounts } from 'meteor/accounts-base';

import { Links } from '../api/links';
import LinksList from './LinksList';

class Link extends Component {
	
	onLogout(){
		Accounts.logout();
	}

	onSubmit(e){
		const url = this.refs.url.value.trim();
		e.preventDefault();
		if(url) {
			Links.insert({url});
			this.refs.url.value = '';
		}
	}

	render() {
		return (
			<div>
				<h1>Your Links</h1>
				<button onClick={this.onLogout.bind(this)}>Logout</button>
				<LinksList />
				<p>Add Link</p>
				<form onSubmit={this.onSubmit.bind(this)}>
					<input type='text' ref='url' placeholder='URL'/>
					<button>Add Link</button>
				</form>
			</div>
		);
	}
	
}

export default Link;