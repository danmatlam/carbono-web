import React, { useState } from 'react';
// Material Ui Imports//
import { makeStyles } from '@material-ui/core/styles';
import { FindPlace, CurrentLocation } from '../common';
import SelectMode from './SelectMode';
import SelectPerson from './SelectPerson';

import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import { Grid } from '@material-ui/core';
import Distances from '../common/Distances';
import FormControlLabel from '@material-ui/core/FormControlLabel'

import NavigationIcon from '@material-ui/icons/Navigation';
import EcoIcon from '@material-ui/icons/Eco';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'


const useStyles = makeStyles((theme) => ({
    main:{
        background:'#f4f2ff',
        padding:'3em'
    },
    submit: {
        margin: theme.spacing(6),
        minWidth: 120,
        width: '80vw',
        maxWidth: '20em',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '80vw',
        maxWidth: '20em',

    },
    mapFrame: {
        height: '30vh',
        border: 0,
        borderRadius: '9pt',
        width: '80vw',
        maxWidth: '20em',
    },

    form: {
        padding:'2.1em 0'
    }
}));

const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const TripForm = ({ handleSubmit, vehicles, peopleOptions, loading }) => {

    const classes = useStyles();


    const [origin, setOrigin] = useState(null)
    const [destination, setDestination] = useState(null)
    const [vehicle, setVehicle] = useState(null);
    const [distance, setDistance] = useState(null)
    const [roundtrip, setRoundtrip] = useState(true)
    const [people, setPeople] = useState([])


    const onFinish = () => {
        const payload = {
            origin: origin,
            destination: destination,
            roundtrip: roundtrip,
            people: (people && people.length>0 && people.map(item=> item.id)),
            vehicle: vehicle.id,
            distance: distance,
            kgco2: (distance * (roundtrip ? 2 : 1) * vehicle.emision).toFixed(2),
        }

        handleSubmit(payload)
    }


    return (
        <Grid
            container
            direction="row"
            justify="center"
        >

    


            <Grid xs={6} item className={classes.main} container alignItems="center" direction="column">

                <Card className={classes.form}>
                <Grid container direction="column" container alignItems="center" direction="column">


                    {vehicles && <SelectMode vehicles={vehicles} setVehicle={setVehicle} />}
                    {vehicles && <SelectPerson peopleOptions={peopleOptions} setPeople={setPeople} />}

                    <FormControlLabel
                        label="Sólo ida"
                        labelPlacement="right"
                        className={classes.formControl}
                        control={
                            <Checkbox
                                checked={!roundtrip}
                                onChange={() => setRoundtrip(!roundtrip)}
                                color="primary"
                            />
                        }
                    />


                    {
                        vehicle && vehicle.mode && (
                            <>
                                <FindPlace
                                    label="¿Cuál es tu origen?"
                                    google_maps_key={API_KEY}
                                    handleChange={setOrigin}
                                />
                                <FindPlace
                                    label="¿Hacia dónde te diriges?"
                                    google_maps_key={API_KEY}
                                    handleChange={setDestination}
                                />
                            </>
                        )
                    }

                    {
                        origin && destination && vehicle && vehicle.mode &&
                        <iframe
                            className={classes.mapFrame}
                            src={`https://www.google.com/maps/embed/v1/directions?key=${API_KEY}
                        &origin=${origin.latitude},${origin.longitude}
                        &destination=${destination.latitude},${destination.longitude}
                        &mode=${vehicle.mode}
                        `} allowfullscreen>
                        </iframe>
                    }

                    {
                        origin && destination && <Distances google_maps_key={API_KEY} origin={origin} destination={destination} setDistance={setDistance} distance={distance} />
                    }

                    {
                        origin && destination && distance && vehicle && vehicle.emision &&
                        <>

                            <Card className={classes.formControl}>
                                <CardHeader
                                    avatar={<NavigationIcon />}
                                    title={`${distance} KM`}
                                    subheader="Distancia"
                                />
                            </Card>
                            <Card className={classes.formControl}>
                                <CardHeader
                                    avatar={<EcoIcon />}
                                    title={(distance * (roundtrip ? 2 : 1) * vehicle.emision).toFixed(2)}
                                    subheader="Huella ambiental"
                                />
                            </Card>

                        </>
                    }



                </Grid>

                <Button disabled={!distance || !vehicle.emision} onClick={onFinish} variant="contained" color="primary" className={classes.submit}>
                    Registrar
                </Button>
                </Card>
            </Grid>
       
       
            <Grid xs={6} item style={{ background: '#000000', padding: '1.2em', display:'fex', }}>
                <img src="/bg.svg" style={{ width: '100%', height: '100vh', }} />
            </Grid>
        </Grid>

    );


}


TripForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
    peopleOptions: PropTypes.array.isRequired,
}

export default TripForm

