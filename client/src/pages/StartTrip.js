import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP } from "../utils/mutations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Style/StartTrip.css";
import Auth from "../utils/auth";

const StartTrip = () => {
  const token = localStorage.getItem('id_token');
  const userData = Auth.getProfile(token);
  const [formState, setFormState] = useState({
    creator: userData.data._id,
    title: "",
    description: "",
    departureLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [createTrip, { error, data }] = useMutation(CREATE_TRIP);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setFormState({
      ...formState,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormState({
      ...formState,
      endDate: date,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
    <main className="custom-trip flex-row justify-center ">
    <div className="col-12 col-lg-6">
      <div className="card custom-card">
        <h4 className="card-header p-2 text-center">Start a Trip</h4>
        {data ? (
          <p style={{ color: "var(--black)", textAlign: "center" }}>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="trip-form">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Title"
                name="title"
                type="text"
                value={formState.title}
                onChange={handleChange}
                required 
              />
              {formState.title === "" && (
                <small className="text-danger">Title is required.</small>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Description"
                name="description"
                type="text"
                value={formState.description}
                onChange={handleChange}
                required 
              />
              {formState.description === "" && (
                <small className="text-danger">Description is required.</small>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Departure Location"
                name="departureLocation"
                type="text"
                value={formState.departureLocation}
                onChange={handleChange}
                required 
              />
              {formState.departureLocation === "" && (
                <small className="text-danger">
                  Departure Location is required.
                </small>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Destination"
                name="destination"
                type="text"
                value={formState.destination}
                onChange={handleChange}
                required 
              />
              {formState.destination === "" && (
                <small className="text-danger">Destination is required.</small>
              )}
            </div>
            <div className="form-group">
              <div className="datepicker-container">
                <DatePicker
                  className="form-control custom-datepicker close-icon"
                  selected={formState.startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  isClearable
                  placeholderText="Start Date"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="datepicker-container">
                <DatePicker
                  className="form-control custom-datepicker close-icon"
                  selected={formState.endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  minDate={formState.startDate}
                  isClearable
                  placeholderText="End Date"
                />
              </div>
            </div>
            <button
              className="btn btn-block btn-info"
              style={{ cursor: "pointer" }}
              type="submit"
              required 
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
  </main>
)
};

export default StartTrip;




