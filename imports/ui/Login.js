import React, {Component} from 'react';
import { Link } from 'react-router';

class Login extends Component {
	render() {
		return (
			<div>
				<h1>Login to Short Link</h1>
				<Link to='/signup'>Need an account?</Link>
			</div>
		);
	}
}

export default Login;