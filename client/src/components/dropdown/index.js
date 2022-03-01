import React, { useState } from "react";

import DropdownArrow from "../../assets/icons/dropdown_arrow.svg";

const DropdownComponent = (props) => {
    const [visible, setVisible] = useState(false);
    
    return (
        <div className="dropdown-component">
            <div 
                className="label"
                onClick={()=>setVisible(!visible)}    
            >
                Dropdown
                <img src={DropdownArrow} className="arrow-icon"/>    
            </div>
            {   visible &&
                <div className={`items`}>
                    <div className="item">Option 1</div>
                    <div className="item">Option 1</div>
                    <div className="item">Option 1</div>
                </div>
            }
        </div>
    )
} 

export default DropdownComponent;
