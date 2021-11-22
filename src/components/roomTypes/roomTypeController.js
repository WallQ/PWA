function roomTypesControler(roomTypeModel,bookModel,roomModel){
    let services = {
        create,
        find,
        findAll,
        findById,
        findByIdAndUpdate,
        findByIdAndDelete,
        findPacksFromRoomType,
        findBooksFromRoomType,
        findRoomsFromRoomType
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
                    console.log(err);
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

    function findPacksFromRoomType(id){
        return new Promise ((resolve,reject)=>{
            roomTypeModel
                .findById(id)
                .populate('packs')
                .exec((err,room)=> {
                    if (err) reject(err);
                    resolve(room.packs);
            })
        })
    }
    function findBooksFromRoomType(id){
        return new Promise ((resolve,reject)=>{
            bookModel
                .find({roomType: id},(err,books)=> {
                    if (err) reject(err);
                    resolve(books);
            })
        })
    }
    function findRoomsFromRoomType(id){
        return new Promise ((resolve,reject)=>{
            roomModel
                .find({roomType: id},(err,rooms)=> {
                    if (err) reject(err);
                    resolve(rooms);
            })
        })
    }

    return services;
}

module.exports = roomTypesControler;