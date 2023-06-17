import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_TRIPS } from '../../utils/queries';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="p-1 rounded-pill shadow-sm mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
          <div className="input-group">
            <input
              type="search"
              placeholder="Enter departure location"
              aria-describedby="button-addon1"
              className="form-control border-0"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0)', borderRadius: '20px' }}
              name="departureLocation"
            />
            <button
              id="button-addon1"
              type="submit"
              className="btn btn-link text-primary rounded-pill bg-transparent border-0"
            >
              <BsSearch style={{ background: 'none' }} />
            </button>
          </div>
        </div>
      </form>
    </div>


  );
};

export default SearchTrips;
