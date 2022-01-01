import React , {useState , useEffect} from 'react'
import './App.css';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SearchField from './Components/SearchField';
import Data from './Components/ComponentList';
import ComponentContent from './Components/ComponentContent';
import Cities from './Components/Cities';
import CityList from './Components/CityList'
import CircularIndeterminate from './Components/Loader';

const theme = createTheme({
  palette : {
    secondary: {
      main: '#FFF',
    }
  }
});
function App() {
  const [cards , setCards] = useState(Data)
  const [values , setValues] = useState({})
  const [search , setSearch] = useState('Delhi')
  const [cityList ,setCityList] = useState(CityList)
  const [toggle , setToggle] =useState(false)
  const [isLoading , setIsLoading]=useState(true)

  const getDatafromApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=c20892d228d168e22a8fbeb713c0f6c1`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data updates")
    setIsLoading(false)
    if(data.cod === "404" ){
      alert("City not found. Please enter correct spelling")
      setToggle(false)
      return 
    }
    else if (data.cod === "400"){
      alert("Please enter city name")
      setToggle(false)
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
      setToggle(false)
    }
  }
  
  useEffect (()=>{
    getDatafromApi();
  },[toggle])

  const FarenToCelsius = (kelvinTemp) => {
    let celTemp = Math.round(kelvinTemp - 273.15)
    return celTemp
  }
  
  const addInList = () => {
    const newCity = {
      id : new Date().getTime().toString(),
      cityName : search
    }
    setCityList([newCity,...cityList])
  } 

  const deleteCity = (index) => {
    let newCityList = cityList.filter((city)=>(city.id!==index))
    setCityList(newCityList)
  }

  const handleSubmitList = (index) => {
    var PrintNewCity = cityList.filter((city)=>(city.id === index))[0].cityName
    setSearch(PrintNewCity)
    setSearch((state)=>{
      // console.log(state)
      return state
    }) 
    setToggle(true)
  }

  return (
      isLoading? (<CircularIndeterminate/>) : 
      (
  <div className="pattern-1">
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Typography variant="h4" textAlign="center" color="secondary" p={2}>Weather App</Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item alignSelf="center">
            <SearchField 
              handleChange={(e)=>(setSearch(e.target.value))} 
              handleSubmit={()=>{getDatafromApi()}}
              addInList = {addInList}
            />
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
        <ComponentContent data = {cards} values = {values}/>
        <Cities 
              cityList={cityList} 
              deleteCity={deleteCity}
              handleSubmitList={handleSubmitList}
            />
      </Container>
    </ThemeProvider>
  </div>
      )
    
  );
}

export default App;
