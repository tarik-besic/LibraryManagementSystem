import React, { useEffect, useState } from 'react'
import Table from '../../../components/table/index';
import BookApi from "../../../api/books/index";
import editIcon from "../../../assets/images/icons/edit-icon.png"
import deleteIcon from "../../../assets/images/icons/delete-icon.png"
import Modal from '../../../components/Modal';
import BooksModal from '../../../components/Modal/booksModal';


// @actions...Array of objects [{"icon":url,onClick:()=>{function}}]

const EditBooks = () => {

  const [data, setData] = useState([])
  const [modalData, setModalData] = useState(null)
  useEffect(() => {
    const fetchdata = async () => {
      BookApi.getBooks().then((data) => {
        setData(data.data.books);
      })
    }
    fetchdata();
  }, [])

  return (
    <div className='screen edit-books-screen'>
      <h2>Edit Books</h2>
      <div className='contentWrapper'>
        <Table
          data={data}
          schema={
            {
              _id: {
                name: "#",
                onClick: () => { console.log("Sort by id") },
                style:{
                  width:"40px"
                 
                }
              },
              bookName: {
                name: "Book name",
                onClick: () => { console.log("Sort by book name") }
              },
              authorName: {
                name: "Author name",
                onClick: () => { console.log("Sort by author name") }
              },
              category: {
                name: "Category",
                onClick: () => { console.log("Sort by books quantity") }
              },
              quantityFree: {
                name: "Available",
                onClick: () => { console.log("Sort by author name") },
                style:{
                  width:"80px"
                }
              },
              quantityAll: {
                name: "Quantity",
                onClick: () => { console.log("Sort by books quantity") },
                style:{
                  width:"80px"
                }
              },
              isbn: {
                name: "ISBN",
                onClick: () => { console.log("Sort by ISBN") }
              }
            }
          }
          actions={[{
            icon: editIcon,
            onClick: (book) => {
              setModalData(book);
            }
          },
          {
            icon: deleteIcon,
            onClick: async (person) => {
              try {
                const data = await BookApi.deleteBook(person._id);
                console.log(data.status)
                if (data.status === 200) {
                  alert("Book deleted");
                  setData(data.filter((data) => { return data._id !== person._id }))
                } else if (data.status === 404) {
                  alert("Book not found")
                }
              } catch (err) {
                alert("Error...")
                console.log(err)
              }
            }
          }
          ]
          }
        />
      </div>
      {modalData && <Modal setModalData={setModalData}  >
        <BooksModal modalData={modalData} setData={setData}/>
      </Modal>}
    </div>
  )
}

export default EditBooks;