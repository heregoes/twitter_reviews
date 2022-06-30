import Review from '../review/Review'
import './reviews.scss'
import type { Review as ReviewType } from '../../types';

function Reviews({data}:{ data: ReviewType[]}) {
  return (
    <div className='reviews'>
        { data.map((item: ReviewType) => <Review key={item.id} data={item} />)}
    </div>
  )
}

export default Reviews