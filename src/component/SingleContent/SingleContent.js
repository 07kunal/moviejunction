import React from 'react';
import { img_300, unavailable } from '../../config/config';
import './SingleContent.css';
import { Badge } from '@mui/material';
import ContentModal from '../../ContentModel/ContentModal';


function SingleContent({
  //  destructuring the all data fetch from the api
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,

}) {
  return (
    // <div className='media'>
    <>



      <ContentModal media_type={media_type} id={id}>

        <Badge badgeContent={vote_average} color={vote_average > 7 ? "primary" : "secondary"} />
        <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <b className="title">{title}</b>
        <span className='subTitle'>{media_type === "tv" ? "Tv series" : "Movie"}
          <span className="subTitle">
            {date}
          </span>
        </span>


        {/* </div> */}
      </ContentModal>
    </>
  )
}

export default SingleContent