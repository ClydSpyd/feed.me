import React from 'react'
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

var stars = [halfStar,oneStar,twoStars,threeStars,fourStars,fiveStars]


class Review extends React.Component{

  render(){
    return (
      <div className='reviewWrapper'>
        <div className="revLeft">
          {/* <div className='leftInner'> */}
            <img className = 'reviewImage'src={this.props.details.profile_photo_url} alt="" srcset=""/>
            <p className='revUser'>{this.props.details.author_name}</p>
        {this.props.details.rating ? <img className='starsIconRev' src={stars[this.props.details.rating]} alt="" srcSet=""/> : null}
          {/* </div> */}
        </div>
        <div className="right">
          <p>{this.props.details.text}</p>
        </div>
      </div>
    )
  }
}

export default Review