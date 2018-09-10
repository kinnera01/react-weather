import React,{ Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


class Form extends React.Component {
    state={
      address:""
    }
    handleChange = address => {

      this.setState({ address });

    };
  
    handleSelect = address => {
    
      geocodeByAddress(address)
     // console.log(address)
        .then(results => getLatLng(results[0]))
        
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
      // console.log(results)
      //  this.setState({ results });
    };
    render(){
return(
  <PlacesAutocomplete 
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleChange}
       // searchOptions={{ types: ['locality', 'country'] }}
      >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <form onSubmit={this.props.getWeather}>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
                name:"city"
              })}
            /> <button>Get weather</button></form><div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // // inline style for demonstration purpose
              const style = suggestion.active
                ? { Color: 'white', cursor: 'pointer', fontSize:"20px" }
                : { backgroundColor: 'transparent', color:"black", fontSize:"20px",opacity:"0.5", cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span><i className="fa fa-map-marker" aria-hidden="true"></i><span></span>
{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
}
  {/* // <form onSubmit={this.props.getWeather}>
  //      <input type="text" name="city" placeholder="Enter city"></input>

  //           <input type="text" name="country"  placeholder="Enter country"></input>
  //          

  // </form> 

// )
// }

// }*/}

export default Form;