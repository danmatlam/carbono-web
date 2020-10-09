import React from 'react';
import PropTypes from "prop-types";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Header from '../common/Header'
import moment from 'moment'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const TripChart = ({ trips }) => {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell >Fecha</TableCell>
                            <TableCell >Partida</TableCell>
                            <TableCell >Destino</TableCell>
                            <TableCell >Kilómetros</TableCell>
                            <TableCell >Transporte</TableCell>
                            <TableCell >Ida y Vuelta</TableCell>
                            <TableCell >Personas</TableCell>
                            <TableCell >kgCO2/persona</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trips.map((row, index) => (
                            <TableRow key={row.id} >
                                <TableCell align="right">{index+1}</TableCell>

                                <TableCell align="right">
                            
                                    {moment(row.created_at).format('YYYY/MM/DD')} - {moment(row.created_at).format('HH:mmm')}

                                 

                                    
                                
                                </TableCell>
                                <TableCell align="">{row.origin.address}</TableCell>
                                <TableCell align="">{row.destination.address}</TableCell>
                                <TableCell align="right">{row.distance}</TableCell>
                                <TableCell align="">{row.vehicle.name}</TableCell>
                                <TableCell align="center">{row.roundtrip ? 'si' : 'no'}</TableCell>
                                <TableCell align="center">{row.people.length}</TableCell>
                                <TableCell align="right">{row.kgco2}</TableCell>

                   
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>
        </div>
    )
}

TripChart.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    vehicles: PropTypes.array.isRequired,
    peopleOptions: PropTypes.array.isRequired,
}

export default TripChart
