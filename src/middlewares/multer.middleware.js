import multer from 'multer'

// this method is used for storing data,files etc primarylly in the disk or memory 
const storage = multer.diskStorage({   //the data is store on disk not in memory

    destination: function (req, file, cb) {  //cb = callback
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    }
})



export const upload = multer(
    {
        storage,
    }
)