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
    this.handleLocation = this.handleLocation.bind(this)
    this.handleMap = this.handleMap.bind(this)
    this.handleStoredDetails = this.handleStoredDetails.bind(this)
    this.handleNewReview = this.handleNewReview.bind(this)
  }
  state = {
    map:{},
    // pos: {},
    // places: [{name:'Ginos',rating:3.8,vicinity:"Ronda de Valencia, 8, Madrid",opening_hours:{open_now:true},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",geometry:{location:{lat:40.391705,lng:-3.7134189}}}],
    places: [],
    storedDetails:[],
    markers:[],
    // currentPlace: {
    //   "formatted_phone_number": "690 95 13 66",
    //   "name": "Croquetería Ven y verás",
    //   "opening_hours": {
    //     "open_now": true,
    //     "periods": [
    //       {
    //         "close": {
    //           "day": 1,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 0,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       },
    //       {
    //         "close": {
    //           "day": 3,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 2,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       },
    //       {
    //         "close": {
    //           "day": 4,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 3,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       },
    //       {
    //         "close": {
    //           "day": 5,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 4,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       },
    //       {
    //         "close": {
    //           "day": 6,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 5,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       },
    //       {
    //         "close": {
    //           "day": 0,
    //           "time": "0200",
    //           "hours": 2,
    //           "minutes": 0
    //         },
    //         "open": {
    //           "day": 6,
    //           "time": "0800",
    //           "hours": 8,
    //           "minutes": 0
    //         }
    //       }
    //     ],
    //     "weekday_text": [
    //       "Monday: Closed",
    //       "Tuesday: 8:00 AM – 2:00 AM",
    //       "Wednesday: 8:00 AM – 2:00 AM",
    //       "Thursday: 8:00 AM – 2:00 AM",
    //       "Friday: 8:00 AM – 2:00 AM",
    //       "Saturday: 8:00 AM – 2:00 AM",
    //       "Sunday: 8:00 AM – 2:00 AM"
    //     ]
    //   },
    //   "reviews": [
    //     {
    //       "author_name": "Kimball Johnson",
    //       "author_url": "https://www.google.com/maps/contrib/102980748989435469403/reviews",
    //       "language": "en",
    //       "profile_photo_url": "https://lh3.googleusercontent.com/-yeVRyciFO3I/AAAAAAAAAAI/AAAAAAAAIvc/oFH7MAaEXbY/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
    //       "rating": 5,
    //       "relative_time_description": "a year ago",
    //       "text": "Left the museum restaurant because it's way too fancy and expensive. The shop was very close and the food was really good. A full meal that filled me up cost less than one course at the Museum restaurant.",
    //       "time": 1516189509
    //     },
    //     {
    //       "author_name": "Jimmy Isaac Ventura Salcedo",
    //       "author_url": "https://www.google.com/maps/contrib/104452367844243832407/reviews",
    //       "language": "en",
    //       "profile_photo_url": "https://lh6.googleusercontent.com/-ncuk9hieMF4/AAAAAAAAAAI/AAAAAAAAMgw/oD9mIY7teD8/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
    //       "rating": 5,
    //       "relative_time_description": "a year ago",
    //       "text": "The Croquetas are amazing. The free tapas are quite good and the service is great",
    //       "time": 1502867222
    //     },
    //     {
    //       "author_name": "ρόε Μον",
    //       "author_url": "https://www.google.com/maps/contrib/107596823714298738337/reviews",
    //       "language": "en",
    //       "profile_photo_url": "https://lh4.googleusercontent.com/-5CWh2bEMPpQ/AAAAAAAAAAI/AAAAAAAABB0/ljnvAzK5Oj0/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
    //       "rating": 4,
    //       "relative_time_description": "2 years ago",
    //       "text": "Always a good option if you're looking for home accessories, decorations, small furniture,table dressing, bed dressing, anything like that they have some really cool storage boxes too, that come in different patterns and sizes, and the nicest kitchen ware around. At sensible prices.",
    //       "time": 1480344115
    //     },
    //     {
    //       "author_name": "Ivan Sarabia",
    //       "author_url": "https://www.google.com/maps/contrib/107890769183997740329/reviews",
    //       "language": "en",
    //       "profile_photo_url": "https://lh4.googleusercontent.com/-htiEFcGT3-o/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rev7vksf9yKrmZpTKvgwpe__guiWQ/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
    //       "rating": 4,
    //       "relative_time_description": "2 years ago",
    //       "text": "Tasty croquetas that were made in house with interesting combinations. Good price, good beer ",
    //       "time": 1484741346
    //     },
    //     {
    //       "author_name": "Sofia Singh",
    //       "author_url": "https://www.google.com/maps/contrib/107445602549838842020/reviews",
    //       "language": "en",
    //       "profile_photo_url": "https://lh6.googleusercontent.com/-xG8xdEk4xMo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reLiwklG2nKC8qki6XrNMlYsYvncw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
    //       "rating": 1,
    //       "relative_time_description": "2 years ago",
    //       "text": "The guy serving was in a hurry all the time but the service was slow as hell, even though there was only one other table occupied at the time. He came, asked for our drinks and my dad couldn't understand so he turned around and left to go smoke and for the next 20 minutes he kept doing that and being rude as hell! After we all order we waited for what seemed like hours while he came and went to smoke and as the plates came (all at different times) it was ok sandwiches, nothing spectacular but after all the waiting he comes and asks me what I had order, even though he had the electronic order app, which he was really slow with (writing the order down would have been much faster)!! So basically I waited hours for rude service and an ok toast...",
    //       "time": 1481910815
    //     }
    //   ],
    //   "website": "http://www.venyveras.es/",
    //   "html_attributions": []
    // },
    currentCenter:{},
    mapCenter:{},
    loaded:false,
  }

  // handleLocation = (location) => {
  //   this.setState({pos:location})
  //   console.log('location')
  // }

  handleMap(map){
    this.setState({
      map
    })
  }

  handleNewReview = (inQuestion, review) =>{
    var stored = this.state.storedDetails
    stored.forEach(placeInStorage =>{
      if (placeInStorage.details.name !== inQuestion){
        console.log(placeInStorage.details.name)
      }else {
        placeInStorage.details.reviews.push(review)
        // console.log(stored)
        // this.setState({storedDetails:stored})
        this.handleStoredDetails(stored)
      }
    })
    // console.log(inQuestion)
    // console.log(review)
    // console.log(stored)
  }

  handleStoredDetails = (newArray) => {
    this.setState({storedDetails:newArray})
    localStorage.setItem('initialStoredDetails',JSON.stringify(newArray))
    console.log('new details stored')
  } 

  handleRecentre = (coords) => {
    this.setState({
      currentCenter: coords,
    })
  }
  handleMapCentre = (coords) => {
    this.setState({
      mapCenter: coords
    })
  }
  handlePlaces = (places) => {
    this.setState({
      places: places
    })
  }
  handleCenter = (object) => {
    this.setState({mapCenter:object})
  }
  handleCurrentPlace = (place) => {
    this.setState({
      currentPlace:place
    })
  }
  handleLocation = (location) => {
    this.setState({
      pos: location
    })
    

    setTimeout(()=>{
      var mainTop = document.querySelector('.innerWrapper').offsetTop;
      window.scrollTo({top: mainTop, behavior: 'smooth'})
    }, 650)
    // console.log(location)
  }
  handleMarkers = (markers) => {
    this.setState({
      markers
    })
  }

  secondStep = () => {
    // console.log('state location: lat:' + this.state.userLoc.lat + 'lng: ' + this.state.userLoc.lng);
    this.setState({
      loaded: true
    })
  }

  doTheThing = (callback) => {
    navigator.geolocation.getCurrentPosition(pos => {
    // console.log(pos.coords)
    this.setState({
      userLoc: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      },
    })
    callback()
  })}

  componentDidMount() {
    const initialStoredDetailas = JSON.parse(localStorage.getItem('initialStoredDetails')) ? JSON.parse(localStorage.getItem('initialStoredDetails')) : 
    [];
    this.setState({storedDetails:initialStoredDetailas})
    this.doTheThing(this.secondStep)
  }

  render() {

      return(
     <div className='appWrapper'>
       < LandingPage 
        map = {this.props.map}
        handleCurrentPlace={this.handleCurrentPlace}
        handleLocation={this.handleLocation}
        handleCenter={this.handleCenter}
        userLoc = {this.state.userLoc} /> 
       <div className='innerWrapper'>
         
        
        <MapWrapper 
        handleDetailRequest={this.handleDetailRequest}
        places={this.state.places}
        pos={this.state.pos} 
        handleRecentre={this.handleRecentre}
        handleMapCentre={this.handleMapCentre}
        handleDrag={this.handleDrag} 
        handlePlaces={this.handlePlaces}
        handleMarkers={this.handleMarkers}
        handleLocation={this.handleLocation}
        handleMap={this.handleMap}
        markers={this.state.markers}
        mapCenter={this.state.mapCenter}
        map={this.state.map}
        handleCurrentPlace={this.handleCurrentPlace}
        currentPlace={this.currentPlace}
        storedDetails={this.state.storedDetails}
        handleStoredDetails={this.handleStoredDetails}
        // currentCenter={this.state.currentCenter}
        >
         
        </MapWrapper>
       </div>
      <div className="bottomWrapper" id="bottomWrapper">
        <BottomSection 
        handleNewReview={this.handleNewReview}
        storedDetails={this.state.storedDetails}
        currentPlace={this.state.currentPlace}
        ></BottomSection>
      </div>
      {/* <ReviewsWrapper></ReviewsWrapper> */}
      
     </div> 
    )
  }
}

export default App;
