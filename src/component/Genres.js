import React, { useEffect } from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

const Genres = ({
    setSelectedGenres,
    selectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {

    const handleAdd =(item) =>{
        setSelectedGenres([...selectedGenres , item]);
        setGenres(genres.filter((g)=> g.id !== item.id))
        setPage(1);
    }

    const handleRemove = (item)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=> selected.id !== item.id)
        );
        setGenres([...genres , item]);
        setPage(1);
    }

 


    // fetching the data from the genres field and using all the prop passing as above
    const fetchGenres = async () => {
        const { data } = await axios.get(`
    https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `);

        // console.log(data.genres);
        setGenres(data.genres)
    };
    console.log(genres);
    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres([]);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{ padding: "6px 0px" }}>
          
          {selectedGenres && selectedGenres.map((item) => (
                <Chip label={item.name} key={item.id} style={{margin: "6px 8px"}} size='small' clickable color='primary' 
                onDelete={()=>handleRemove
                (item)}/>

                
            ))}
            {genres && genres.map((item) => (
                <Chip label={item.name} key={item.id} style={{margin: "6px 8px"}} size='small' clickable  
                onClick={() => handleAdd(item)}/>

                
            ))}

        </div>
    )
}

export default Genres