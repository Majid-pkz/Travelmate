import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_TRIP } from '../utils/mutations';
import Auth from '../utils/auth';

const StartTrip = () => {
    const [formState, setFormState] = useState({
        creator: '',
        title: '',
        description: '',
        departureLocation: '',
        destination: '',
        startDate: '',
        endDate:'',
      });
      const [createTrip, { error, data }] = useMutation(CREATE_TRIP);

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
     console.log(formState);
    console.log("Whats name???", formState.name)

    try {
      const { data } = await createTrip({
        variables: { ...formState },
      });

      //Auth.login(data.createTrip.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Start a Trip</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                  <input
        className="form-input"
        placeholder="Creator"
        name="creator"
        type="text"
        value={formState.creator}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Title"
        name="title"
        type="text"
        value={formState.title}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Description"
        name="description"
        type="text"
        value={formState.description}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Departure Location"
        name="departureLocation"
        type="text"
        value={formState.departureLocation}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Destination"
        name="destination"
        type="text"
        value={formState.destination}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="Start Date"
        name="startDate"
        type="text"
        value={formState.startDate}
        onChange={handleChange}
      />
      <input
        className="form-input"
        placeholder="End Date"
        name="endDate"
        type="text"
        value={formState.endDate}
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

export default StartTrip;