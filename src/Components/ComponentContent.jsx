import React from 'react'
import Card from "./Card"
import Box from '@mui/material/Box';

function ComponentContent(props) {
    const {data , values} = props
    return (
        <>
        <Box  sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 2,
            width: 128,
            height: 128,
            p: 2,
            textAlign : "center",
            backgroundColor:"hsla(0, 0%, 100%, 0.5)",
          },
        }}
        justifyContent="center" 
        alignItems="center"
        >
            {
                data.map((element) => ( <Card key={element.id} {...element} values ={values}/>))
            }
        </Box>
        </>
    )
}

export default ComponentContent
