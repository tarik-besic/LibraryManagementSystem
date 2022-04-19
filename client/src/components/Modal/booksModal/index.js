import IssuedBooksApi from '../../../api/books/issuedBooks'
import React, { useEffect, useState } from 'react'

const BooksModal = ({ book, setModalData }) => {
    const [data, setData] = useState(book)

    return (
        <div className='modal'>
            <div className="backdrop" onClick={() => { setModalData(null) }}></div>
            <div className="modalContainer">
                <div className="modalHeader">
                    Edit Book
                </div>

                <div className="contentModal">
                    <input type="text" value={data.id} hidden={true} />

                    <div className="row">
                        <div className="text">
                            Book Name
                        </div>
                        <input type="text" value={data.name} onChange={(ev) => {
                            setData({
                                ...data,
                                name: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="row">
                        <div className="text">
                            Author name
                        </div>
                        <input type="text" value={data.author} onChange={(ev) => {
                            setData({
                                ...data,
                                author: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="row">
                        <div className="text">
                            Category
                        </div>
                        <input type="text" value={data.category} onChange={(ev) => {
                            setData({
                                ...data,
                                category: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="row">
                        <div className="text">
                            Quantity all
                        </div>
                        <input type="text" value={data.quantityAll} onChange={(ev) => {
                            setData({
                                ...data,
                                quantityAll: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="row">
                        <div className="text">
                            Quantity free
                        </div>
                        <input type="text" value={data.quantityFree} onChange={(ev) => {
                            setData({
                                ...data,
                                quantityFree: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="row">
                        <div className="text">
                            Isbn
                        </div>
                        <input type="text" value={data.isbn} onChange={(ev) => {
                            setData({
                                ...data,
                                isbn: ev.target.value.trim()
                            })
                        }} />
                    </div>
                    <div className="rowBtn">
                        <div className="btnModal" onClick={() => {
                            if (data.name == "" || data.author == "" || data.category == "" || data.quantityAll == "" || data.quantityFree == "") {
                                alert("Please don't leave empty fields")
                                return;
                            }
                            if(!Number(data.quantityAll) || !Number(data.quantityFree))
                                {
                                    alert("Plase write numbers in quantities")
                                    return;
                                }
                            try {
                                IssuedBooksApi.updateBook(data)
                            } catch (err) { console.log("error",err) }
                        }}>Change</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksModal