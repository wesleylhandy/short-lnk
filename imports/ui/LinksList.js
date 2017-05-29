import React, {Component} from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component {
	constructor(props){
		super(props);
		this.state = {
			links: []
		}
	}
	componentDidMount(){
		console.log("componentDidMount LinksList");
		this.linksTracker = Tracker.autorun(()=>{
			Meteor.subscribe('links');
			const links = Links.find({
				visible: Session.get('showVisible')
			}).fetch();
			this.setState({ links });
		})
	}

	componentWillUnmount(){
		console.log('componentWillUnmout LinksList');
		this.linksTracker.stop();
	}

	renderLinksListItems() {
		return this.state.links.map(link => {
			const shortUrl = Meteor.absoluteUrl(link._id);
			return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
		});
	}

	render() {
		return (
			<div>
				<p>Links List</p>
				<div>
					{this.renderLinksListItems()}
				</div>
			</div>
		);
	}
}