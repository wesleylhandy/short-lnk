import React, {Component} from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Links } from '../api/links';

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
			this.setState({links: Links.find({}).fetch()});
		})
	}

	componentWillUnmount(){
		console.log('componentWillUnmout LinksList');
		this.linksTracker.stop();
	}

	renderLinksListItems() {
		return this.state.links.map(link=><p key={link._id}>{link.url}</p>)
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