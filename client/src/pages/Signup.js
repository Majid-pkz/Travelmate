import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tent from '../assets/tent.jpg'
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
    <div className="container-fluid" style={{ backgroundColor: 'var(--beige)' }}>
      <div className="row">
        <div className="col">
          <div className="d-flex flex-row justify-content-center align-items-center ps-5 ">
            <i className="fas fa-crow fa-3x me-3" style={{ color: '#709085' }}></i>
          </div>

          <div className="d-flex flex-column h-custom-2 pt-4">
            <h3 className="fw-normal mb-3 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign Up</h3>

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
              <div className="d-flex justify-content-center">
              <button className=" btn btn-primary mb-4 mx-5 w-100" type="submit"style={{backgroundColor: 'var(--orange'}}>Submit</button>
              </div>
            </form>

            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <p className="ms-2 text-center" style={{ color: 'var(--orange)' }}>
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
        <img src={Tent} alt="Signup image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'center', height: 'calc(100vh - 170px)', overflow: 'hidden' }} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
