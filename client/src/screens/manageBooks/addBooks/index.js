import React, { useEffect, useRef, useState } from 'react'
import CategoryApi from "../../../api/category/index";
import BookApi from "../../../api/books/issuedBooks/index";
const AddBooks = () => {
  const categories = useRef([])
  const [data, setData] = useState({
    name: "",
    author: "",
    category: "",
    quantityAll: 0,
    quantityFree: 0,
    isbn: ""

  })

  useEffect(() => {
    const getCategories = async () => {
      const req = await CategoryApi.getCategories()
      categories.current = req.data.arrayOfCategories.map(category => category.name);
      setData({
        ...data,
        category: categories.current[0]
      })
    }
    getCategories()
  }, [])

  return (
    <div className='screen addBooksScreen'>
      <div className="contentWrapper">
        <h2>Add a new book</h2>
        <form>
          <div className="form">
            <div className="row">
              <div className="text">
                Book name
              </div>
              <input type="text"
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value
                  })
                }}
                value={data.name}
              />
            </div>
            <div className="row">
              <div className="text">
                Author
              </div>
              <input type="text"
                value={data.author}
                onChange={(e) => {
                  setData({
                    ...data,
                    author: e.target.value
                  })
                }} />
            </div>
            <div className="row">
              <div className="text">
                Category
              </div>
              <select id="data" onChange={(e) => { setData({ ...data, category: e.target.value }) }}  >
                {categories.current.map((category, i) => {
                  return <option value={category} key={i}>{category}</option>
                })}
              </select>
            </div>
            <div className="row">
              <div className="text">
                Book Quantity
              </div>
              <input type="text"
                value={data.quantityAll}
                onChange={(e) => {
                  setData({
                    ...data,
                    quantityAll: e.target.value,
                    quantityFree: e.target.value
                  })
                }} />
            </div>
            <div className="row">
              <div className="text">
                isbn
              </div>
              <input type="text"
                value={data.isbn}
                onChange={(e) => {
                  setData({
                    ...data,
                    isbn: e.target.value
                  })
                }} />
            </div>
            <div className="btn" onClick={() => {

              if (data.category === "") {
                console.log("Stavljam", categories[0])
                setData({
                  ...data,
                  category: categories[0]
                })
                //empty
                alert(data.category)
              }

              //validation
              if (data.title === "" || data.author === "" || data.isbn === "") {
                alert("Please fill out all fields");
                return;
              }
              if (!Number(data.quantityAll) || !data.quantityAll || data.quantityAll == "") {

                alert("Please insert Number in Quantity input");
                return;
              }
              BookApi.addBook(data).then(() => {
                alert("Book added");
                setData({
                  category: categories.current[0],
                  name: "",
                  author: "",
                  quantityAll: 0,
                  quantityFree: 0,
                  isbn: ""
                })
              }).catch((err) => {
                console.log(err);
                alert("Error...")
              }
              )

            }}>
              Submit
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBooks;