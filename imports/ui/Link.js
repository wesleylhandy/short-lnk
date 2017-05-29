import React from 'react';

import { Links } from '../api/links';
import LinksList from './LinksList';
import LinksListFilters from './LinksListFilters';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default () => {
	return (
		<div>
			<PrivateHeader title='Your Links'/>
			<LinksListFilters />
			<LinksList />
			<AddLink />
		</div>
	);
}