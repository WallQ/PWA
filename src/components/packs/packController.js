function packsControler(packModel){
    let services = {
        create,
        find,
        findAll,
        findById,
        findByIdAndUpdate,
        findByIdAndDelete
    }

    function create(values){
        let newPack = packModel(values);
        return save(newPack);
    }

    function save(newPack) {
		return new Promise(function (resolve, reject) {
            //Testar os IDS ( HOTEL, ROOM)
			newPack.save(function (err) {
				if (err) {
					reject(err);
				} else {
					resolve('Book created successfully!');
				}
			});
		});
	}

    function findAll(){
        return new Promise ((resolve,reject)=>{
            packModel.find({},(err,packs)=>{
                if (err) reject(err);
                resolve(packs)
            })
        })
    }
    function find(opt={}){
        return new Promise ((resolve,reject)=>{
            packModel.find(opt,(err,packs)=>{
                if (err) reject(err);
                resolve(packs)
            })
        })
    }

    function findById(id){
        return new Promise ((resolve,reject)=>{
            packModel.findById(id,(err,pack)=>{
                if (err) reject(err);
                resolve(pack);
            })
        })
    }

    function findByIdAndUpdate(id,values){
        return new Promise ((resolve,reject)=>{   
            packModel.findByIdAndUpdate(id,values,(err,pack)=>{
                if (err) reject(err);
                resolve(pack);
            })
        })
    }

    function findByIdAndDelete(id){
        return new Promise ((resolve,reject)=>{
            packModel.findByIdAndDelete(id,(err,pack)=>{
                if (!pack) reject("Can not dellet item!");
                resolve(pack);
            })
        })
    }

    return services;
}

module.exports = packsControler;