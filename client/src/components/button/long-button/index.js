import React from "react";

import ButtonComponent from "..";


const LongButtonComponent = (props) => {
    return (
        <ButtonComponent
            onClick={props?.onClick}
            style={props?.style}
            className="long"
            tabIndex={props?.tabIndex}
            onKeyDown={props?.onKeyDown}
            id={props?.id}
        >
            {props?.children}
        </ButtonComponent>
    )
}

export default LongButtonComponent;