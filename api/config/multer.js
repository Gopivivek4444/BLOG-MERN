import multer from 'multer';

const storage = multer.diskStorage({

  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    if (!allowedFiles.includes(file.mimetype)) {
        return cb(new Error('only images are allowed'), false)
    }else{
        return cb(null, true)
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;