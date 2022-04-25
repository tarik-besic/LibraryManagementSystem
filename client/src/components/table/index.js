import React, { useEffect, useState } from "react";
import { rangeArray } from "../../utils/rangeArray"

const Table = (props) => {

    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [range, setRange] = useState([]);
    const [paginatedRows, setPaginatedRows] = useState([]);
    const sizes = [5, 10, 15, 20];
    useEffect(() => {
        // console.log("DATA,", props?.data)
        setCurrentPage(1);

        setPaginatedRows([])
        const numberOfRows = props.data?.length ?? 0 ;
        const totalPageCount = Math.ceil(numberOfRows / pageSize);

        setRange(rangeArray(1, totalPageCount));

        // setting first 5 posts
        // let newData=data.slice(0, pageSize); 
        // console.log("tare:", props?.data?.slice(0, pageSize));
        setPaginatedRows(props?.data?.slice(0, pageSize)?? []);

        return () => {

        }

    }, [pageSize, props.data])

    useEffect(() => {

        // console.log("Promjena pagnated rows,", paginatedRows)
        // setCurrentPage(1);


    }, [paginatedRows])

    const changePagination = (index) => {

        const max = Math.max(...range);
        const min = Math.min(...range);

        if (index > max || index < min)
            return;

        setCurrentPage(index);

        const startIndex = (index - 1) * pageSize;
        setPaginatedRows(props.data.slice(startIndex, Number(startIndex) + Number(pageSize)))
    }
        console.log("RERENDERAM TABELUU")
    return (
        <div className="table-container">
            <div className="table">
                <div className="row header">
                    {
                        props.schema && Object.values(props.schema).map((key, i) => {
                            // console.log(key.name)
                            return (<div key={i} className="cell header"> {key.name} </div>)
                        })
                    }
                    {props?.actions && <div className="cell header">Akcija </div>}
                </div>

                {paginatedRows.length > 0 && paginatedRows.map((person, i) => {

                    return (
                        <div key={i} className="row">
                            {props?.data &&
                                props.data.length > 0 &&
                                Object.entries(person).map((person,i) => {
                                    // console.log("Person",person);
                                    const [key, value] = person;
                                    if (key == "_id" || key == "__v") return;
                                    return <div key={i} className="cell">{value}</div>
                                })}
                            {props?.actions ? <div className="cell">{props.actions.map((action,i) => {
                                    // action.onClick(person)
                                    return (
                                        <span className="action-icon"
                                            onClick={() => action.onClick(person)}
                                            key={i}
                                        >
                                            {action.icon ? <img src={action.icon} /> : "akcija"}
                                        </span>
                                    )
                                })} </div> : ''}
                        </div>
                    );
                })}
                <div className="pagination">
                    <div className="changing">
                        <div className="left"
                            onClick={() => changePagination(currentPage - 1)}
                        >
                            &lt;
                        </div>
                        <div className="value">{currentPage}</div>
                        <div className="right" onClick={() => changePagination(currentPage + 1)}>&gt;</div>
                    </div>
                    <div className="page-number">
                        <select className="selekt"
                            onChange={(e) => { setPageSize(e.target.value) }}
                        >
                            {sizes.map((size,i) => {
                                return <option value={size} key={i}>{size}</option>
                            })}
                        </select>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;