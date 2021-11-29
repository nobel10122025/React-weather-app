import React from 'react'
import Button from '@mui/material/Button';

function SearchField({handleChange , handleSubmit}) {
    return (
        <>
            <input
            type="search"
            onChange={handleChange}
            variant="standard"
            label="Enter City"
            bordercolor="primary"
            className="searchbox"
            />
            <Button 
                type="submit" 
                onClick={handleSubmit} 
                variant="contained"
                style={{margin:"2rem"}}
                color="secondary"
            >Submit</Button>
        </>
    )
}

export default SearchField
