import React from 'react'
import Review from './Review'
import NewReviewForm from './newReviewForm'

var reviews = []
const deetz = {author_name: 'dave', text: 'blah blah blah'}

class BottomSection extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      reviews:[],
      formVis: false,
    }
  }
  handleRevFormVis = (x) => {
    this.setState({formVis:x})
  }
  // componentWillUpdate(){
  //   const that = this
  //   if (this.props.currentPlace.reviews){
  //   this.props.currentPlace.reviews.forEach(review => {
  //     reviews.push(review)
  //   })}
  //   console.log(reviews)
  //   setTimeout(function(){
  //     that.setState({loaded:true})
  //   },300)
  // }
  
  render(){
    if(this.props.currentPlace && this.props.currentPlace.reviews){
    return (
    <div className="gridWrap">
      <div className='reviewGrid'>
        {this.state.formVis ? <NewReviewForm handleNewReview={this.props.handleNewReview} restaurant={this.props.currentPlace} handleRevFormVis={this.handleRevFormVis} /> : null}
      {this.props.currentPlace.reviews.map(review=>{
        return (< Review details={review} />)
      })}
    { this.props.currentPlace.reviews.length < 6 ? <div className="addReviewBlock">
        <div className="blockInner">
          <div onClick={()=>{setTimeout(()=>{this.setState({formVis:true})},150)}}className='addIcon'>+</div>
          <div className='addReview'>add review</div>
        </div>
      </div>: null}
      </div> 
    </div>
    )}else{
      return(
        <div className='reviewEmptyDiv'> no reviews to display</div>
      )
    }
  }
}

export default BottomSection