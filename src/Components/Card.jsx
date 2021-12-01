import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function Card(props) {
    const {name , src , unit , values} = props;
    // console.log(values)

    function getValues(){
        if(props.name === "Temperature-Felt"){
        return Math.round(values.feels_like-273.15)
        }
        if (props.name === "Humidity"){
            return values.humidity
        }
        if (props.name === "Wind-Speed"){
            return values.speed
        }
        if (props.name === "Visibility"){
            return values.visible
        }
        else if (props.name === "Wind-Direction"){
            return values.deg
        }
        else{
            return values.pressure
        }
    }
    return (
        <>
            <Paper >
              <img
              src={require(`../images/${src}`).default} 
              alt={name}/>              
              <Typography variant="subtitle1">{name.replace("-"," ")} </Typography>
              <Typography variant="h6">{getValues(name)} {unit}</Typography>
            </Paper>
        </>
    )
}

export default Card
