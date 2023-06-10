import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';

import Home from './pages/Home/Home';
import Signup from './pages/Signup';
import Mdb from './pages/MDB'
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login';
import RecipeReviewCard from './pages/TestCard'

import Header from './components/Header/Header';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),

});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        {/* <div className="flex-column justify-flex-start min-100-vh"> */}
          <Header />
          {/* <div className="container"> */}
            <Routes>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/trips"
                element={<Home />}
              />
              <Route
                path="/single"
                element={<RecipeReviewCard />}
              />

              <Route
                path="/mdb"
                element={<Mdb />}
              />




              {/* <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              
              <Route 
                path="/me" 
                element={<RecipeReviewCard />}
              />
              <Route 
                path="/profiles/:username" 
                element={<Profile />}
              />
              <Route 
                path="/thoughts/:thoughtId" 
                element={<SingleThought />}
              /> */}
            </Routes>
          {/* </div> */}
          {/* <Footer /> */}
        {/* </div> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
