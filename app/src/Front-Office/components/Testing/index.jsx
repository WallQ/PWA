import React from 'react';

import Image1 from '../../assets/images/header/cover-1.jpg';
import Image2 from '../../assets/images/header/cover-2.jpg';
import Image3 from '../../assets/images/header/cover-3.jpg';
import Image4 from '../../assets/images/header/cover-4.jpg';

function Testing() {
	return (
		<>
			<div className="w-full h-full mx-auto container bg-red-400">
				<div className="flex flex-row gap-x-6 px-6">
					<div className="flex flex-col basis-1/4 px-4 py-4 bg-amber-400 ">
						<form className="flex flex-col gap-y-6">
							<div className="flex flex-col">
								<label htmlFor="search">Search...</label>
								<input type="search" name="search" id="search" placeholder="Search" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="dateStart">Date Start</label>
								<input type="date" name="dateStart" id="dateStart" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="dateEnd">Date End</label>
								<input type="date" name="dateEnd" id="dateEnd" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="guest">Guests</label>
								<select name="guest" id="guest" >
									<option value="adult">Adult</option>
									<option value="child">Child</option>
								</select>
							</div>
							<div className="flex flex-col">
								<button className="bg-blue-600 py-2 text-white font-semibold text-lg">Search</button>
							</div>
							<div className="flex flex-col">
								<iframe title="Hotel Map" src="https://www.google.com/maps/embed/v1/place?q=Porto&amp;key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8" />
							</div>
						</form>
					</div>
					<div className="flex flex-col basis-3/4 px-4 py-4 bg-teal-400">
						<div className="flex flex-row">							
							<h1 className="text-white font-bold text-lg">Title</h1>
						</div>
						<div className="flex flex-row">
							<div className="flex-col basis-1/4 ">
								<img src={Image1} alt="Test" loading="lazy" />
								<img src={Image2} alt="Test" loading="lazy" />
								<img src={Image3} alt="Test" loading="lazy" />
							</div>
							<div className="flex-col basis-3/4">
								<img src={Image4} alt="Test" loading="lazy" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-x-6 px-6 mt-6">
					<div className="flex flex-col basis-3/4 px-4 py-4 bg-green-400">
						<div className="flex flex-row">							
							<h1 className="text-white font-bold text-lg">Title</h1>
						</div>
						<div className="flex flex-row">
							<p>TEST</p>
						</div>
					</div>
					<div className="flex flex-col basis-1/4 px-4 py-4 bg-amber-400 ">
						<form className="flex flex-col gap-y-6">
							<div className="flex flex-col">
								<label htmlFor="search">Search...</label>
								<input type="search" name="search" id="search" placeholder="Search" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="dateStart">Date Start</label>
								<input type="date" name="dateStart" id="dateStart" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="dateEnd">Date End</label>
								<input type="date" name="dateEnd" id="dateEnd" />
							</div>
							<div className="flex flex-col">
								<label htmlFor="guest">Guests</label>
								<select name="guest" id="guest" >
									<option value="adult">Adult</option>
									<option value="child">Child</option>
								</select>
							</div>
							<div className="flex flex-col">
								<button className="bg-blue-600 py-2 text-white font-semibold text-lg">Search</button>
							</div>
							<div className="flex flex-col">
								<iframe title="Hotel Map" src="https://www.google.com/maps/embed/v1/place?q=Porto&amp;key=AIzaSyA2W8VuMFPLKxR88upABeDzZZkKnU7svV8" />
							</div>
						</form>
					</div>
				</div>
				<div className="flex flex-row gap-x-6 px-6 mt-6">
					<table>
						<tr>
							<th>Capacity</th>
							<th>Room Type</th>
							<th></th>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</table>
				</div>
			</div>
		</>
	);
}

export default Testing;
