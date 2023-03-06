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
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const DeviceCreate = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [deviceName, setDeviceName] = useState();
    const [deviceMode, setDeviceMode] = useState("MAN");
    const [deviceTimer, setDeviceTimer] = useState(5);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        //console.log(deviceName, deviceMode, deviceTimer)
        axios.post(`http://localhost:8000/devices/`, {
            name: deviceName,
            watering_mode: deviceMode,
            time_interval: deviceTimer,
        }, { headers: authHeader()})
        .then(response => {
            alert('create device successful!')
            navigate('/hardware')
        })
        .catch((error) =>{
            alert("An error occurred. Please try again later.")
          });
    }
    return (<div className="condiv">
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Create Device
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <FormControl>
                        <TextField
                        InputLabelProps={{ shrink: true }}
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
    </div>)
}

export default DeviceCreate