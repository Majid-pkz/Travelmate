import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILE } from '../utils/queries';
import Upload from '../components/Upload';
import Auth from '../utils/auth';

const PersonalProfile = () => {
  const token = localStorage.getItem('id_token');
  const userData = Auth.getProfile(token);
  const { loading, error, data, refetch } = useQuery(QUERY_PROFILE, {
    variables: { profileUser: userData.data._id },
  });
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('id_token');
    axios.get('/api/images/profile', {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    })
      .then(response => {
        setUser(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { profileUser, age, bio, createdTrips, gender, image, interests, joinedDate, location, tripCount, verified } = data.profile;

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-10 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.8rem' }}>
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <img src={image} alt="Avatar" className="my-5" style={{ width: '150px' }} />
                  <h5 className="card-title">{profileUser.firstname}</h5>
                  <p className="card-text">Web Designer</p>
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6 className="card-title">Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6 className="card-title">Age</h6>
                        <p className="text-muted">{age}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6 className="card-title">Gender</h6>
                        <p className="text-muted">{gender}</p>
                      </div>
                    </div>

                    <h6 className="card-title">Bio</h6>
                    <hr className="mt-0 mb-4" />
                    <p className="card-text"style={{color: 'var(--black)'}}>{bio}</p>

                    <h6 className="card-title">Interests</h6>
                    <hr className="mt-0 mb-4" />
                    <p className="card-text" style={{color: 'var(--black)'}}>{interests.map((interest) => interest.label).join(', ')}</p>

                    <h6 className="card-title">Created Trips</h6>
                    <hr className="mt-0 mb-4" />
                    {createdTrips.map((trip) => (
                      console.log(trip),
                      <div key={trip.title}>
                        <h6 className="card-title">{trip.title}</h6>
                        {/* <p className="card-text" style={{color: 'var(--black)'}}>Travelmate: {trip?.travelmates && trip.travelmates[0].firstname}</p> */}
                      </div>
                    ))}

                    <div className="d-flex justify-content-start">
                      <a href="#!"><i className="fab fa-facebook me-3 fa-lg"></i></a>
                      <a href="#!"><i className="fab fa-twitter me-3 fa-lg"></i></a>
                      <a href="#!"><i className="fab fa-instagram me-3 fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Upload getUserDetails={refetch}/>
    </section>
  );
};

export default PersonalProfile;

