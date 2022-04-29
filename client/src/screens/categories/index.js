import React, { useEffect, useMemo, useRef, useState } from 'react'
import Table from '../../components/table'
import editIcon from "../../assets/images/icons/edit-icon.png"
import deleteIcon from "../../assets/images/icons/delete-icon.png"
import CategoryApi from '../../api/category';
import Modal from '../../components/Modal';
import CategoriesModal from '../../components/Modal/categoriesModal';

const Category = () => {
  const [categories, setCategories] = useState([])
  const data = useRef({ name: "" })
  const formRef = useRef()
  const [modalData, setModalData] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    console.log("Saljem api request")
    let isMounted = true;
    const getCategories = async () => {
      try {
        const req = await CategoryApi.getCategories()
        if (isMounted)
          setCategories(req.data.arrayOfCategories)
      } catch (error) {
        alert("Cannot connect to the database")
      }
      
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
            <Table
              data={categories}
              schema={{
                _id: {
                  name: "#",
                  onClick: () => { console.log("Sort by id") },
                  style:{
                    width:"40px"
                  }},

                categoryName: {
                  name: "Category",
                  onClick: () => { console.log("Sort by category") },
                  
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
                      try {
                        const result = await CategoryApi.deleteCategory(category);
                        if (result.status === 200) {
                          alert("Category Deleted")
                          setCategories(categories.filter(catg => { return catg._id !== category._id }))
                        }
                        else
                          if (result.status === 404)
                            alert("Cannot find the category")
                      } catch (err) {
                        console.log(err)
                        alert("error")
                      }
                    }
                  }
                ]
              }
            />
          <div className='addCategory'>
            <h4>Add a category</h4>
            <div className="row">
              <form ref={formRef}>
                <input type="text" className="input-text" onChange={(event) => { data.current.name = event.target.value; console.log(data.current) }} />
                <div className={`btn-submit ${disabled ? "disabled" : ''}`}
                  onClick={async () => {
                    if (data.current.name.trim() === "") {
                      alert("You cant send empty category")
                      return;
                    }
                    setDisabled(true);
                    try {
                      const result = await CategoryApi.addCategory(data.current);
                      if (result.status === 200) {
                        {
                          data.current.name = "";
                          formRef.current.reset();
                          alert("Category added")
                          setCategories((categories) => [...categories, result.data.category])
                          setDisabled(false);

                        }
                      }
                      else {
                        alert("Error")
                        setDisabled(false)

                      }
                    } catch (err) {
                      alert("Err");
                      console.log(err);
                    }
                  }}
                  disabled={disabled}
                >
                  Submit
                </div>
              </form>
            </div>
          </div>
        {modalData && <Modal setModalData={setModalData} modalHeader="Edit Category" >
          <CategoriesModal modalData={modalData} setCategories={setCategories} />
        </Modal>}
      </div>
    </div>
  )
}

export default Category