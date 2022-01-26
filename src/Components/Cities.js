import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Cities(props) {
    return (
        <div>
            <Box sx={{
            display : "flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection: { xs: "column", md: "row"}
        }}>
            {
                props.cityList.map((city)=>
                    <Typography 
                        variant="h6" 
                        color="#FFF" 
                        sx={{mx:2,cursor:"pointer"}} 
                        key={city.id}
                        onClick={()=>{
                            props.handleScroll();
                            props.handleSubmitList(city.id);
                        }}
                    >
                    {city.cityName}
                    <i className="far fa-times-circle" 
                    style={{color:"#ce2029",fontSize:"1rem" , marginLeft:"0.5rem"}}
                    onClick={()=>{props.deleteCity(city.id)}}
                    ></i>
                    </Typography>
                )
            }
            </Box>
        </div>
    )
}

export default Cities
