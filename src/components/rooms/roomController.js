function roomsControler(roomModel){
    let services = {
        create,
        findAll,
        findById,
        findByNumber,
        findByHotel,
        findByIdAndUpdate,
        findByNumberAndUpdate,
        findOneAndDelete,
        findOneAndDeleteByNumber
    }

    function create(values){
        let newRoom = roomModel(values);
        return save(newRoom);
    }

    function save(newRoom) {
		return new Promise(function (resolve, reject) {
			newRoom.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Room created successfully!');
				}
			});
		});
	}

    function findAll(){
        return new Promise ((resolve,reject)=>{
            roomModel.find({},(err,rooms)=>{
                if (err) reject(err);
                resolve(rooms)
            })
        })
    }

    function findById(id){
        return new Promise ((resolve,reject)=>{
            roomModel.findById(id,(err,room)=>{
                if (err) reject(err);
                resolve(room);
            })
        })
    }

    function findByNumber(number){
        return new Promise ((resolve,reject)=>{
            roomModel.find({number: number},(err,room)=>{
                if (err) reject(err);
                resolve(room);
            })
        })
    }

    function findByHotel(hotelID){
        return new Promise ((resolve,reject)=>{
            roomModel.find({hotel: hotelID},(err,room)=>{
                if (err) reject(err);
                resolve(room);
            })
        })
    }


    function findByIdAndUpdate(id,values){
        return new Promise ((resolve,reject)=>{   
            roomModel.findByIdAndUpdate(id,values,(err,room)=>{
                if (err) reject(err);
                resolve(room);
            })
        })
    }

    function findByNumberAndUpdate(number,values){
        return new Promise ((resolve,reject)=>{
            roomModel.findOneAndUpdate({number:number},values,(err,room)=>{
                if (err) reject(err);
                resolve(room);
            })
        })
    }

    function findOneAndDelete(id){
        return new Promise ((resolve,reject)=>{
            roomModel.findOneAndDelete({_id:id},(err,room)=>{
                if (!room) reject("Can not dellet item!");
                resolve(room);
            })
        })
    }
    function findOneAndDeleteByNumber(number){
        return new Promise ((resolve,reject)=>{
            roomModel.findOneAndDelete({number:number},(err,room)=>{
                if (!room) reject("Can not dellet item!");
                resolve(room);
            })
        })
    }

    return services;
}

module.exports = roomsControler;