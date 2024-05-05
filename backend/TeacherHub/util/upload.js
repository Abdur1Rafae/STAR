const multer = require('multer')
const path = require("path")

const UPLOAD_DIR = "uploads/"
const UPLOAD_SIZE = 6000000 

const checkFileType = function (file, cb) 
{
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {return cb(null, true)} 
  else {cb("Error: You can Only Upload Images!!")}
}

const storageEngine = multer.diskStorage
({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {cb(null, `${Date.now()}_${file.originalname}`)}
})
  
const upload = multer
({ 
    storage: storageEngine,
    limits: { fileSize: UPLOAD_SIZE },
    fileFilter: (req, file, cb) => {checkFileType(file, cb)}
})

module.exports = upload