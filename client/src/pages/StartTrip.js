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
    const userData = Auth.getProfile(token)
  const [formState, setFormState] = useState({
    creator: userData.data._id ,
    title: "",
    description: "",
    departureLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
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

  // handle start date change
  const handleStartDateChange = (date) => {
    setFormState({
      ...formState,
      startDate: date,
    });
  };

  // handle end date change
  const handleEndDateChange = (date) => {
    setFormState({
      ...formState,
      endDate: date,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(formState.startDate.toISOString().substring(0, 10));
    console.log('userid comes from auth.getProfile',userData.data._id)
    console.log('userData: ----------------',userData)
    console.log('formState.creator: ----------------',formState.creator)

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
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
               
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
                <div className="datepicker-container " >
                  <DatePicker
                    className="custom-datepicker close-icon"
                    selected={formState.startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    isClearable
                    placeholderText="Start Date"
                  />
                   <DatePicker
                    className="custom-datepicker endDatepicker close-icon"
                    selected={formState.endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={formState.startDate}
                    isClearable
                    placeholderText="End Date"
                  />
                </div>

                <div>
                 
                </div>

       
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
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
