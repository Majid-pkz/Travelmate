import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '../utils/queries';

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
import AuthService from '../utils/auth';

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

const RecipeReviewCard = ({ trip }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, direction: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <CardHeader
        variant="body5"
        sx={{}}
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 60, height: 60 }} aria-label="recipe">
            {trip.creator.firstname}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h4" color="text.secondary">
            {trip.title}
          </Typography>
        }
        subheader="September - November"
      />
      <CardMedia component="img" height="194" image={oceanView} alt="Paella dish" />
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
          <Typography paragraph>Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Trips = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  const { loading, error, data } = useQuery(SEARCH_TRIPS, {
    variables: { departureLocation: searchQuery },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { searchTrips } = data;

  if (searchTrips.length === 0) {
    return <p style={{color: 'var(--orange)', fontSize: '35px', textAlign: 'center', paddingTop: '2rem'}}>No trips found. Try Again!</p>;
  }

  return (
    <div>
      <h1>Trips created by Travelers</h1>
      <Grid container spacing={2}>
        {searchTrips.map((trip) => (
          <Grid item xs={12} sm={6} md={4} key={trip._id}>
            <RecipeReviewCard trip={trip} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Trips;


