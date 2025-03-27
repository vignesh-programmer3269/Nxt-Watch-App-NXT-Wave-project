import {Link} from 'react-router-dom'

import './index.css'

const GamingVideo = props => {
  const {videoDetail} = props
  const {id, title, viewCount, thumbnailUrl} = videoDetail

  return (
    <Link to={`/videos/${id}`} className="link">
      <div className="gaming-video">
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div className="gaming-video-detail">
          <p>{title}</p>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </div>
    </Link>
  )
}

export default GamingVideo
