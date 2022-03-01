const express=require("express");
const historyRouter=express.Router();

const controller=require("../controllers/historyController");

historyRouter.get('/',controller.getYear);
historyRouter.delete('/',controller.deleteYear);
historyRouter.post('/',controller.saveYear);

module.exports=historyRouter;