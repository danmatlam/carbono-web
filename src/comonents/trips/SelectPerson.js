import React, { useState } from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        minWidth: 120,
        width: '80vw',
        maxWidth: '20em',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const  getStyles=(name, personName, theme) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



const SelectPerson = ({ peopleOptions, setPeople }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);


    const handleChange = (event) => {

        setPersonName(event.target.value);
        setPeople(event.target.value);
    };

    /////



    return (

        <>


            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Personas</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => {
                        return (
                            <div className={classes.chips}>
                                {selected.map((item) => (
                                    <Chip key={item.id} label={item.name} className={classes.chip} />
                                ))}
                            </div>
                        )
                    }



                    }
                    MenuProps={MenuProps}
                >
                    {peopleOptions.map((item) => (
                        <MenuItem key={item.id} value={item} style={getStyles(item.name, personName, theme)}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </>
    )
}


SelectPerson.propTypes = {
    setPeople: PropTypes.func.isRequired,
    peopleOptions: PropTypes.array.isRequired,
}

export default SelectPerson
