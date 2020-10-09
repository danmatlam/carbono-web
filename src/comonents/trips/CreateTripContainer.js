
import React from 'react'
import TripForm from './TripForm'
import { gql, useMutation, useQuery } from '@apollo/client';
import TripChart from './TripChart';
import ReactJson from 'react-json-view'
import { useHistory} from "react-router-dom";
import SimpleBackdrop from '../common/BackDrop';
import Header from '../common/Header'

const CREATE_TRIP = gql`
    mutation createTrip($input: createTripInput!) {
            createTrip(input: $input) { 
                trip{id}
            }
}`;

const QUERY = gql`query{
  vehicles{ id, name, mode, emision }
  people { id, name }
  trips {
    id
    created_at
    origin
    destination
    roundtrip
    vehicle {
      id
      name
    }
    distance
    kgco2
    people {
      id
      name
    }
  }
  
}`



const CreateTripContainer = () => {

  const [createTrip, createTripState] = useMutation(CREATE_TRIP);
  const { data, loading, error } = useQuery(QUERY);
  const { people, vehicles, trips } = data || {};
  let history = useHistory();


  const handleSubmit = (payload) => {
    const tripPayload = { data: { ...payload } }
    createTrip({ variables: { input: tripPayload } })
      .catch(error => {
        console.log(error)
      })
      .then(res => {
   
          history.push("/chart");
      
      });
  }

  return (

    <>
            <Header title="Registro de movilizaciones"/>

      {
        (people && vehicles) ?
          <TripForm 
            loading={loading}
            handleSubmit={handleSubmit}
            peopleOptions={people}
            vehicles={vehicles} />
          :<SimpleBackdrop open={loading}/>
      }


<SimpleBackdrop open={createTripState.loading}/>


<SimpleBackdrop/>



    </>

  )


}

export default CreateTripContainer;

