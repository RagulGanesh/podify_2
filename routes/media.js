const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
var cors = require('cors')

const mediaController=require('../controllers/mediaController')
const multer=require('multer')

const fs=require('fs')
const path=require('path')
const app = express()
app.use(cors())

// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         if(!fs.existsSync("public")){
//             fs.mkdirSync("public")
//         }
//         if(!fs.existsSync("public/videos")){
//             fs.mkdirSync("public/videos")
//         }

//         cb(null,"public/videos")
//     },
//     filename:function(req,file,cb){
//         cb(null,Date.now()+file.originalname)
//     }
// })

// const upload=multer({
//     storage:storage,
    
// })


router.post('/all',mediaController.getAll)


router.post('/:category',mediaController.categoryList)

router.put('/create',mediaController.create)

router.put('/add',mediaController.add)

router.delete('/deleteitem/:id',mediaController.deleteItem)

router.post('/getmedia/:id',mediaController.getItem)

router.post('/search', mediaController.search)


module.exports=router