import React from 'react';

import Header from './Components/Header/';

import bgImage from '../../assets/images/header/cover-1.webp';
import bgImage2 from '../../assets/images/header/cover-2.webp';
import bgImage3 from '../../assets/images/header/cover-3.webp';

function Homepage() {
	return (
		<div>
			<Header title="Pwa Booking" bgImage={bgImage} />
			<Header title="Pwa Booking" bgImage={bgImage2} />
			<Header title="Pwa Booking" bgImage={bgImage3} />
		</div>
	);
}

export default Homepage;
