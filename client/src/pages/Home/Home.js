import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';
import { Container, TextField } from "@mui/material";
import SearchBarTest from '../../components/SearchBar/SearchBar';
import Auth from '../../utils/auth';
import './Home.css'

const Home = () => {

    return (
        <div className="home-container">
            <Slider />
            <div className="hero-text">
                <h1 className="home-header">Welcome to Travelmate</h1>
                <hr className="my-4 bg-white" />
                {Auth.loggedIn() ? (
                    <>
                        <p>Search a departure location to start your journey</p>
                        <SearchBarTest />
                    </>
                ) : (
                    <p> <Link to="/login"> Login </Link> to browse trips</p>
                )}
            </div>
        </div>
    );
}

export default Home;
















