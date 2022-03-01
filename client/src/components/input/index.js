import React from "react";

// import IconInputComponent from "./icon-input";


/* 
Props:
    * value     [string]    : Default value for input element
    * setValue  [function]  : Hook function for setting value outside of component
    * type      [string]    : Type of input
    * style     [json]      : Inline element style 
    * className [string]    : Addition class style for component
    * onKeyDown [function]  : Event to happen when button is pressed down
    * tabIndex  [integer]   : Elements access order on pressing tab
    * ref       [reference] : React Hook reference to component
    * id        [string]    : Id element
*/
const InputComponent = (props) => {
    return (
        <input
            className={`input-component ${props?.className ?? ''}`}
            value={props?.value}
            onChange={(evt) => {
                if (props?.setValue)
                    props?.setValue(evt.target.value)
            }}
            type={props?.type}
            style={props?.style}
            placeholder={props?.placeholder}
            onKeyDown={props?.onKeyDown}
            tabIndex={props?.tabIndex}
            ref={props?.ref}
            id={props?.id}
        />
    )
}

export default InputComponent;
// export {IconInputComponent};
