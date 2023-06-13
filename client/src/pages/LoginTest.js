import React, {useState} from 'react';
import JunglePic from '../assets/jungle.jpg';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginTest = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex flex-row justify-content-start ps-5 pt-5">
            <i className="fas fa-crow fa-3x me-3" style={{ color: '#709085' }}></i>
          </div>

          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3 className="fw-normal mb-3 ps-5 pb-3 text-center" style={{ letterSpacing: '1px' }}>Log in</h3>

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

            <button className="btn btn-primary mb-4 px-5 mx-5" type="submit" style={{backgroundColor: 'var(--orange'}} onClick={handleFormSubmit}>Login</button>

            {/* <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p> */}
            <p className="ms-2 text-center"><Link to="/signup" className="link-info text-center" style={{ color: 'var(--orange)' }}>Don't have an account? Register here</Link></p>
          </div>
        </div>

        <div className="col-sm-6 d-none d-sm-block px-0">
          <img src={JunglePic} alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'center', height: 'calc(100vh - 170px)', overflow: 'hidden' }} />
        </div>
      </div>
      {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
    </div>
  );
};

export default LoginTest;