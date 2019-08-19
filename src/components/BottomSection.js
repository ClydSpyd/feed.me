import React from 'react'
import Review from './Review'

var reviews = []
const deetz = {author_name: 'dave', text: 'blah blah blah'}

class BottomSection extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      reviews:[]
    }
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
      {this.props.currentPlace.reviews.map(review=>{
        return (< Review details={review} />)
      })}
      <div className="addReviewBlock">
        <div className="blockInner">
          <div className='addIcon'>+</div>
          <div className='addReview'>add review</div>
        </div>
      </div>
      </div>
    </div>
    )}else{
      return(
        <div></div>
      )
    }
  }
}

export default BottomSection