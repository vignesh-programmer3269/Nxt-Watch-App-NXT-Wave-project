import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const TrendingVideo = props => {
  const {videoDetail} = props
  const {id, title, channel, viewCount, publishedAt, thumbnailUrl} = videoDetail
  const formatedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  })
  const [first, ...rest] = formatedDate.split(' ')

  return (
    <Link to={`/videos/${id}`} className="link">
      <div className="trending-video">
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div className="trending-video-detail">
          <p>{title}</p>
          <p>{channel.name}</p>
          <p>
            {viewCount} views • {rest.join(' ')}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default TrendingVideo
