import React, {useEffect} from 'react'
import PropTypes from "prop-types";

const Distances = ({ google_maps_key, origin, destination, distance, setDistance }) => {

    useEffect(() => {
        fetchDistance();
    });
    const fetchDistance = () => {

        fetch(`
        https://maps.googleapis.com/maps/api/distancematrix/json?units=metric
        &origins=${origin.latitude},${origin.longitude}
        &destinations=${destination.latitude},${destination.longitude}
        &key=${google_maps_key}`)
            .then(response => response.json())
            .then(data => {

                if(data && data.rows && data.rows.length){
                    const distance = data.rows[0].elements[0].distance.value;
                    setDistance((distance/1000).toFixed(2));
                }
            })
            .catch(error => alert(error));
    }

    return (
        <div>
           
        </div>
    )
}

Distances.propTypes = {
    google_maps_key: PropTypes.string.isRequired,
    origin: PropTypes.object.isRequired,
    destination: PropTypes.object.isRequired,
    setDistance: PropTypes.func.isRequired,
};

export default Distances
