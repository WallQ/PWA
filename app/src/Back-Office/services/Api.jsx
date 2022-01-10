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
			console.log("PACKS: ", packs)
            if(auth){
                resolve(packs)
            }else{
				reject("Cant Find RoomTypes from this Hotel")
			}
        });
	});
};

export const getRoom = (hotelID) => {
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