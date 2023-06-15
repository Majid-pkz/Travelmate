import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import Upload from '../components/Upload';

const Profile = () => {
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

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("This is user ID", userData.data._id);
    try {
      console.log("This is form state", formState)
      const { data } = await createProfile({
        variables: { ...formState },
      });
      console.log("This is data", data)
      window.location.href = "/my-profile";
      // Auth.login(data.createProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Create your Profile</h4>
          <div className="card-body">
            <Upload />

            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                
                <input
                  className="form-input"
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={formState.location}
                  onChange={handleChange}
                />
              
                <select
                  className="form-select"
                  name="gender"
                  value={formState.gender}
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
                  value={formState.age}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Bio"
                  name="bio"
                  type="text"
                  value={formState.bio}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Interests"
                  name="interests"
                  
                  value={formState.interests}
                  onChange={handleChange}
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
      </div>
    </main>
  );
};

export default Profile;
