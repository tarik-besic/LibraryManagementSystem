import React, { useState } from "react";

import { IconInputComponent } from "../../../../components/input";
import SearchIcon from "../../../../assets/icons/search.svg";

import DropdownComponent from "../../../../components/dropdown";


const EmployeesSegment = () => {
    const [search, setSearch] = useState(null);

    return (
        <div className="segmnet employees-segment">
            <IconInputComponent
                value={search}
                setValue={setSearch}
                placeholder={"Search ..."}
                icon={SearchIcon}
            />
            <div
                style={{
                    display:'flex'
                }}
            >
                <DropdownComponent/>
            </div>
        </div>
    )
} 

export default EmployeesSegment;
