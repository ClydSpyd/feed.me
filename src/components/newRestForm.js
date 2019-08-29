import React from 'react'
import StarRating from './StarRating'

class NewRestForm extends React.Component {
  constructor(props){
    super(props);
    this.createNewRestaurant=this.createNewRestaurant.bind(this)
    this.onChange=this.onChange.bind(this)
  }
  state = {
    enterInfo: false,
    rating:0,
  }
  nameRef = React.createRef();
  restNameRef = React.createRef();
  addressRef = React.createRef();
  revRef = React.createRef();
  // linkToImgRef = React.createRef();
  handleRating = (x) => { 
    this.setState({rating:x})
  }

  onChange = (e) => {
    e.target.classList.remove('red')
  }

  createNewRestaurant = () => {

    if (this.nameRef.current.value === ''){
      document.getElementById('yourName').placeholder = 'please enter your name'
      // document.getElementById('yourName').placeholder.style.color = 'red'
      document.getElementById('yourName').classList.toggle('red')
    } 
    if (this.restNameRef.current.value === ''){
      document.getElementById('restName').placeholder = 'please enter restaurant name'
      document.getElementById('restName').classList.add('red')
    }
    if (this.addressRef.current.value === ''){
      document.getElementById('restAdd').placeholder = 'please enter restaurant address'
      document.getElementById('restAdd').classList.add('red')
    }
    if (this.revRef.current.value === ''){
      document.getElementById('revTxtInput').placeholder = 'please tell us what you thought of the restaurant'
      document.getElementById('revTxtInput').classList.add('red')
    }
    if( this.restNameRef.current.value!='' && this.nameRef.current.value!='' && this.addressRef.current.value!='' && this.revRef.current.value!=''){
    const newRestaurant = {
      author: this.nameRef.current.value,
      name: this.restNameRef.current.value,
      vicinity: this.addressRef.current.value,
      reviews:[{author_name:this.nameRef.current.value, text:this.revRef.current.value, profile_photo_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIp5rxGw-RDahWMjll8IdthIiY-H21h3UyNl8KMDPDTlUNa0lH', rating: this.state.rating}],
      geometry: {location:this.props.newLocation},
      id: `${this.restNameRef.current.value}DIV`,
      rating: this.state.rating,
      
    }
    var localPlaces = [...this.props.localPlaces];
    localPlaces.push(newRestaurant)
    this.props.handleNewRest(localPlaces)

    this.props.handleFormVis(false)}
  }

  render(){
    if(this.state.enterInfo){
      return (
        <div className="mapDimmer">
          <div className='newRestFormWrapp'>
          <form onSubmit={()=>{console.log('sub')}}>
            <div className="newRestInputFields">
              <input onChange={this.onChange} id='yourName' placeholder='Your name' ref={this.nameRef} type="text"/>
              <input onChange={this.onChange} id='restName' placeholder='Restaurant name' ref={this.restNameRef} type="text"/>
              <input onChange={this.onChange} id='restAdd' placeholder='Address' ref={this.addressRef}type="text"/>
              <textarea onChange={this.onChange} id='revTxtInput' placeholder='tell us what you thought' ref={this.revRef}/>
              {/* <input placeholder='image URL (if available)' ref={this.linkToImgRef} type="text"/> */}
              <div className='newRestStars'>
                <StarRating handleRating={this.handleRating}/>
              </div>
            </div>
          </form>
          
          <div className="confButtons">
            <button className='formButton' onClick={()=>{this.createNewRestaurant()}}>submit</button>
            <button className='formButton' onClick={()=>{this.props.handleFormVis(false)}}>cancel</button>
          </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="mapDimmer">
          <div className='newRestConfWrapp'>
            <h4 className="newConfText" >Add new restaurant here?</h4>
            <div className="confButtons">
              <button onClick={()=>{this.setState({enterInfo:true})}}>yes</button>
              <button onClick={()=>{this.props.handleFormVis(false)}}>no</button>
            </div>
          </div>
        </div>
      )
    }
    
  }
}
export default NewRestForm