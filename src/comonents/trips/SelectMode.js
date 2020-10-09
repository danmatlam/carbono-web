import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '80vw',
        maxWidth: '20em'
    }
}));

const SelectMode = ({ vehicles, setVehicle }) => {
    const classes = useStyles();

    
    const [selected, setSelected] = useState(vehicles[0].id)

    const handleChange = (event) => {
        const value = event.target.value;
        const found = vehicles.find(item => item.id === value);
        setVehicle(found)
        setSelected(value)
    };

    return (
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Transporte</InputLabel>
            <Select
                onChange={handleChange}
            >
                { vehicles && vehicles.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>) }
            </Select>
        </FormControl>
    )
}


SelectMode.propTypes = {
    setVehicle: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
}

export default SelectMode
