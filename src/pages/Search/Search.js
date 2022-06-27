import React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Tab } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import axios from 'axios';
import CustomPagination from '../../component/Pagination/CustomPagination';
import SingleContent from '../../component/SingleContent/SingleContent';


function Search() {

  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState();
  const [numOfPages, setNumOfPages] = useState();


  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    }
  })

  //adding logic ..which is 
  // after getting the searchtext we call the api as 
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>

      <ThemeProvider theme={darkTheme}>

        <div style={{ display: "flex", margin: "15px 0px" }}>
          <TextField id="filled-basic" label="Search " className="searchBox" variant="filled" style={{ flex: 1 }}
            onChange={(e) => setSearchText(e.target.value)}

          />
          <Button varient="contained" style={{ marginLeft: 10, background: '#fff', color: "#000" }}
          onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          display="inline"

          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}

          style={{ paddingBottom: 5 }}

        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Tv Series" />

        </Tabs>



      </ThemeProvider>
      {/* adding the content over here */}

      <div className="trending">
        {/* checking whether the data is exist or not */}
        {content && content.map((c) => {
          return <SingleContent key={c.id}
            // sending data whatever required in card(component)

            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}



          />;
        })}
        {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {/* custom-pagination  */}
      {/* passing setPage as props */}
      {numOfPages > 1 && <CustomPagination setPage={setPage} numOfPages={numOfPages} />}
      {/* adding the pagination over here */}

    </div>
  )
}

export default Search