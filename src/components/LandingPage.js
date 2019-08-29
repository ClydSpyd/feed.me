import React from 'react';
import loadLogo from '../assets/logo-load.png'


class LandingPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchLocation: {}
    }
    this.submitSearchLocation=this.submitSearchLocation.bind(this)
  }

  submitLocation = () => {
    this.props.handleLocation(this.props.userLoc)
    this.props.handleCenter(this.props.userLoc)
  }

  submitSearchLocation = (object) => {
    // setTimeout(this.props.handleLocation.bind(null, this.props.userLoc), 650)
    this.props.handleLocation(this.props.userLoc)
    this.props.handleCurrentPlace({})
    this.setState({searchLocation:object})
    this.props.handleCenter({lat:object.geometry.location.lat(),lng:object.geometry.location.lng()})
    console.log('lat: '+ object.geometry.location.lat())
    console.log('lng: '+ object.geometry.location.lng())
  }
  submitSearchLocationButton = () => {
    this.props.handleLocation(this.props.userLoc)
  }

  componentDidMount(){

    const google=window.google
    var input = document.getElementById('searchTextInput')
    var autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', () => {
      this.submitSearchLocation(autocomplete.getPlace())
    })
  }
  render() {
    return (
      <div className="landingPage">
             <img className="landingLogo" alt='' src={loadLogo} />
             <form action="">
               <input type="text" name="searchTextInput" id="searchTextInput" placeholder='enter city / town / neighbourhood'/>
               <label className='searchLabel' htmlFor="searchTextInput" onClick={this.submitSearchLocationButton}>search</label>
             </form>
             <button id='nearMeButton'type="button" onClick={this.submitLocation}>search near me</button>
       </div>
    )
  }
}
export default LandingPage