import React from 'react';
import './App.css';
import TopBar from './components/TopBar';
import MapWrapper from './components/MapWrapper'
import BottomSection from './components/BottomSection'
import Place from './sampleDetails.json'
// import ripple from './assets/ripple2.gif'
import LandingPage from './components/LandingPage';

const google = window.google;

class App extends React.Component {
  constructor(props){
    super(props);
    this.initMap = this.initMap.bind(this)
    this.handleMap = this.handleMap.bind(this)
    this.handleStoredDetails = this.handleStoredDetails.bind(this)
    this.handleDetailRequest = this.handleDetailRequest.bind(this)
  }
  state = {
    map:{},
    // pos: {},
    // places: [{name:'Ginos',rating:3.8,vicinity:"Ronda de Valencia, 8, Madrid",opening_hours:{open_now:true},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",geometry:{location:{lat:40.391705,lng:-3.7134189}}}],
    places: [],
    storedDetails:[],
    markers:[],
    currentPlace: Place,
    currentCenter:{},
    loaded:false,
  }
  handleMap(map){
    this.setState({
      map
    })
    // console.log(map)
  }

  handleStoredDetails = (newArray) => {

    this.setState({storedDetails:newArray})
    localStorage.setItem('initialStoredDetails',JSON.stringify(newArray))
    console.log('new details stored')
  } 
  
  handleRecentre = (coords) => {
    this.setState({
      currentCenter: coords
    })
  }

  handlePlaces = (places) => {
    this.setState({
      places: places
    })
  }

  // handleDetails = (details) => {
  //   console.log(details)
  //   // this.setState({
  //   //   currentCenter: details
  //   // })
  // }

  handleDetailRequest = (id, map) => {
    console.log('handleDetailsRequest, ID: ' + id)
    // console.log(id)
    // console.log(map)
    // this.getDeetz(id,this.state.map)
    // console.log(details)

    // this.setState({currentPlace: requestPlace})
  }
  handleMarkers = (markers) => {
    this.setState({
      markers
    })
  }


  

  setInitial = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.initMap);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    }

  initMap = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    this.setState ({
      pos: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    })
  }
  secondStep = () => {
    console.log('state location: lat:' + this.state.pos.lat + 'lng: ' + this.state.pos.lng);
    this.setState({
      loaded: true
    })
    var mainTop = document.querySelector('.innerWrapper').offsetTop;
    window.scrollTo({top: mainTop, behavior: 'smooth'})
    // document.getElementsByName('innerWrapper').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }

  doTheThing = (callback) => {
    navigator.geolocation.getCurrentPosition(pos => {
    console.log(pos.coords)
    this.setState({
      pos: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
    })
    callback()
  })}

  componentDidMount() {
    const initialStoredDetailas = JSON.parse(localStorage.getItem('initialStoredDetails')) ? JSON.parse(localStorage.getItem('initialStoredDetails')) : 
    [{id:1,details:{thing:'nothing to see here'}}];
    this.setState({storedDetails:initialStoredDetailas})
    this.doTheThing(this.secondStep)
  }

  render() {

      return(
     <div className='appWrapper'>
       < LandingPage> ></LandingPage>
       <div className='innerWrapper'>
         
        <TopBar ></TopBar>
        <MapWrapper 
        handleDetailRequest={this.handleDetailRequest}
        places={this.state.places}
        pos={this.state.pos} 
        handleRecentre={this.handleRecentre}
        handleDrag={this.handleDrag} 
        handlePlaces={this.handlePlaces}
        handleMarkers={this.handleMarkers}
        handleMap={this.handleMap}
        markers={this.state.markers}
        map={this.state.map}
        currentPlace={this.currentPlace}
        storedDetails={this.state.storedDetails}
        handleStoredDetails={this.handleStoredDetails}
        // currentCenter={this.state.currentCenter}
        // getIDs={this.getIDs} 
        >
         
        </MapWrapper>
       </div>
      <BottomSection></BottomSection>
      {/* <ReviewsWrapper></ReviewsWrapper> */}
      
     </div> 
    )
  }
}

export default App;
