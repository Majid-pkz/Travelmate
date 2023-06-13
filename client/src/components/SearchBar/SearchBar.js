import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '../../utils/queries';


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import oceanView from '../../assets/oceanView.jpg';
import Auth from '../../utils/auth';
import Trips from '../../pages/Trip';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const  RecipeReviewCard = ({ trip }) =>{
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (


        <Card sx={{ maxWidth: 345, direction:"row",
            justifyContent:"center",
            alignItems:"center", }}>
          <CardHeader variant="body5"  sx={{  }}
            avatar={
              <Avatar sx={{ bgcolor: red[500], width: 60, height: 60  }} aria-label="recipe">
               {trip.creator.firstname}
              </Avatar>
            }
            action={ 
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={ <Typography variant="h4" color="text.secondary">
            {trip.title}
            
          </Typography>}
            subheader="September -Novemeber"
          />
          <CardMedia
            component="img"
            height="194"
            image={oceanView}
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              {trip.description}
              
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes.
              </Typography>
             
            
             
            </CardContent>
          </Collapse>
        </Card>
    
       
      )
        
    };
  


const SearchTrips = () => {

  const [formState, setFormState] = useState({
    departureLocation: '',
  });

  const { loading, error, data } = useQuery(SEARCH_TRIPS, {
    variables: { ...formState },
  });

  const trips = data?.searchTrips || [];
  console.log('trips', trips);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
    console.log('formState', formState);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formState);

    // Perform any necessary actions with the form state
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4 mx-5">
                <input
                  className="form-control"
                  id="departureLocation"
                  type="text"
                  name="departureLocation"
                  value={formState.departureLocation}
                  onChange={handleChange}
                />
              </div>

              {/* Button to search within the search bar */}
              <div className="d-flex justify-content-center mx-5 mb-5">
                <button className="btn btn-outline-dark btn-lg" type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Render the card components with the searched trips */}
      <div>
        <h1>Trips created by Travelers</h1>
        <Grid container spacing={2}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip._id}>
              <RecipeReviewCard trip={trip} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SearchTrips;

