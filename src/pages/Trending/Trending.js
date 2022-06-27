import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import SingleContent from '../../component/SingleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../component/Pagination/CustomPagination';

const Trending = () => {

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);



  const fetchTrending = async () => {
    // destructuring the api into data. 
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    // console.log(data.results);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page])
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {/* checking whether the data is exist or not */}
        {content && content.map((c) => {
          return <SingleContent key={c.id}
            // sending data whatever required in card(component)

            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}



          />;
        })}
      </div>
      {/* custom-pagination  */}
      {/* passing setPage as props */}
      <CustomPagination setPage={setPage} />
    </div>
  )
}

export default Trending