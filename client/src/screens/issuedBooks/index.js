import React, { useEffect, useState } from 'react'
import Table from '../../components/table'
import Modal from '../../components/Modal';
import IssuedBookApi from "../../api/books/issuedBooks"


const IssuedBooks = () => {
  const [modalData, setModalData] = useState(null)
  const [issuedBooks, setIssuedBooks] = useState([])

  useEffect(() => {
    let isMounted = true;

    //fetch here with issuedbookapi
    const getIssuedBooks = async () => {
      const result = await IssuedBookApi.getBooks();
      console.log(result)
      setIssuedBooks(result.data)
    }
    getIssuedBooks();

    return () => {
      isMounted = false;
    }
  }, [])

  return (
    <div className='screen issuedBooksScreen'>

      <div className="headerRow">
        <h2>Issued Books</h2>
      </div>
      <div className="contentWrapper">
        <div className='content'>
          <Table
            data={issuedBooks}
            schema={{
              _id: {
                name: "#",
                onClick: () => { console.log("Sort by id") },
                style:{
                  // maxWidth:"40px"
                  width:"40px"
                }
              },
              name: {
                name: "User Name",
                onClick: () => { console.log("Sort by Users name") },
                style:{
                  // maxWidth:"150px",
                  width:"150px"
                  // minWidth:"150px"
                }
              },
              email: {
                name: "User email",
                onClick: () => { console.log("Sort by email") },
                style:{
                  // maxWidth:"250px",
                  // minWidth:"350px"
                  width:"250px"
                }
              },
              class: {
                name: "Users class",
                onClick: () => { console.log("Sort by class") },
                style:{
                  // maxWidth:"50px"
                  width:"50px"
                }
              },
              book: {
                name: "Book",
                onClick: () => { console.log("Sort by book") },
                style:{
                  // maxWidth:"70px"
                  width:"70px"
                }
              },
              date: {
                name: "Issued Date",
                onClick: () => { console.log("Sort by issued date") },
                style:{
                  // maxWidth:"70px"
                  width:"120px"
                }
              }
            }}
            actions={
              [
                {
                  icon: null,
                  btn: <div className='btn-return'>Return Book</div>,
                  onClick: (record) => {
                    setModalData(record);
                  }
                }
              ]
            }
          />
        </div>
      </div>
      {modalData && <Modal setModalData={setModalData} modalHeader="Edit Category" >
        {/* Ovdje pravim moj modal */}
      </Modal>}
    </div>
  )
}

export default IssuedBooks