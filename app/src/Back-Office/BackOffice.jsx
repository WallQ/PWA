import React,{useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import MainLayoutV2 from './layout/MainLayoutV2/MainLayoutV2';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Packs from './pages/packs/Packs';
import Rooms from './pages/rooms/Rooms';
import RoomTypeForm from './pages/roomtypes/RoomTypeForm';
import Roomtypes from './pages/roomtypes/RoomTypes';
import Books from './pages/books/Books';
import Hotels from './pages/hotels/Hotels';

//import Routes from './routes';

function BackOffice() {
	const [hotelID, setHotelID] = useState(null);

	return (
		<Routes>
			<Route path="login" element={<Login/>}/>
			<Route path="/" element={<MainLayoutV2 setHotelID ={setHotelID}/>}>
				<Route index element={<Dashboard />} />
				<Route path="roomtypes" element={<Roomtypes hotelID = {hotelID}/>} />
				<Route path="roomtypes/new" element={<RoomTypeForm hotelID = {hotelID}/>} />
				<Route path="roomtypes/:id" element={<RoomTypeForm hotelID = {hotelID}/>} />
				<Route path="packs/" element={<Packs hotelID = {hotelID}/>} />
				<Route path="rooms/" element={<Rooms hotelID = {hotelID}/>} />
				<Route path="books/" element={<Books hotelID = {hotelID}/>} />
				<Route path="hotels/" element={<Hotels hotelID = {hotelID}/>} />
				<Route path="*" element={<h1>No Subpage found</h1>} />
			</Route>
				
		</Routes>	
	);
}

export default BackOffice;
