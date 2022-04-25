import React from 'react'

const Modal = ({ children,modalHeader, setModalData}) => {
    return (
        <div className='modal'>
            <div className="backdrop" onClick={() => { setModalData(null) }}></div>
            <div className="modalContainer">
                <div className="modalHeader">
                    {modalHeader}
                </div>
                <div className="contentModal">
                    {children}
                </div>
            </div>
        </div>

    )
}

export default Modal