import React from 'react'
import pic from '../assets/knifeAndFork.png'
import markerPin from '../assets/markerPin.png'
import markerPinHover from '../assets/markerPinHoverPRP.png'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import halfStar from '../assets/stars/0.5TurqB.png'
import oneStar from '../assets/stars/1TurqB.png'
import oneAndStars from '../assets/stars/1.5TurqB.png'
import twoStars from '../assets/stars/2TurqB.png'
import twoAndStars from '../assets/stars/2.5TurqB.png'
import threeStars from '../assets/stars/3TurqB.png'
import threeAndStars from '../assets/stars/3.5TurqB.png'
import fourStars from '../assets/stars/4TurqB.png'
import fourAndStars from '../assets/stars/4.5TurqB.png'
import fiveStars from '../assets/stars/5TurqB.png'

const google = window.google

var  number=0;
var stars = [halfStar,oneStar,oneAndStars,twoStars,twoAndStars,threeStars,threeAndStars,fourStars,fourAndStars,fiveStars]
var that = this

class ListItem extends React.Component {
  constructor(props){
    super(props)
    this.checkForDeetz = this.checkForDeetz.bind(this)
    this.handleDetails = this.handleDetails.bind(this)
    this.click = this.click.bind(this)
    this.getDeetz = this.getDeetz.bind(this)
    this.addItem = this.addItem.bind(this)
    this.state = {
      isExpanded: false,
      numStars:0,
      details:{},
      fromStored: false
    }
  }
  addItem = (id, details) => {
    var array = this.props.storedDetails;
    var newItem = {id:id,details:details};
    console.log(array)
    array.push(newItem);
    console.log(array)
    // console.log('ID: ' + id)
    // console.log(details)
    this.props.handleStoredDetails(array)
  }

  handleDetails = (deetz) => {
    console.log(deetz)
    this.setState({details:deetz})
  }
  test = (thing, thing2) => {
    console.log('TEST ID: ' + thing);
    console.log(thing2)
  }

  checkForDeetz = (id, map) => {
    this.props.storedDetails.forEach(place => {
      if (place.id===id){
        this.setState({details: place.details, fromStored: true})
        console.log('from stored')
      } else {return}
    })
    if(!this.state.fromStored){
      this.getDeetz(id,map)
    }
    // IF FROM STORED IS NOT TRUE this.getDeetz()
    
  }

