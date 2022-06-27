import * as React from 'react';
import Box from '@mui/material/Box';
import "./MainNav.css";
import { useState, useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
// this will help us to navigate through diff pages 
import {Navigate, useNavigate} from 'react-router-dom';


export default function SimpleBottomNavigation() {
    const Navigate= useNavigate();
    const [value, setValue] = useState(0);


    useEffect(() => {


        if (value === 0) Navigate("/");
        else if (value === 1) Navigate("/movies");
        else if (value === 2) Navigate("/series");
        else if (value === 3) Navigate("/search");


    }, [value , Navigate])

    return (
        <Box sx={{ width: 1, position: "fixed", bottom: 0, backgroundColor: "#2d313a", zIndex: 100, color: "white" }} className="nav">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >

                <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
                <BottomNavigationAction label="Tv Shows" icon={< TvIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );

}
