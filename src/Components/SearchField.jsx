import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SearchField({handleChange , handleSubmit , addInList}) {
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
                style={{margin:"1.5rem 2rem"}}
                color="secondary"
            >Submit</Button>
            <Box textAlign="center">
            <Button
            variant = "contained"
            onClick = {addInList}
            sx={{my:1}}
            >
                Add city
            </Button>
            </Box>
        </>
    )
}

export default SearchField
