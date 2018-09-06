import React,{ Component } from 'react';
class Weather extends React.Component {
    
    render(){
return(
  <div className ="displaydata">
    {this.props.city && this.props.country&&<p>Location :{this.props.city},{this.props.country}</p>}
    {this.props.temp &&<p> temperature: {this.props.temp}</p>}
    {this.props.humidity &&<p>humidity:{this.props.humidity}</p>}
    {this.props.des && <p>Conditions:{this.props.des} </p>}
    {this.props.error && <p>{this.props.error} </p>}
  </div>

)
}

}

export default Weather;