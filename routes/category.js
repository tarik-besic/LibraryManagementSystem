const express=require('express');
const categoryRouter=express.Router();

//controller
const categoryController=require('../controllers/categoryController');


categoryRouter.get('/',categoryController.getCategories);
categoryRouter.post('/',categoryController.postCategory);
// categoryRouter.patch('/',categoryController.updateCategory);
// categoryRouter.delete('/',categoryController.deleteCategory);

module.exports=categoryRouter;
