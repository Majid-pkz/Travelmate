import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import  Upload from '../components/Upload'
const Profile = () => {
    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
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
    

    try {
      const { data } = await createProfile({
        variables: { ...formState },
      });

   
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Creat your Profile</h4>
          <div className="card-body">
          <Upload />

          
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
             
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="userId"
                  name="location"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="gender"
                  name="age"
                  type="number"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="about me"
                  name="bio"
                  type="text"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="image url"
                  name="image"
                  type="String"
                  value={formState.password}
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
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;