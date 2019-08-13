import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import customStyles from './customStyles.json'
import samples from '../samples.json'
import markerPin from '../assets/markerPin2.png'
import markerPinHover from '../assets/markerPinHoverPRP2.png'
import ripple from '../assets/ripple2.gif'

const style = {
  width: '100%',
  height: '100%'
}
var restaurants = []
var currentCenter;
const google = window.google;
var markers = []

export class MapComp extends React.Component {
  constructor(props){
    super(props);
    this.dropPinsNotBombs=this.dropPinsNotBombs.bind(this)
    this.getPlaces=this.getPlaces.bind(this)
    this.initiateMap=this.initiateMap.bind(this)
  }
  state = {
    currentCenter: {}
  }

 // ===CREATE MARKER===//
 dropPin = (position, timeout, id, itemID, index,name, map, props) => {
  window.setTimeout(function() {
    markers.push(new google.maps.Marker({
        props:props,
        name:name,
        id:id,
        itemID:itemID,
        index: index,
        position: position,
        map: map,
        icon: markerPin,
        scale:0.2,
      animation: google.maps.Animation.DROP
    }));
  }, timeout);
}

//======DISPLAY MARKERS, ADD LISTENERS TO MARKERS=======//
  dropPinsNotBombs = (map) => {
    for (var i = 0; i < this.props.places.length; i++) {
    var lat
    var lng
    if(isNaN(this.props.places[i].geometry.location.lat)){lat=this.props.places[i].geometry.location.lat()}
    else {lat=this.props.places[i].geometry.location.lat}
    if(isNaN(this.props.places[i].geometry.location.lng)){lng=this.props.places[i].geometry.location.lng()}
    else {lng=this.props.places[i].geometry.location.lng}
    this.dropPin({lat: lat, lng: lng}, i * 50, this.props.places[i].place_id, this.props.places[i].id, i,this.props.places[i].name, map,this.props)}
    this.props.handleMarkers(markers);
    setTimeout(function(map){
      markers.forEach(marker =>{
        var contentString = '';
        var infowindow;
    
        marker.addListener('mouseover', function() {  
        contentString = `<p style='color: blueviolet'>${marker.name}</p>`
        infowindow = new google.maps.InfoWindow({content: contentString});
        infowindow.open(map, marker);
        marker.setIcon(markerPinHover);
        console.log(marker)
        console.log(document.getElementById(marker.itemID))
        document.getElementById(marker.itemID).classList.toggle('zoom')
      });
      
        marker.addListener('mouseout', function() {
        infowindow.close(map, marker);
        marker.setIcon(markerPin)
        document.getElementById(marker.itemID).classList.toggle('zoom')
      });
      
      marker.addListener('click', function(){
        console.log(document.getElementById(marker.itemID))
        var expandedItems = (Array.from(document.querySelectorAll('.itemExpanded')))
        expandedItems.forEach(item => {
          item.click()
        })
        document.getElementById(marker.itemID).click()
        setTimeout(function(){
          var topPos = document.getElementById(marker.itemID).offsetTop;
          document.getElementById('RightBar').scrollTo({top: topPos-9, behavior: 'smooth'})
          // document.getElementById(marker.itemID).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        },250)})
      })
    },900)
  }

  //=====CLEAR MARKERS FROM MAP =====//
  clearMarkers = () => {
    for (let i = 0; i < markers.length; i++) {
      if (markers[i]) {
          markers[i].setMap(null);}
    }
    markers = [];
  }
  
  // ===GET BASIC RESTAURANT DETAILS FROM API AND SET TO APP STATE===//

  getPlaces = (map, mapProps) => {
    this.clearMarkers()
    restaurants=[]
    this.props.handlePlaces(restaurants)
    const places = new window.google.maps.places.PlacesService(map);
    var mapBounds = map.getBounds();
    // var request = { location: {lat: this.state.currentCenter.lat,lng: this.state.currentCenter.lng-0.0002}, radius:50, type: ['restaurant']};
    var request = { bounds: mapBounds, type: ['restaurant']};
    places.nearbySearch(request, callback);

    function callback(results, status) {
    for (var i = 0; i < results.length; i++) 
      {restaurants.push(results[i])}
    }
    setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);

    setTimeout(this.props.handleMarkers.bind(null, markers), 450);
    setTimeout(function(){restaurants=[]}, 700);
  }


  //======LOAD SAMPLES FROM LOCAL JSON, PUSH TO APP STATE========//

  loadSamples = (samples) => {
    for (var i = 0; i < samples.length; i++) {
      restaurants.push(samples[i])}
    setTimeout(this.props.handlePlaces.bind(null, restaurants), 500);
  }

  //======GET CENTER OF MAP AFTER SCROLL========//

  getCenter = (mapProps, map) => {
    let lng = map.center.lng()
    let lat = map.center.lat()
    let coords = {lat,lng}
    this.props.handleRecentre(coords)
    currentCenter=coords;
    this.setState({
      currentCenter
    })
  }


  //====SET CUSTOM MAP STYLES====//

  setStyles = (map) => {
    map.setOptions({
      styles: customStyles
    })
  }

  //=====GET MORE RESTAURANTS/SET CENTER AFTER SCROLL====//
  searchAgain = (mapProps, map) => {
  this.getCenter(mapProps,map)
  this.getPlaces(map)/////<<------COMMENTED OUT TO STOP UNNECESSARY QUERIES DURING DEV
  setTimeout(this.dropPinsNotBombs.bind(null, map), 850);
  // setTimeout(this.props.handleMarkers.bind(null, markers), 1050);
  }


  //==== INITIATE MAP CENTER, STYLES AND NEARBY RESTAURANTS ====//
  initiateMap = (mapProps, map) => {
    // console.log(map)
    this.getCenter(mapProps,map)
    this.setStyles(map)
    this.props.handleMap(map)
    this.setState({currentCenter})
    // setTimeout(this.getPlaces.bind(null, map), 500);/////<<------COMMENTED OUT TO STOP QUERIES DURING DEV

    this.loadSamples(samples)
    setTimeout(this.dropPinsNotBombs.bind(null, map), 800);
  }



    // MAKE DETAIL REQUEST FOR SPECIFIC MARKER ===== //
    handleDetailRequest = (thing) => {
      console.log(thing)
    }

  render() {
  return (
    <Map
      places={this.props.places}
      initialCenter={{lat: this.props.pos.lat, lng:this.props.pos.lng+0.00035}} 
      // initialCenter={{lat: 51.4545, lng:2}} 
      google={this.props.google} 
      zoom={19} 
      style={style} 
      streetViewControl = {false}
      zoomControl= {false}
      fullscreenControl= {false}
      mapTypeControl = {false}
      onClick={this.getCenter}
      onDragend={this.searchAgain}
      onReady={this.initiateMap}
    >
      {/* user location marker */}
      <Marker 
        onClick={this.props.handleMap}
        onMouseover={this.showInfoWindow} 
        onMouseout={this.hideInfoWindow}
        name={'you are here'}
        animation = {google.maps.Animation.DROP}
        position= {this.props.pos}
        icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
       />  
        
    </Map>
  )
  
  }}

export default GoogleApiWrapper({apiKey: ('AIzaSyDlQE9vOQFWaa6ZeidzikJq9Ry0PpO6gzk')})(MapComp)