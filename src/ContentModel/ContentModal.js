import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ContentModal.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from './Carousel/Carousel'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: "80%",

    bgcolor: '#39445a',
    border: '1px solid #282c34',
    borderRadius: '10',
    color: "#fff",
    padding: '10px 10px 3px',
    boxShadow: 24,
    p: 4,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState()


    // for data 
    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
    }

    // for video content 
    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        console.log(data);
        setVideo(data.results[0]?.key);
    }


    // for calling the function we can take the help from the useEffect hooks 

    useEffect(() => {
        fetchData();
        fetchVideo();

        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <div onClick={handleOpen} className='media' type='button' style={{ cursor: "pointer" }} color="inherit">{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content &&
                        (


                            <Box sx={style}>
                                <div className="contentModal">
                                    <img src={content.poster_path ? ` ${img_500}/${content.poster_path}` : unavailable} className='contentModal_portrait' alt={content.name || content.tittle} />

                                    <img src={content.poster_path ? ` ${img_500}/${content.backdrop_path}` : unavailable} className='contentModal_landscape' alt={content.name || content.tittle} />
                                    <div className='contentModal_about'>
                                        <span className="contentModal_title">
                                            {content.name || content.title} (
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                "-----"
                                            ).substring(0, 4)}
                                            )
                                        </span>

                                        {/* adding description */}
                                        {content.tagline && (
                                            <i className='tagline'>{content.tagline}</i>
                                        )}

                                        <span className="contentModal_description">
                                            {content.overview}
                                        </span>
                                        <div>
                                            {/* carousel overhere */}
                                            <Carousel media_type={media_type} id={id} />
                                        </div>

                                        <Button
                                            variant="contained"
                                            startIcon={<YouTubeIcon />}
                                            color="secondary"
                                            target="__blank"
                                            href={`https://www.youtube.com/watch?v=${video}`}
                                        >
                                            Watch the Trailer
                                        </Button>


                                    </div>


                                </div>
                            </Box>
                        )
                    }
                </Fade>
            </Modal>
        </div>
    );
}
