function roomTypesControler(roomTypeModel){
    let services = {
        create,
        find,
        findAll,
        findById,
        findByIdAndUpdate,
        findByIdAndDelete
    }

    function create(values){
        let newRoomType = roomTypeModel(values);
        return save(newRoomType);
    }

    function save(newRoomType) {
		return new Promise(function (resolve, reject) {
            //Testar os IDS ( HOTEL, ROOM)
			newRoomType.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('RoomType created successfully!');
				}
			});
		});
	}

    function findAll(){
        return new Promise ((resolve,reject)=>{
            roomTypeModel.find({},(err,roomTypes)=>{
                if (err) reject(err);
                resolve(roomTypes)
            })
        })
    }
    function find(opt={}){
        return new Promise ((resolve,reject)=>{
            roomTypeModel.find(opt,(err,roomTypes)=>{
                if (err) reject(err);
                resolve(roomTypes)
            })
        })
    }

    function findById(id){
        return new Promise ((resolve,reject)=>{
            roomTypeModel.findById(id,(err,roomTypes)=>{
                if (err) reject(err);
                resolve(roomTypes);
            })
        })
    }

    function findByIdAndUpdate(id,values){
        return new Promise ((resolve,reject)=>{   
            roomTypeModel.findByIdAndUpdate(id,values,(err,roomType)=>{
                if (err) reject(err);
                resolve(roomType);
            })
        })
    }

    function findByIdAndDelete(id){
        return new Promise ((resolve,reject)=>{
            roomTypeModel.findByIdAndDelete(id,(err,roomType)=>{
                if (!roomType) reject("Can not dellet item!");
                resolve(roomType);
            })
        })
    }

    return services;
}

module.exports = roomTypesControler;