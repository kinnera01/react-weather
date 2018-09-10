import React, {
  Component
} from 'react';
import './App.css';
import Titles from './components/titles';
import Form from './components/Form';
import Weather from './components/Weather';
import PlacesAutocomplete from 'react-places-autocomplete';
const APIKey="a40aaeafb4db893633d88ab53b62487b"
//const APIKey = "166a433c57516f51dfab1f7edaed8413";
class App extends Component {
  state = {
    temperature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",

  }
  componentDidUpdate = () => {

    switch (this.state.description) {
      case "Thunderstorm":
        document.body.style.backgroundImage = 'url("https://images6.alphacoders.com/459/thumb-1920-459669.jpg")';
        break;
      case "Rain":
        document.body.style.backgroundImage = 'url("https://i2.wp.com/wallur.com/wp-content/uploads/2016/12/rain-background-4.jpg?fit=1920%2C1080")';
        break;
      case "Drizzle":
        document.body.style.backgroundImage = 'url("http://viewpk.blogspot.com/2014/02/hd-rainy-wallpapers-best-rainy-desk-top.html")';
        break;
      case "Snow":
        document.body.style.backgroundImage = 'url("https://i.ytimg.com/vi/pJAocjVxoO0/maxresdefault.jpg")';
        break;
      case "Atmosphere":
        document.body.style.backgroundImage = 'url("https://wallpaperstudio10.com/static/wpdb/wallpapers/3840x2160/176526.jpg")';
        break;
      case "Clear":
        document.body.style.backgroundImage = 'url("https://wallup.net/wp-content/uploads/2016/02/18/243819-nature-flowers-dandelion-clear_sky-748x421.jpg")';
        break;
      case "Clouds":
        document.body.style.backgroundImage = 'url("https://ak4.picdn.net/shutterstock/videos/204784/thumb/1.jpg")';
        break;
    }
  };
  getWeather = async (e) => {
    e.preventDefault();
   // alert(e.target.elements.city.value)
    let city;
    let val = e.target.elements.city.value.split(",");
    if (val.length > 3) {
      let city = val.slice(-3);
      city = city.map(el => el.trim());
      city=city.join();
      //alert(city)
      console.log('http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}')
      const weatherapi = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`);  
      const data = await weatherapi.json();
      console.log(data.main.temp)
      if (city) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].main,
        })
        //}
      } else {
        this.setState({
          temperature: "",
          city: "",
          country: "",
          humidity: "",
          description: "",
          error: "please enter city and country"
        })
      }
      //const country=e.target.elements.country.value;  

    } else {
      city = e.target.elements.city.value;
      const weatherapi = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`);
      const data = await weatherapi.json();
      if (city) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].main,
        })
        //}

      } else {
        this.setState({
          temperature: "",
          city: "",
          country: "",
          humidity: "",
          description: "",
          error: "please enter city and country"
        })
      }
    } 
  };

   

  render() {
  
    return (
      <div className="App" >
     
      <Titles />
  
      <Form  getWeather={this.getWeather}/>
      <Weather temp={this.state.temperature}city={this.state.city}country={this.state.country} humidity={this.state.humidity} des={this.state.description} error={this.state.error}/>
      
      </div>
    );
  }
}

export default App;