  getDeetz = (id,map) => {
    var that = this
    var request = {
      placeId: id,
      fields: ['name','formatted_phone_number', 'review', 'opening_hours', 'website']
    }
    var service = new google.maps.places.PlacesService(map)
    console.log('from API')
    service.getDetails(request, callback);
    function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      that.setState({details:place})
      that.addItem(id, place)
      // console.log(id)
      // console.log(that.state.details)
    } else {
      console.log(status)}
    }
  }
  
  
  click = (map) => {
    const passId = this.props.place.place_id
    const myId = this.props.place.id
    const myIdB = this.props.place.id+'B'
    var thisOne = document.getElementById(myId)
    // thisOne.classList.toggle('itemWrapper')
    thisOne.classList.toggle('itemExpanded')
    thisOne.classList.toggle('itemWrapper')
    this.checkForDeetz(passId,this.props.map)
    console.log('passID: '+ passId)
    if (this.state.isExpanded){
      this.setState({isExpanded:false})
        var expandedData = document.getElementById(myIdB)
        expandedData.classList.add('hidden')
  
    }else {
     this.setState({isExpanded:true})
     setTimeout(function(){
      console.log(myIdB)
      var expandedData = document.getElementById(myIdB)
      expandedData.classList.remove('hidden')
    },200)

    }
  }

  stopBounce = (marker) => {
    marker.setAnimation(null)
  }

  enter = () => {
    for(let i=0; i<this.props.markers.length;i++){
      if(this.props.markers[i].id===this._reactInternalFiber.key){
        var marker = this.props.markers[i];
        var contentString = `<p style='color: blueviolet'>${marker.name}</p>`
        marker.setIcon(markerPinHover);
        marker.setAnimation(google.maps.Animation.BOUNCE)
        const myId = this.props.place.id
        var thisOne = document.getElementById(myId)
        thisOne.classList.toggle('zoom')
        setTimeout(this.stopBounce.bind(null, marker), 600);
      }
    }
  }

  leave = () => {
    for(let i=0; i<this.props.markers.length;i++){
      if(this.props.markers[i].id===this._reactInternalFiber.key){
        var marker = this.props.markers[i];
        marker.setIcon(markerPin);
        const myId = this.props.place.id
        var thisOne = document.getElementById(myId)
        thisOne.classList.toggle('zoom')
      }
    }
  }

  setStars = (i) => {
    if(i<=0.5){
      number=0
    }else if (i<=1){
      number=1
    }else if (i<=1.5){
      number=2
    }else if (i<=2){
      number=3
    }else if (i<=2.5){
      number=4
    }else if (i<=3){
      number=5
    }else if (i<=3.5){
      number=6
    }else if (i<=4){
      number=7
    }else if (i<=4.5){
      number=8
    }else if (i<=5){
      number=9
    } else {
      number=10
    }
    return number
  }


  componentDidMount(){
    this.setStars(this.props.place.rating)
    var numStars = number
    this.setState({numStars})
    // var array = this.props.storedDetails;
    // array.push('hai')
    // console.log(array)
  }

  render() {
    if(!this.state.isExpanded){return (
      <div id={this.props.place.id} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.click} className='itemWrapper'>
              <div className="detailsInnerWrap">
                <img className='itemImage'src={pic} alt="" srcSet=""/>
                <div className="itemDetails">
                  <h5 className='itemName'>{this.props.place.name}</h5>
                  <p className='itemLoc'>{this.props.place.vicinity}</p>
                  {/* <p className='itemOpen'>{place.opening_hours.open_now ? 'open now!' : 'closed'}</p> */}
                  {this.props.place.opening_hours ? <p className='itemOpen'>{this.props.place.opening_hours.open_now?'open now!' : 'closed'}</p> : null}
                </div>
              </div>
            </div>
    )}
    else {return (
      <div id={this.props.place.id} onMouseEnter={this.enter} onMouseLeave={this.leave} onClick={this.click} className='itemWrapper'>
          <div className="detailsInnerWrapCol">
            <img className='itemImage'src={pic} alt="" srcSet=""/>
            <div className="itemDetails">
              <h5 className='itemName'>{this.props.place.name}</h5>
              <p className='itemLoc'>{this.state.details.formatted_phone_number}</p>
              <p className='itemLoc'>{this.props.place.vicinity}</p>
              {/* <p className='itemOpen'>{place.opening_hours.open_now ? 'open now!' : 'closed'}</p> */}
              {/* {this.props.place.opening_hours ? <p className='itemOpen'>{this.props.place.opening_hours.open_now?'open now!' : 'closed'}</p> : null} */}
            </div>
          </div >
          <div className='hidden mid' id={this.props.place.id+'B'}>
            <p className='openHoursList'>average user rating:</p>
            <img className='starsIcon' src={stars[this.state.numStars]} alt="" srcSet=""/>
            {this.state.details.reviews ? 
            <div>
            <p className='itemUsername'><a href={this.state.details.reviews[0].author_url}>{this.state.details.reviews[0].author_name}</a> said:</p>
            <p className='reviewText'>"{this.state.details.reviews[0]<=50 ? this.state.details.reviews[0]: this.state.details.reviews[0].text.substring(0,50)+'...'}"</p>
              <a className="itemSite">more user reviews</a>
            </div>
            : null}
                {this.state.details.opening_hours ? 
                <div className="openingTimes">
                  <strong>Opening Hours</strong>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[0]}</p> 
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[1]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[2]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[3]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[4]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[5]}</p>
                  <p className='openHoursList'>{this.state.details.opening_hours.weekday_text[6]}</p> 
                </div>
                : null}
                <div className="siteDiv">
                  <a target='_blank' href={this.state.details.website}className='itemSite'>visit website</a>
                </div>
          </div>
        </div>
      )}
    }
  }


export default ListItem