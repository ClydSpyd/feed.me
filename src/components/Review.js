import React from 'react'

class Review extends React.Component{
  render(){
    return (
      <div className='reviewWrapper'>
        <div className="revLeft">
          <div className='leftInner'>
            <img className = 'reviewImage'src={this.props.details.profile_photo_url} alt="" srcset=""/>
            <p className='revUser'>{this.props.details.author_name}</p>
          </div>
        </div>
        <div className="right">
          <p>{this.props.details.text}</p>
        </div>
      </div>
    )
  }
}

export default Review