function roomsControler(roomModel){
    let services = {
        create,
        findAll,
        findById,
        findByIdAndUpdate,
        findOneAndDelete
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

    function findByIdAndUpdate(id,values){
        return new Promise ((resolve,reject)=>{
            roomModel.findByIdAndUpdate(id,values,(err,room)=>{
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

    return services;
}

module.exports = roomsControler;