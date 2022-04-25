import React, { useEffect, useMemo, useRef, useState } from 'react'
import Table from '../../components/table'
import editIcon from "../../assets/images/icons/edit-icon.png"
import deleteIcon from "../../assets/images/icons/delete-icon.png"
import CategoryApi from '../../api/category';
import Modal from '../../components/Modal';
import CategoriesModal from '../../components/Modal/categoriesModal';
import Submit from '../../components/Submit';

const Category = () => {
  const [categories, setCategories] = useState([])
  const data = useRef({ name: "" })
  const [modalData, setModalData] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    let isMounted = true;
    const getCategories = async () => {
      const req = await CategoryApi.getCategories()
      if (isMounted)
        setCategories(req.data.arrayOfCategories)
    }
    getCategories()
    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <div className='screen categoriesScreen'>
      <div className="headerRow">
        <h2>Manage Categories</h2>
      </div>
      <div className="contentWrapper">
        <div className='content'>
          <div className="tableContainer">
            <Table
              data={categories}
              schema={{
                categoryName: {
                  name: "Category",
                  onClick: () => { console.log("Sort by category") }
                }
              }}
              actions={
                [
                  {
                    icon: editIcon,
                    onClick: (category) => {
                      setModalData(category);
                    }
                  },
                  {
                    icon: deleteIcon,
                    onClick: async (category) => {
                      const result = await CategoryApi.deleteCategory(category);
                      if (result.status === 200)
                        alert("Category Deleted")
                      else
                        alert("Problem while deleting category")
                    }
                  }
                ]
              }
            />
          </div>
          <div className='addCategory'>
            <h4>Add a category</h4>
            <div className="row">
              <input type="text" className="input-text" onChange={(event) => { data.current.name = event.target.value }} />
              <Submit data={data.current} setCategories={setCategories} />
            </div>
          </div>
        </div>
        {modalData && <Modal setModalData={setModalData} modalHeader="Edit Category" >
          <CategoriesModal modalData={modalData} />
        </Modal>}
      </div>
    </div>
  )
}

export default Category