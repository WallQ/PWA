import React from 'react';

import Header from '../../components/Header';
import ListHotel from '../../components/ListHotel';

import bgImage1 from '../../assets/images/header/cover-1.webp';
import bgImage2 from '../../assets/images/header/cover-2.webp';
import bgImage3 from '../../assets/images/header/cover-3.webp';

function Homepage() {
	return (
		<div>
			<Header title="Pwa" titleWord="Booking" subTitle="" bgImage={bgImage1} searchBar={true} button={true} />
			<ListHotel />
		</div>
	);
}

export default Homepage;
