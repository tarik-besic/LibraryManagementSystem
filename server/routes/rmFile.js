const express=require('express')
const rmFileRouter=express.Router()
const controller=require('../controllers/removeFileController')
console.log("USAO SI U ROUTER")
rmFileRouter.post("/",controller.rmFileController);

module.exports=rmFileRouter;