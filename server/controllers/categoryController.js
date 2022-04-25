const Category = require('../models/category');

const getCategories = async (req, res) => {
    let arrayOfCategories;
    try {
        arrayOfCategories = await Category.find({});
        res.status(200).json({ arrayOfCategories })
    }
    catch (error) {
        console.log(error);
        res.status(501).json({
            msg: "Some problem while fetching categories from database"
        })
    }
}

const postCategory = async (req, res) => {

    console.log(req.body)
    try {
        const category = new Category({
            name: req.body.name
        })

        await category.save();
        res.status(200).json({ category });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error while creating category" })
    }

}

const updateCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndUpdate({ _id: req.body._id }, { name: req.body.name });
        if (result) {
            res.status(200).json({ msg: "Category updated" })
        }
        else {
            res.status(404).json({ msg: "Category not found" })

        }
    } catch (err) {

        console.log(err);
        res.status(400).json({ err })
    }
}

const deleteCategory = async (req, res) => {

    const category = req.body;
    try {
        const result = await Category.findByIdAndDelete({ _id: category._id })
        if (result)
            res.status(200).json({ msg: "Category deleted" })
        else
            res.status(404).json({ msg: "Category not found" })
    } catch (error) {
        res.status(500).json({err});
    }
}

module.exports = {
    getCategories,
    postCategory,
    updateCategory,
    deleteCategory
}