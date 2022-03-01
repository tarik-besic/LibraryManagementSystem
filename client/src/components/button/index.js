import React from "react";

import LongButtonComponent from "./long-button";


const ButtonComponent = (props) => {
    return (
        <button
            onClick={props?.onClick}
            className={`button-component ${props?.className ?? ''}`}
            style={props?.style}
            tabIndex={props?.tabIndex}
            onKeyDown={props?.onKeyDown}
            id={props?.id}
        >{props?.children}</button>
    )
} 

export default ButtonComponent;
export {LongButtonComponent}