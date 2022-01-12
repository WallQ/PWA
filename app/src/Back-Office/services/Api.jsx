const API_URL = '/auth';

export const getClients = () => {
	return new Promise((resolve, reject) => {
		const url = '/user'

		fetch(url,{
			headers: {'Accept': 'application/json'}
		})
		.then((response) => response.json())
		.then((response) => {
			const {status, data} = response;
			
			if(data){
				resolve(data)
			}  else{
				reject("Cant Find Users")
			}
		})
	})
};

//ROOM TYPES
export const getRoomType = (roomTypeID) => {
	return new Promise((resolve, reject) => {
        const url = '/roomTypes/' + roomTypeID

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth} = response;
            const {status, data,message} = response;
            if(!data == []){
                resolve(data)
            }else{
				reject("Cant Find RoomType ")
			}

        });
	})
};

export const getRoomTypes = (hotelID) => {
	return new Promise((resolve, reject) => {
        const url = `/hotel/${hotelID}/roomTypes`

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth} = response;
            const {roomTypes = []} = response.data;
            if(auth){
                resolve(roomTypes)
            }else{
				reject("Cant Find RoomTypes from this Hotel")
			}

        });
	})
};

//PACKS
export const getPacks = (hotelID) => {
	return new Promise((resolve, reject) => {
        const url = `/hotel/${hotelID}/packs`

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth} = response;
            const {packs = []} = response.data;
            if(auth){
                resolve(packs)
            }else{
				reject("Cant Find RoomTypes from this Hotel")
			}
        });
	});
};

//ROOMS
export const getRooms = (hotelID) => {
	return new Promise((resolve, reject) => {
        const url = `/hotel/${hotelID}/rooms`

        fetch(url,{
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth} = response;
            const {rooms = []} = response.data;
            if(auth){
                resolve(rooms)
            }else{
				reject("Cant Find RoomTypes from this Hotel")
			}
        });
	})
};