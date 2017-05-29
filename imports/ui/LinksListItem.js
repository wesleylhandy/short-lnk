import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			justCopied: false
		}
	}

	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);

		this.clipboard.on('success', () => {
			this.setState({justCopied: true});
		}).on('error', () => {
			alert('Unable to copy. Please manually copy the link.');
		})
	}

	componentDidUpdate() {
		if(this.state.justCopied) {
			setTimeout(()=> this.setState({justCopied: false}), 1000);
		}
	}

	componentWillUnMount() {
		this.clipboard.destroy();
	}
	renderStats(){
		const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
		let visitedMessage = null;
		if (typeof this.props.lastVisitedAt === 'number') {
			visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
		}
		return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
	}

	render() {
		return (
			<div>
				<p>{this.props.url}</p>
				<p>{this.props.shortUrl}</p>
				<p>{this.props.visible.toString()}</p>
				{this.renderStats()}
				<a href={this.props.shortUrl} target='_blank'>Visit</a>
				<button ref='copy' data-clipboard-text={this.props.shortUrl}>
					{this.state.justCopied ? 'Copied' : 'Copy'}
				</button>
				<button onClick={()=> { 
					Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
				}}>
					{this.props.visible ? 'Hide' : 'Unhide'}
					</button>
			</div>
		);
	}

} 

LinksListItem.propTypes = {
	shortUrl: PropTypes.string.isRequired,
	_id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	visitedCount: PropTypes.number.isRequired,
	lastVisitedAt: PropTypes.number
}