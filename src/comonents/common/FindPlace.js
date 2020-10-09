import React, { useState } from 'react'
import PropTypes from "prop-types";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: '12pt', justifyContent: 'center',
    },
    input: {
        width: '80vw',
        maxWidth: '20em',

    },
    listItem: {
        width:'72vw',
       maxWidth: '19em',
    },
    list: {
        maxHeight: '30vh',
       

        overflowX: 'hidden',
        overflowY: 'scroll',
        margin: 0

    }
}));


// SEARCH PLACE



const FindPlace = ({ google_maps_key, handleChange, label, hack, fetchRadius }) => {

    const [places, setPlaces] = useState(null);

    const classes = useStyles();


    const fetchPlaces = (input) => {

        fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input}
        &key=${google_maps_key}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results.length) {

                    const payload = data.results.map(item => (
                        {
                            id: item.place_id,
                            address: item.formatted_address,
                            latitude: item.geometry.location.lat,
                            longitude: item.geometry.location.lng
                        }
                    ));
                    setPlaces(payload)

                }
            })
            .catch(error => alert(error));
    }

    const handleWrite = (value) => {
        (value && value.length > 6) && fetchPlaces(value);
    }



    const handleSelectPlace = (id) => {

        const payload = places.filter(item => item.id === id);

        handleChange(payload[0]);
        setPlaces(null)
    }


    return (
        <>
            <Box m={1}>
                <FormControl className={classes.input}
                    variant="filled">
                    <InputLabel className={classes.label}>{label}</InputLabel>
                    <FilledInput type='text'
                        onChange={(e) => { handleWrite(e.target.value) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" >
                                    <SearchIcon edge="end" />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
            {

                places && places.length &&

                <>
                    <Box m={1} className={classes.list} >
                        {
                            places && places.length && places.map(item =>

                                <ListItem className={classes.listItem} button key={item.id} onClick={() => handleSelectPlace(item.id)} >
                                        <ListItemText primary={item.address} />
                                </ListItem>

                            )
                        }

                    </Box>
                </>






            }



        </>
    )
}

FindPlace.propTypes = {
    google_maps_key: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    fetchRadius: PropTypes.string,
};



export default FindPlace


