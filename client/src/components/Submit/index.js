import React, { useState } from 'react'
import CategoryApi from '../../api/category';

const Submit = ({ data }) => {
    const [disabled, setDisabled] = useState(false)
    return (
        <div className={`btn-submit ${disabled ? "disabled" : ''}`} 
        onClick={async () => {
            setDisabled(true);

            const result = await CategoryApi.addCategory(data);
            if (result.status === 200) {
                alert("Category added");
            }
            else
                alert("Error")
            setDisabled(true)
        }}
            disabled={disabled}
        >
            Submit
        </div>
    )
}

export default Submit