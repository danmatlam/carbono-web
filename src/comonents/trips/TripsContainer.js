
import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import TripChart from './TripChart';
import Header from '../common/Header';

const QUERY = gql`query{
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



const TripsContainer = () => {

    const { data, loading, error } = useQuery(QUERY);
    const { trips } = data || {};
    return (
        <>
        <Header title="Viajes realizados" back={true}/>
            {trips && <TripChart trips={trips} />}
        </>
    )
}

export default TripsContainer;

