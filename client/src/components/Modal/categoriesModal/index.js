import React, { useState } from 'react'
import CategoryApi from '../../../api/category'
const CategoriesModal = ({ modalData, setCategories }) => {

    const [data, setData] = useState(modalData)

    //after user clicked on editCategory i then filter in setCategories and remove the category from table and just add the new one on its place
    
    return (
        <>
            <div className="row">
                <div className="text">
                    Category
                </div>
                <input type="text" value={data.name} onChange={(ev) => {
                    setData({
                        ...data,
                        name: ev.target.value
                    })
                }} />
            </div>
            <div className="rowBtn">
                <div className="btnModal" onClick={async () => {
                    if (data.name === "") {
                        alert("Please don't leave empty fields")
                        return;
                    }
                    try {
                        const result = await CategoryApi.updateCategory(data);
                        if (result.status === 200) {
                            alert("Category updated");
                            setCategories((categories) => {
                                return categories.map((category) => {
                                    if (category._id === data._id)
                                        return data;
                                    return category

                                })
                            })
                        }
                        else if (result.status === 404)
                            alert("Problem..Category not found")
                    } catch (err) {
                        alert("Error");
                        console.log(err)
                    }

                }}>Change</div>
            </div>
        </>
    )
}

export default CategoriesModal