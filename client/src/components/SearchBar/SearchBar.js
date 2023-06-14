import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '../../utils/queries';
import { Link } from 'react-router-dom';

import oceanView from '../../assets/oceanView.jpg';
import Auth from '../../utils/auth';

const SearchTrips = () => {
  const [formState, setFormState] = useState({
    departureLocation: '',
  });

  const { loading, error, data } = useQuery(SEARCH_TRIPS, {
    variables: { ...formState },
  });

  const trips = data?.searchTrips || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { departureLocation } = formState;
    const url = `/trips?search=${encodeURIComponent(departureLocation)}`;
    window.location.href = url;
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
  <div className="col-md-12">
    <div className="pt-4">
      <form onSubmit={handleFormSubmit} className="w-100">
        <div className="input-group">
          <input
            className="form-control"
            id="departureLocation"
            type="text"
            name="departureLocation"
            value={formState.departureLocation}
            onChange={handleChange}
            placeholder="Enter departure location"
          />
          <button className="btn btn-outline-dark" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default SearchTrips;
