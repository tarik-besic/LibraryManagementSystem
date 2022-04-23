import React, { useEffect, useState } from 'react'
import Table from '../../../components/table/index';
import BookApi from "../../../api/books/issuedBooks/index";
import editIcon from "../../../assets/images/icons/edit-icon.png"
import deleteIcon from "../../../assets/images/icons/delete-icon.png"
import BooksModal from '../../../components/Modal/booksModal';


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
      <div className='contentWrapper'>
        <h2>Edit Books</h2>
        <Table
          data={data}
          schema={
            {
              bookName: {
                name: "Book name",
                onClick: () => { console.log("Sort by book name") }
              },
              authorName: {
                name: "Author name",
                onClick: () => { console.log("Sort by author name") }
              },
              quantityFree: {
                name: "Books available",
                onClick: () => { console.log("Sort by author name") }
              },
              quantityAll: {
                name: "Books quantity",
                onClick: () => { console.log("Sort by books quantity") }
              },
              category: {
                name: "Category",
                onClick: () => { console.log("Sort by books quantity") }
              },
              isbn: {
                name: "ISBN",
                onClick: () => { console.log("Sort by ISBN") }
              }
            }
          }
          actions={[{
            icon: editIcon,
            onClick: (person) => {
              // console.log("idem da editujem",person);
              setModalData(person);
            }
          },
          {
            icon: deleteIcon,
            onClick: (person) => {
              BookApi.deleteBook(person._id).then(() => {
                setData(data.filter((data) => { return data._id !== person._id }))
              })
            }
          }
          ]
          }
        />
      </div>
      {modalData && <BooksModal setModalData={setModalData} book={modalData} />}
      {/* <Modal data={data}/> */}
    </div>
  )
}

export default EditBooks;