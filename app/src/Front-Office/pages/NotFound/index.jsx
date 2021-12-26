import React from 'react';

import Header from '../../components/Header';

import bgImage from '../../assets/images/header/cover-4.webp';

function NotFound() {
	return (
		<div>
			<Header title="Error" titleWord="404!" subTitle="The hotels still under construction!" bgImage={bgImage} searchBar={false} button={false} />
		</div>
	);
}

export default NotFound;
