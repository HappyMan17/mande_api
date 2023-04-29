import multer from 'multer'
import path from 'path'

const uploadFile = {};

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/users'),
    filename: (req,file,callBack)=>{
        callBack(null,Date.now()+file.originalname);
    }
})

uploadFile.upload = (fileName) =>{
    return multer ({
        storage
    }).single(fileName);
}

export default uploadFile;