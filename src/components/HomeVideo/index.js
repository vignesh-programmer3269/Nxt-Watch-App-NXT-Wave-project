import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const HomeVideo = props => {
  const {videoDetail} = props
  const {id, title, channel, viewCount, publishedAt, thumbnailUrl} = videoDetail
  const formatedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  })
  const [first, ...rest] = formatedDate.split(' ')

  return (
    <Link to={`/videos/${id}`} className="link">
      <div className="home-video">
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div className="video-detail">
          <img src={channel.profileImageUrl} alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{channel.name}</p>
            <p>
              {viewCount} views • {rest.join(' ')}
            </p>
            <p>
              {channel.name} • {viewCount} views • {rest.join(' ')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HomeVideo
