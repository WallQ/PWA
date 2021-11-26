hotelModel = require('../components/hotel/hotelModel');

module.exports = function verifyBelongHotel(idUser, idHotel) {
    let opt = {
        _id: idHotel,
        $or: [
            {
                director: idUser,
            },
            {
                employee: idUser,
            },
        ],
    };
    return new Promise((resolve, reject) => {
        hotelModel.findOne(opt, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}