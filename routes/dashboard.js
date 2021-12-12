const express=require("express");
const dashboardRouter=express.Router();

const controller=require('../controllers/dashboardController.js');

dashboardRouter.get('/',controller);

module.exports=dashboardRouter;