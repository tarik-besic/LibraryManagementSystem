import BookApi from '../../../api/books'
import React, { useState } from 'react'

const BooksModal = (props) => {
    const [data, setData] = useState(props.modalData)

    return (
        <>
            <div className="row">
                <div className="text">
                    Book Name
                </div>
                <input type="text" value={data.name} onChange={(ev) => {
                    setData({
                        ...data,
                        name: ev.target.value
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
                        author: ev.target.value
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
                        category: ev.target.value
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
                        quantityAll: ev.target.value
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
                        quantityFree: ev.target.value
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
                        isbn: ev.target.value
                    })
                }} />
            </div>
            <div className="rowBtn">
                <div className="btnModal" onClick={async () => {
                    if (data.name === "" || data.author === "" || data.category === "" || data.quantityAll === "" || data.quantityFree === "") {
                        alert("Please don't leave empty fields")
                        return;
                    }
                    if (!Number(data.quantityAll) || !Number(data.quantityFree)) {
                        alert("Plase write numbers in quantities")
                        return;
                    }
                    try {
                        const result=await BookApi.updateBook(data)
                        console.log(result)
                        if(result.status===200){
                            alert("Book updated");
                            props.setData((books) => {
                                return books.map((book) => {
                                    if (book._id === data._id)
                                        return data;
                                    return book

                                })
                            })
                        }else{
                            alert("Problem while updating book");
                            console.log(result)
                        }
                    } catch (err) { 
                        alert("Error...")
                        console.log("error", err)
                     }
                }}>Change</div>
            </div>
        </>
    )
}

export default BooksModal