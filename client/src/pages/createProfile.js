import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import { PROFILE_EXISTS, QUERY_INTEREST } from '../utils/queries';
import '../pages/Style/createProfile.css'
import Auth from '../utils/auth';
import Upload from '../components/Upload';
import Select from 'react-select';


const Profile = () => {
  const [profileExists, setProfileExists] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const handleInterestsChange = (selectedOptions) => {
    setSelectedInterests(selectedOptions);
  };

  const { loading: interestLoading, data: interestData } = useQuery(QUERY_INTEREST);
  const interestOptions = interestData?.interests.map((interest) => ({
    value: interest._id,
    label: interest.label,
  }));
  
  const token = localStorage.getItem('id_token');
  const userData = Auth.getProfile(token);
  const [formState, setFormState] = useState({
    profileUser: userData.data._id,
    location: null,
    gender: null,
    age: null,
    bio: null
  });

  const [createProfile, { error, data }] = useMutation(CREATE_PROFILE);

  const { loading: profileExistsLoading, data: profileExistsData } = useQuery(PROFILE_EXISTS, {
    variables: { profileUser: userData.data._id },
  });

  useEffect(() => {
    if (profileExistsData && profileExistsData.profileExist) {
      console.log('profile exists', profileExistsData);
      setProfileExists(true);
      setRedirectToProfile(true);
    }
  }, [profileExistsData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedInterests[0].value);

    try {
      const { data } = await createProfile({
        variables: {
          ...formState,
          age: formState.age ? parseInt(formState.age) : null,
          interests: selectedInterests.map((interest) => interest.value), // Include selected interests in the form submission
        
        },
        
      });
      window.location.href = "/my-profile";

    } catch (e) {
      console.error(e);
    }
  };
  

  if (redirectToProfile) {
    
    return <Navigate to="/my-profile" replace />;
  }

  return (
    <main className="custom-profile flex-row justify-center">
      <div className="col-12 col-lg-8">
        <div className="card custom-card">
          <h4 className="card-header text-center p-2">Create your Profile</h4>


            {data ? (
              <p style={{ color: "var(--black)", textAlign: "center" }}>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className="profile-form">

                <input
                  className="form-input"
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={formState.location || ""}
                  onChange={handleChange}
                />

                <select
                  className="form-select"
                  name="gender"
                  value={formState.gender || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input
                  className="form-input"
                  placeholder="Age"
                  name="age"
                  type="text"
                  value={formState.age || ""}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Bio"
                  name="bio"
                  type="text"
                  value={formState.bio || ""}
                  onChange={handleChange}
                />
                {/* <input
                  className="form-input"
                  placeholder="Interests"
                  name="interests"

                  value={formState.interests || ""}
                  onChange={handleChange}
                /> */}
                <Select
                className="custom-select"
                placeholder="Interests"
                name="interests"
                value={selectedInterests}
                onChange={handleInterestsChange}
                options={interestOptions}
                isMulti
              />

                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
          </div>
        </div>
    </main>
  );
};

export default Profile;
