import React from 'react'
import StarRating from './StarRating'

class NewReviewForm extends React.Component {
  constructor(props){
    super(props);
    this.createNewReview = this.createNewReview.bind(this)
    this.createNewReview = this.createNewReview.bind(this)
  }
  state = {
    enterInfo: false,
    rating:0,
  }
  nameRef = React.createRef();
  revRef = React.createRef();
  // linkToImgRef = React.createRef();
 
  handleRating = (x) => { 
    this.setState({rating:x})
  }
  
  createNewReview = () => {
    const newReview = {
      author_name:this.nameRef.current.value, 
      text:this.revRef.current.value, 
      profile_photo_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIp5rxGw-RDahWMjll8IdthIiY-H21h3UyNl8KMDPDTlUNa0lH', 
      rating: this.state.rating      
    }
    // var localPlaces = [...this.props.localPlaces];
    // localPlaces.push(newReview)
    // this.props.handleNewRest(localPlaces)

    this.props.handleRevFormVis(false)
    this.props.handleNewReview(this.props.restaurant.name, newReview)
  }

  render(){
      return (
        <div className="revDimmer">
          <div className='newRevFormWrapp'>
          <form onSubmit={()=>{console.log('sub')}}>
            <div>'New review for {this.props.restaurant.name}'</div>
            <div className="newRestInputFields">
              <input placeholder='Your name' ref={this.nameRef} type="text"/>
              <textarea placeholder='tell us what you thought' ref={this.revRef}/>
              {/* <input placeholder='image URL (if available)' ref={this.linkToImgRef} type="text"/> */}
              <div className='newRestStars'>
                <StarRating handleRating={this.handleRating}/>
              </div>
            </div>
          </form>
          
          <div className="confButtons">
            <button className='formButton' onClick={()=>{this.createNewReview()}}>submit</button>
            <button className='formButton' onClick={()=>{this.props.handleRevFormVis(false)}}>cancel</button>
          </div>
          </div>
        </div>
      )
    
  }
}
export default NewReviewForm