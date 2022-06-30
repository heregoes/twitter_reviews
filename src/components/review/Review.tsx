import dayjs from 'dayjs';
import './review.scss'
import logo from '../../logo.png'
import { Review as ReviewType } from '../../types';

function Review({ data }: {data:ReviewType}) {

  const displayStars = () => {
    const starCount = parseInt(data.stars)
    let stars = [ 
      <div className='card-stars-gray' key={'one'}>&#9733;</div>, 
      <div className='card-stars-gray' key={'two'}>&#9733;</div>, 
      <div className='card-stars-gray' key={'three'}>&#9733;</div>, 
      <div className='card-stars-gray' key={'four'}>&#9733;</div>, 
      <div className='card-stars-gray' key={'five'}>&#9733;</div>
    ]
    for (let i = 0; i < starCount; i++) {
      stars.pop()
      stars.unshift(<div className='card-stars-blue' key={i}>&#9733;</div>)
    }
    return stars
  }

  return (
    <div className='card'>
      <div className="card-container">
        <div className="card-stars">
          {displayStars()}
        </div>
        <h2 className="card-title">{data.title}</h2>
        <div className="card-body">{data.review}</div>
        <div className="card-author">By {data.author}</div>
        <div className="card-date">{dayjs(data.date).format('YYYY')}</div>
      </div>
      <div className="card-footer">
        <div className="card-footer-left">
          <img src={logo} alt='logo' />
          <p>Twitter
            <br />
            <span>Twitter, Inc.</span>
          </p>
        </div>
        <div className="card-footer-right">

        </div>
      </div>
    </div>
  )
}

export default Review