import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex flex-row justify-content-start ps-5 pt-5">
            <i className="fas fa-crow fa-3x me-3" style={{ color: '#709085' }}></i>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3 className="fw-normal mb-3 ps-5 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign Up</h3>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4 mx-5">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input
                  className="form-control"
                  id="firstname"
                  type="text"
                  name="firstname"
                  value={formState.firstname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 mx-5">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input
                  className="form-control"
                  id="lastname"
                  type="text"
                  name="lastname"
                  value={formState.lastname}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 mx-5">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 mx-5">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-primary mb-4 px-5 mx-5" type="submit">Submit</button>
            </form>

            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <p className="ms-2 text-center">
                Already have an account?{' '}
                <Link to="/login" className="link-info text-center" style={{ color: 'var(--orange)' }}>
                  Log in here
                </Link>
              </p>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>

        <div className="col-sm-6 d-none d-sm-block px-0">
          {/* Your image or any other content */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
