import React, { useState } from 'react'
import CategoryApi from '../../../api/category'
const CategoriesModal = ({ modalData }) => {

    const [data, setData] = useState(modalData)

    return (
        <>
            <div className="row">
                <div className="text">
                    Category
                </div>
                <input type="text" value={data.name} onChange={(ev) => {
                    setData({
                        ...data,
                        name: ev.target.value.trim()
                    })
                }} />
            </div>
            <div className="rowBtn">
                <div className="btnModal" onClick={async () => {
                    if (data.category === "") {
                        alert("Please don't leave empty fields")
                        return;
                    }
                    try {
                        const result = await CategoryApi.updateCategory(data);
                        console.log(result.status)
                        if (result.status === 200)
                            alert("Category updated")
                        else if (result.status === 404)
                            alert("Problem..Category not found")
                    }catch(err){
                        alert("Error");
                        console.log(err)
                    }
                    
                    }}>Change</div>
            </div>
        </>
    )
}

export default CategoriesModal