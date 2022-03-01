import React from "react";

import InputComponent from "..";

const IconInputComponent = (props) => {
    return (
        <div 
            className={`icon-input-component ${props?.className ?? ''}`}
            style={props?.style}
            onFocus={(evt)=>{evt.target.focus()}}
            onClick={(evt)=>{evt.target.querySelector('input') && evt.target.querySelector('input').focus()}}
        >
            <img className="icon" src={props?.icon}/>
            <InputComponent
                value={props?.value}
                setValue={props?.setValue}
                type="text"
                placeholder={props?.placeholder}
                onKeyDown={props?.onKeyDown}
                id={props?.id}
            />
        </div>
    )
}

export default IconInputComponent;