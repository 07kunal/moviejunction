import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CustomPagination from '../../component/Pagination/CustomPagination';
import SingleContent from '../../component/SingleContent/SingleContent';
import Genres from '../../component/Genres';
import useGenres from '../../hooks/useGenre';

function Series() {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(50);
  // creating the state for the selected Genres
  const [selectedGenres, setSelectedGenres] = useState([]);
  // for the regular generes
  const [genres, setGenres] = useState([]);
  const genreforURl = useGenres(selectedGenres)


  const fetchMovies = async () => {
    const { data } = await axios.get(`
  https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURl}`);

    // console.log(data.total_pages) 
    setContent(data.results);
    // setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genreforURl])


  return (
    <div>

      <span className="pageTitle">Tv Series</span>

      <Genres

        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
        className="act-fool"

      />
      <div className="trending">
        {/* checking whether the data is exist or not */}
        {content && content.map((c) => {
          return <SingleContent key={c.id}
            // sending data whatever required in card(component)

            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type="tv"
            vote_average={c.vote_average}



          />;
        })}
      </div>
      {/* custom-pagination  */}
      {/* passing setPage as props */}
      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
    </div>
  )
}

export default Series