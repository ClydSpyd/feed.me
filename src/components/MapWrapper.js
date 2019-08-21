import React from 'react';
import MapComp from './Map'
import RightBar from './RightBar'
import ripple from '../assets/ripple2.gif'

class MapWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pos: {},
      loaded: false
    }
  }
  
  render() {

    if(this.props.pos && this.props.mapCenter){
      return(
        <React.Fragment>

        <div className="mapInnerWrapper">
        <div className="RightBar" id='RightBar'>
          <RightBar 
            places={this.props.places} 
            storedDetails={this.props.storedDetails}
            handleStoredDetails={this.props.handleStoredDetails}
            markers={this.props.markers} 
            handleDetailRequest={this.props.handleDetailRequest}
            handleCurrentPlace={this.props.handleCurrentPlace} 
            map={this.props.map} 
            currentPlace={this.props.currentPlace}>
          </RightBar>
        </div>
        <MapComp 
        className='Map'
        mapCenter={this.props.mapCenter}
        handleDetailRequest={this.props.handleDetailRequest}
        handleCurrentPlace={this.props.handleCurrentPlace}
        handlePlaces = {this.props.handlePlaces} 
        handleStoredDetails={this.props.handleStoredDetails}
        handleRecentre={this.props.handleRecentre} 
        handleMapCentre={this.props.handleMapCentre} 
        handleMarkers={this.props.handleMarkers}
        handleMap={this.props.handleMap}
        pos={this.props.pos} 
        places={this.props.places}  
        storedDetails={this.props.storedDetails}
        />

       
      </div>
      </React.Fragment>
      )} else{
        return(
          <div className="mapInnerWrapper">
            <div className="mapPlaceholder">
              <img src={ripple} alt="" srcset=""/>
              <span>awaiting geolocation data...</span>
            </div>
          </div>
        )
      }
  }
}

export default MapWrapper  