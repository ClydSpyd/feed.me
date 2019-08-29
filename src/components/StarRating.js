import React from 'react'
import zeroStars from '../assets/stars/0TurqB.png'
import oneStar from '../assets/stars/1TurqB.png'
import twoStars from '../assets/stars/2TurqB.png'
import threeStars from '../assets/stars/3TurqB.png'
import fourStars from '../assets/stars/4TurqB.png'
import fiveStars from '../assets/stars/5TurqB.png'

const stars = [zeroStars, oneStar, twoStars, threeStars, fourStars, fiveStars]
// var display = stars[0]

class StarRating extends React.Component{
  state = {
    number:0,
    confirmedNumber:0,
    mouseOver:false,
  }

  click = () =>{
    this.setState({confirmedNumber:this.state.number});
    setTimeout(this.props.handleRating.bind(null, this.state.confirmedNumber), 150);
    // this.props.handleRating(4)
  }

  

  render(){
    return(
      <div class='starRatingWrapper'>
        <div className='zones'>
          <div 
            onMouseEnter={()=>{this.setState({mouseOver:true, number:1})}}
            onMouseLeave={()=>{this.setState({mouseOver:false})}} 
            onClick={()=>{
              this.setState({confirmedNumber:1});
              setTimeout(this.props.handleRating.bind(null, 1), 150);
            }}
            // onClick={()=>{this.setState({confirmedNumber:1})}}
            className='zone'>
          </div>
          <div 
            onMouseEnter={()=>{this.setState({mouseOver:true, number:2})}}
            onMouseLeave={()=>{this.setState({mouseOver:false})}} 
            onClick={()=>{
              this.setState({confirmedNumber:2});
              setTimeout(this.props.handleRating.bind(null, 2), 150);
            }}
            // onClick={()=>{this.setState({confirmedNumber:2})}}
            className='zone'>
          </div>
          <div 
            onMouseEnter={()=>{this.setState({mouseOver:true, number:3})}}
            onMouseLeave={()=>{this.setState({mouseOver:false})}} 
            onClick={()=>{
              this.setState({confirmedNumber:3});
              setTimeout(this.props.handleRating.bind(null, 3), 150);
            }}
            // onClick={()=>{this.setState({confirmedNumber:3})}}
            className='zone'>
          </div>
          <div 
            onMouseEnter={()=>{this.setState({mouseOver:true, number:4})}}
            onMouseLeave={()=>{this.setState({mouseOver:false})}} 
            onClick={()=>{
              this.setState({confirmedNumber:4});
              setTimeout(this.props.handleRating.bind(null, 4), 150);
            }}
            // onClick={()=>{this.setState({confirmedNumber:4})}}
            className='zone'>
          </div>
          <div 
            onMouseEnter={()=>{this.setState({mouseOver:true, number:5})}}
            onMouseLeave={()=>{this.setState({mouseOver:false})}} 
            onClick={()=>{
              this.setState({confirmedNumber:5});
              setTimeout(this.props.handleRating.bind(null, 5), 150);
            }}
            // onClick={()=>{this.setState({confirmedNumber:5})}}
            className='zone'>
          </div>
         
        </div>
        <div><img src={this.state.mouseOver ? stars[this.state.number]: stars[this.state.confirmedNumber]} alt=""/></div>
      </div>
    )
  }

}
export default StarRating;