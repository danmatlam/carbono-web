import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CreateTripContainer from './comonents/trips/CreateTripContainer'
import TripsContainer from './comonents/trips/TripsContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});



const App = () => {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/chart">
          <TripsContainer />
        </Route>
        <Route exact path="/">
           <CreateTripContainer />
        </Route>
        <Route path="*">
             <h1>Not found</h1>
          </Route>
      </Switch>
      </Router>
      
    </ApolloProvider>
  )
}

export default App
