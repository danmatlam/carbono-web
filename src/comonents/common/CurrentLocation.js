import React, { useState } from 'react'
import PropTypes from "prop-types";
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import LocationIcon from '@material-ui/icons/LocationOn';





const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: '12pt', justifyContent: 'center',
    },
    input: {
        width: '80vw',
        maxWidth: '20em'
    },
    button: {
        borderRadius: '18pt',
        width: '4.5em',
        height: '4.5em'
    },
    arrow: {
        width: '45px',
        height: '45px',
        marginLeft: '6px'
    }
}));



const CurrentLocation = ({ google_maps_key, handleChange }) => {
    const classes = useStyles();
    const [currentPlace, setCurrentPlace] = useState(null)



const mapCountryCity=(data)=>{
    const parts = data.split(' ')
    const countryCity = parts[1];
    return  countryCity
}
   

    //GET NATIVE LOCATION
    const getAddress = (position) => {

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}
        &sensor=false&key=${google_maps_key}`)
            .then(response => response.json())
            .then(data => {
                

                const results = data.results[0];
               
               
        
                
                const payload ={
                    id: results.place_id,
                    address: results.formatted_address,
                    latitude: results.geometry.location.lat,
                    longitude: results.geometry.location.lng,
                    countryCity: mapCountryCity(results.plus_code.compound_code)
                }
                
                handleChange(payload)

               
            })
            .catch(error => alert(error))

    }
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getAddress, handleLocationErrors);
        } else {
            alert('not supported')
        }
    }


    const handleLocationErrors = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;

            default:  alert("An unknown error occurred."); break;
        }
    }

    return (
        <>
            <Box m={3}>
                <IconButton
                    onClick={getLocation}
                    edge="end"
                >
                    <LocationIcon />
                </IconButton>
            </Box>
          

        </>

    )
}

CurrentLocation.propTypes = {
    google_maps_key: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
};


export default CurrentLocation