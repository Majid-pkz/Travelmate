import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import { Container, TextField } from "@mui/material";
import Auth from '../../utils/auth';
import './Home.css'

const Home = () => {
    return (
        <div className="home-container">
            <Slider />
            <div className="hero-text">
                <h1 className="home-header">Welcome to Travelmate</h1>
                <hr className="my-4" />
                {Auth.loggedIn() ? (
                    <>
                <p>Search below to start your journey</p>
                <Container maxWidth="md" sx={{ mt: 1 }}>
                    <TextField type="search" id="filled-basic" label="Search" variant="filled" sx={{ width: 750 }} style={{color:'white'}} />
                </Container>
                </>
                ) : (
                    <p>Login to browse trips</p>
                    
                )}
            </div>
        </div>
    );
}

export default Home;















