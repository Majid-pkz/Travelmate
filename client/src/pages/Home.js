import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRIP } from '../utils/queries'; 

const TripCard = ({ trip }) => {
  return (
    <div className="card">
      <h3>{trip.title}</h3>
      <p>Destination: {trip.destination}</p>
      <p>Description: {trip.description}</p>
      <p>Creator: {trip.creator._id}</p>
      <p>Creator: {trip.creator.username}</p>
      
    </div>
  );
};

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_TRIP);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { trips } = data;

  return (
    <div>
      <h1>Trips</h1>
      <div className="card-container">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Home;






















// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS,QUERY_TECH} from '../utils/queries';

// const Home = () => {
//   const { loading, data } = useQuery(QUERY_TECH, {
//     fetchPolicy: "no-cache"
//   });

//   const matchupList = data?.tech || [];

//   return (
//     <div className="card bg-white card-rounded w-50">
//       <div className="card-header bg-dark text-center">
//         <h1>{matchupList[1].title}</h1>
//       </div>
//       <div className="card-body m-5">
//         <h2>Here is a list of trips:</h2>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <ul className="square">
//             {matchupList.map((matchup) => {
//               return (
//                 <li key={matchup._id}>
//                  <p>{matchup.title} </p>
                    
                
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
   
//     </div>
//   );
// };

// export default Home;
