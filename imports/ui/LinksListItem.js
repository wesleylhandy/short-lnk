import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends Component {

	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);

		clipboard.on('success', () => {
			alert('It worked!');
		}).on('error', () => {
			alert('Unable to copy. Please manually copy the link.');
		})
	}

	componentWillUnMount() {
		this.clipboard.destroy();
	}

	render() {
		return (
			<div>
				<h1>{this.props.url}</h1>
				<p>{this.props.shortUrl}</p>
				<button ref='copy' data-clipboard-text={this.props.shortUrl}>Copy</button>
			</div>
		);
	}

} 

LinksListItem.propTypes = {
	shortUrl: PropTypes.string.isRequired,
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired
}