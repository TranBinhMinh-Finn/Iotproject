import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {authHeader, getUser} from "../services/authorize";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from "@material-ui/core";
import { Delete, Visibility } from "@mui/icons-material";
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

async function getDevice(device) {
    return axios.get(`http://localhost:8000/devices/${device}`, { headers: authHeader()}).then(response => response.data)
};


const Hardware = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [devices, setDevices] = useState();
    const viewDevice = (device_id) => {
        navigate(`/devices/${device_id}`)
    }

    const viewIcon = (device_id) => {
        return (<IconButton onClick= {(e) => {viewDevice(device_id)}}>
        <Visibility color="secondary" />
        </IconButton>
    );
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const devices_list = getUser().devices;
            console.log(devices_list); 
            setDevices(await Promise.all(devices_list.map(device => getDevice(device))));
            console.log(devices);
            setIsLoading(false);
        };
        fetchData();
    }, [])
    return (
        <div className="condiv">
        {
            isLoading ? (
            <p>Loading...</p>) : (
            
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Device Id</TableCell>
                    <TableCell align="right">Device Name</TableCell>
                    <TableCell align="right">Watering Mode</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {devices.map((device) => (
                    <TableRow key={device.device_id}>
                    <TableCell component="th" scope="row">
                        {device.device_id}
                    </TableCell>
                    <TableCell align="right">{device.name}</TableCell>
                    <TableCell align="right">{device.watering_mode}</TableCell>
                    <TableCell align="right">{viewIcon(device.device_id)}</TableCell>
                    <TableCell align="right">{viewIcon(device.device_id)}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            )
        }
        
        </div>
    );
// details of devices (reders kup khr moun t dai hub ma jark api )
// <li key={device.device_id}>{device.name}</li>
};

export default Hardware