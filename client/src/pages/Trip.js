import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../utils/queries';



import Grid from '@mui/material/Grid';


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

import oceanView from '../assets/oceanView.jpg';
import AuthService from '../utils/auth'; // Import the AuthService

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
// import RecipeReviewCard from './TestCard'

// const TripCard = ({ trip }) => {
//   return (
//     <div className="card">
//       <h3>{trip.title}</h3>
//       <p>Destination: {trip.destination}</p>
//       <p>Description: {trip.description}</p>
//       <p>Creator: {trip.creator._id}</p>
//       <p>Creator: {trip.creator.username}</p>
      
//     </div>
//   );
// };

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





const Home = () => {

    const isLoggedIn = AuthService.loggedIn()
  const { loading, error, data } = useQuery(QUERY_TRIPS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { trips } = data;

  if (isLoggedIn){

  return (
    <div>
      <h1>Trips created by Travellers</h1>
      <Grid container spacing={2}>
        {trips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip._id}>
            <RecipeReviewCard trip={trip} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
        }
        return null
};

export default Home;
