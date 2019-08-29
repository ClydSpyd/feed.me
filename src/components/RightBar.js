import React from 'react'
// import pic from '../assets/knifeAndFork.png'
import ListItem from './ListItem'

// var listItems = []
class RightBar extends React.Component{
  // state = {
  //   listItems: []
  // }
  render() {
  //   for (var i=0; i<this.props.places.length; i++){
  //     listItems.push(< ListItem place={this.props.places[i]} id={this.props.places[i].id} index={i} />)
  //     this.setState({listItems})
  //   }
    return (

      <div className='rightWrapper'>
        {/* <p className='rightBarTitle'>Good eats in the area:</p> */}
        <div className="listWrapper">
          {this.props.places.map(place => {
            // console.log(place)
            return(
              < ListItem 
                place={place} 
                storedDetails={this.props.storedDetails}
                handleCurrentPlace = {this.props.handleCurrentPlace}
                handleStoredDetails={this.props.handleStoredDetails}
                key={place.place_id} 
                id={place.place_id} 
                markers={this.props.markers} 
                handleDetailRequest={this.props.handleDetailRequest} 
                map={this.props.map}
                currentPlace={this.props.currentPlace}
              />
            )})
          }
          {this.props.localPlaces.map(place => {
            // console.log(place)
            return(
              < ListItem 
                local={true}
                place={place} 
                storedDetails={this.props.storedDetails}
                handleCurrentPlace = {this.props.handleCurrentPlace}
                handleStoredDetails={this.props.handleStoredDetails}
                key={place.id} 
                id={place.id} 
                markers={this.props.markers} 
                handleDetailRequest={this.props.handleDetailRequest} 
                // map={this.props.map}
                currentPlace={this.props.currentPlace}
              />
            )})
          }
        </div>
        {/* {listItems} */}
      </div>
    )
  }
}

export default RightBar;