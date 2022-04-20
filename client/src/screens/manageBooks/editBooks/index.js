import React, { useEffect, useState } from 'react'
import Table from '../../../components/table/index';
import IssuedBooksApi from "../../../api/books/issuedBooks/index";
import editIcon from "../../../assets/images/icons/edit-icon.png"
import deleteIcon from "../../../assets/images/icons/delete-icon.png"
import BooksModal from '../../../components/Modal/booksModal';


const EditBooks = () => {

  const [data, setData] = useState([])
  const [modalData, setModalData] = useState(null)
  useEffect(() => {
    const fetchdata = async () => {

      // let resp = await fetch("http://localhost:5000/books/");
      const resp = IssuedBooksApi.getBooks().then((data) => {
        setData(data.data.books);
      })
      // const data = await resp.json();

      // setData(data.books);
    }
    fetchdata();
  }, [])
  useEffect(() => {
    console.log("data");
    console.log(data);
  }, [data])

  return (
    <div className='screen edit-books-screen'>
      <div className='content-wrapper'>
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
                name: "Books avalible",
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
              IssuedBooksApi.deleteBook(person._id).then(() => {
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