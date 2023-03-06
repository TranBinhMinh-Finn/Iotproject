import { useParams } from 'react-router';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { authHeader } from '../services/authorize';
import Chart from 'react-google-charts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { wateringMode } from '../utils';

function toUTC(datetime) {
    const myDate = (typeof datetime === 'number')
      ? new Date(datetime)
      : datetime;
  
    if (!myDate || (typeof myDate.getTime !== 'function')) {
      return 0;
    }
  
    const getUTC = myDate.getTime();
    const offset = myDate.getTimezoneOffset() * 60000; // It's in minutes so convert to ms
    return getUTC + offset; // UTC - OFFSET
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: "fit-content",
      marginTop: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
const DeviceView = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [device, setDevice] = useState();
    const [lightLevel, setLightLevel] = useState('no data');
    const [readings, setReadings] = useState(); 
    const [isLoading, setIsLoading] = useState(true);
    const [data] = useState([[
        { type: "date", label: "Time", format: 'MM dd yy hh:mm:ss' },
        "Moisture",
        "Temperature",
      ]])
    const options = {
        chart: {
          title: "",
        },
        width: 1000,
        height: 500,
        
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: { axis: "Moisture" },
          1: { axis: "Temperature" },
        },
        curveType: "function",
        legend: { position: "bottom" },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Moisture: { label: "Moisture (%)" },
            Temperature: { label: "Temperature (Celcius)" },
          },
        },
    };
    const sendWaterCommand = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/devices/${id}/manual-watering`, {}, { headers: authHeader()})
        .then(alert('Command sent!'))
    };
    useEffect(() => {
        const fetchData = async () => {
            setDevice(await axios.get(`http://localhost:8000/devices/${id}`, { headers: authHeader()}).then(response => response.data))
            setReadings(await axios.get(`http://localhost:8000/device-readings/${id}`, { headers: authHeader()})
            .then(response => {
                if(response.data.results.length > 0)
                {
                    console.log(response.data.results)
                    setLightLevel(response.data.results[0].brightness ? "High" : "Low") 
                }
                return response.data.results.map(reading => {
                return ([new Date(toUTC(Date.parse(reading.timestamp))), reading.humidity, reading.temperature]);}
            )}))
            //setData([...data, ...readings]);
            //console.log(readings)
            setIsLoading(false);
        };

        fetchData();
    }, [id])
    return(
        <div className="condiv">
            {
                isLoading ? (
                    <p>Loading...</p>) : (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Typography color="textSecondary">
                                        Device
                                    </Typography>
                                    <Typography variant="h5">
                                        {device.name}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <b>Id:</b> {device.device_id}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <b>Mode:</b> {wateringMode[device.watering_mode]}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        <b>Timer mode interval:</b> {device.time_interval} minutes
                                    </Typography>
                                </CardContent>
                            </Card>
                            </Grid>
                            <Grid item xs={6}>
                            <Card className={classes.root}>
                                { readings.length > 0 ? (
                                    <CardContent>
                                        <Typography color="textSecondary">
                                            Last recorded at {readings[0][0].toString()}
                                        </Typography>
                                        <Typography variant="h5">
                                            Latest Readings
                                        </Typography>
                                        <Typography color="textSecondary">
                                            <b>Light Level:</b> {lightLevel}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            <b>Temperature:</b> {Math.round(readings[0][1] * 100) / 100}°C
                                        </Typography>
                                        <Typography color="textSecondary">
                                            <b>Soil Moisture:</b> {Math.round(readings[0][2] * 100) / 100}%
                                        </Typography>
                                    </CardContent>
                                    ):(
                                        <CardContent>
                                        <Typography color="textSecondary">
                                            No data
                                        </Typography>
                                        </CardContent>
                                    )}
                               
                            </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={sendWaterCommand}>Water</Button>
                            </Grid>
                        </Grid>
                        
                        <Card className={classes.root}>
                        <CardContent >
                            <Typography variant="h5">
                            Readings
                            </Typography>
                            
                        </CardContent>
                        <CardContent>
                            {
                                readings.length > 0 ? (<Chart
                                    chartType="Line"
                                    width="100%"
                                    height="100%"
                                    marginBottom="20px"
                                    data={[...data, ...readings]}
                                    options={options}
                                />) : (<Typography color="textSecondary">No readings</Typography>)
                            }
                            
                         </CardContent>
                         </Card>
                    </div>
                    )
            }
        </div>
      )
}

export default DeviceView;