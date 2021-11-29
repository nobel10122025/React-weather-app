import React , {useState , useEffect} from 'react'
import './App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, indigo } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import temp_felt from './images/temp_felt.png';
import humid from './images/humidity.png';
import wind_speed from './images/wind_speed.png';
import visible from './images/visible.png';
import wind_direction from './images/wind-direction.png';
import air_pressure from './images/air-pressure.png';
import SearchField from './Components/SearchField';

const theme = createTheme({
  palette : {
    secondary: {
      main: '#FFF',
    }
  }
});
function App() {
  const [values , setValues] = useState({})
  const [search , setSearch] = useState('Delhi')

  const getDatafromApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c20892d228d168e22a8fbeb713c0f6c1`;
    const response = await fetch(url);
    const data = await response.json();
    // setValues(data)
    if(data.cod === "404" ){
      alert("City not found. Please enter correct spelling")
      return 
    }
    else if (data.cod === "400"){
      alert("Please enter city name")
      return 
    }
    else{
    const { temp, feels_like, pressure ,humidity  } = data.main;
      let {id, main , description , icon }= data.weather[0];
      let loc_name = data.name;
      let visible = data.visibility ; 
      let { speed ,deg } = data.wind; 
      const newData = {loc_name , temp , humidity , pressure , feels_like , visible , main , description , icon , speed, deg}
      setValues(newData)
    }
  }
  useEffect(()=>{
    getDatafromApi();
  },[])

  const FarenToCelsius = (kelvinTemp) => {
    let celTemp = Math.round(kelvinTemp - 273.15)
    return celTemp
  }
  
  return (
    <div className="pattern-1">
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" textAlign="center" color="secondary" p={2}>Weather App</Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item alignSelf="center">
            <SearchField handleChange={(e)=>(setSearch(e.target.value))} handleSubmit={()=>getDatafromApi()}/>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={6} xs={12}>
            <Typography variant="h2" textAlign="center" color="primary">{values.loc_name}</ Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <Typography variant="h2" color="primary">{`${FarenToCelsius(values.temp)}°C`}</ Typography>
                </Grid>
                <Grid item>
                  <img src = {`http://openweathermap.org/img/wn/${values.icon}@2x.png`} alt="temp-icon"/>
                </Grid>
            </Grid>
            <Typography variant="h5" textAlign="center" color="primary">{values.description}</ Typography>
          </Grid>
        </Grid>
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
            <Paper>
              <img src={temp_felt} alt="temp icon" />
              <Typography variant="subtitle1">Temperature Felt</Typography>
              <Typography variant="h6">{`${FarenToCelsius(values.feels_like)}°C`}</Typography>
            </Paper>
            <Paper >
              <img src={humid} alt=" humidity icon" />
              <Typography variant="subtitle1">Humidity</Typography>
              <Typography variant="h6">{values.humidity}%</Typography>
            </Paper>
            <Paper >
              <img src={wind_speed} alt="wind-speed icon" />
              <Typography variant="subtitle1">Wind Speed</Typography>
              <Typography variant="h6">{values.speed} m/s</Typography>
            </Paper>
            <Paper >
              <img src={visible} alt="visibility icon" />
              <Typography variant="subtitle1">Visibility</Typography>
              <Typography variant="h6">{values.visible} m</Typography>
            </Paper>
            <Paper >
              <img src={wind_direction} alt="wind-dir icon" />              
              <Typography variant="subtitle1">Wind direction</Typography>
            <Typography variant="h6">{values.deg}°</Typography>
            </Paper>
            <Paper >
              <img src={air_pressure} alt="air-pressure icon"/>              
              <Typography variant="subtitle1">Air pressure </Typography>
              <Typography variant="h6">{values.pressure} hPa</Typography>
            </Paper>
          </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default App;
