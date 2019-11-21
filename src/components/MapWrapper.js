import React from 'react';
import MapComp from './Map'
import RightBar from './RightBar'
import NewRestForm from './newRestForm'
import ripple from '../assets/ripple2.gif'

class MapWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormVis=this.handleFormVis.bind(this)
    this.state = {
      pos: {},
      loaded: false,
      showForm: false,
      localPlaces: [],
      newLocation:{},
      commsError: false,
    }
  }
  handleCommsError = (status) =>{
    this.setState({commsError:status})
  }
  handleFormVis = (x, y) => {
    this.setState({
      showForm: x,
      newLocation: y,
    })
  }
  handleNewRest = (localPlaces) => {
    this.setState({localPlaces})
  }
  
  render() {

    if(this.props.pos && this.props.mapCenter ){
      return(
        <React.Fragment >
          <div className='outerMapWrapp'>
          {this.state.commsError ? <div className='commsError'><p>
            failed to load location information
          </p> <p>
            please drag map to recenter
          </p></div> : null}
            
          {this.state.showForm ? <NewRestForm 
          localPlaces={this.state.localPlaces}
          handleNewRest={this.handleNewRest}
          places={this.props.places}
          handlePlaces={this.props.handlePlaces}
          handleFormVis={this.handleFormVis}
          newLocation={this.state.newLocation}
          heyo={this.heyo}/> 
          : null}
          <div className="mapInnerWrapper">
          <div className="RightBar" id='RightBar'>
            <RightBar
              localPlaces={this.state.localPlaces} 
              places={this.props.places} 
              storedDetails={this.props.storedDetails}
              handleStoredDetails={this.props.handleStoredDetails}
              markers={this.props.markers} 
              handleDetailRequest={this.props.handleDetailRequest}
              handleCurrentPlace={this.props.handleCurrentPlace} 
              map={this.props.map} 
              currentPlace={this.props.currentPlace}
              showBottomSection={this.props.showBottomSection}>
            </RightBar>
          </div>
          <MapComp 
          className='Map'
          handleCommsError={this.handleCommsError}
          mapCenter={this.props.mapCenter}
          localPlaces={this.state.localPlaces}
          handleFormVis={this.handleFormVis}
          showForm={this.state.showForm}
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