const multer = require('multer')
const path = require('path')

const upload = multer({
    storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'public/assets/images/upload')
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + path.extname(file.originalname))
		}}),
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        
        const fileTypes = /jpeg|JPEG|jpg|JPG|png|PNG/
        const mimeType = fileTypes.test(file.mimetype) 
        console.log(fileTypes,mimeType) 
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).array('file', 10)

module.exports = {
    upload
}