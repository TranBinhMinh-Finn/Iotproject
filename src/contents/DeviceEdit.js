import { useEffect } from "react";
import { useParams } from 'react-router';
import axios from "axios";
import { authHeader } from "../services/authorize";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, makeStyles } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const DeviceEdit = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    const [device, setDevice] = useState();
    const [deviceName, setDeviceName] = useState();
    const [deviceMode, setDeviceMode] = useState();
    const [deviceTimer, setDeviceTimer] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setDevice(await axios.get(`http://localhost:8000/devices/${id}`, { headers: authHeader()}).then(response => {
                setDeviceName(response.data.name);
                setDeviceMode(response.data.watering_mode);
                setDeviceTimer(response.data.time_interval);
                return response.data;
            }))
            setIsLoading(false)
        };
        fetchData();
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(deviceName, deviceMode, deviceTimer)
        axios.patch(`http://localhost:8000/devices/${id}`, {
            name: deviceName,
            watering_mode: deviceMode,
            time_interval: deviceTimer,
        }, { headers: authHeader()})
        .then(response => {
            alert('update successful!')
            navigate('/hardware')
        })
        .catch((error) =>{
            alert("An error occurred. Please try again later.")
          });
    }
    return (<div className="condiv">
        {
            isLoading ? (<p>Loading...</p>) : (
                
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            Edit Device
                        </Typography>
                        <form className={classes.root} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField disabled 
                                id="device-id" 
                                label="Device Id" 
                                defaultValue={device.device_id}
                                fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <FormControl>
                                <TextField
                                id="device-name"
                                label="Device Name"
                                value = {deviceName}
                                onChange = {(e) => setDeviceName(e.target.value)}
                                />
                            </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl>
                            <InputLabel id="device-mode-label" shrink>Mode</InputLabel>
                            <Select
                                
                                labelId="device-mode-label"
                                id="device-mode"
                                value={deviceMode}
                                onChange={(e) => setDeviceMode(e.target.value)}
                            >
                                <MenuItem value={"MAN"}>Manual</MenuItem>
                                <MenuItem value={"TIM"}>Timer</MenuItem>
                                <MenuItem value={"ADT"}>Adaptive</MenuItem>
                            </Select>
                            </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl>
                            <TextField
                                label="Timer mode interval"
                                id="device-timer"
                                value={deviceTimer}
                                onChange={(e) => setDeviceTimer(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
                                }}
                            />
                            </FormControl>
                            </Grid>
                        </Grid>
                        
                        
                        <Button variant="contained" color="primary" onClick={(handleSubmit) } >Save</Button>
                        
                        
                    </form>
                    </CardContent>
                </Card>
            )
        }
    </div>)
}

export default DeviceEdit