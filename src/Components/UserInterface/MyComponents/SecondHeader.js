import { Grid, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { LocationOn } from "@mui/icons-material";
import { ServerURL, getData, postData } from "../../Services/FetchBackendData";
import { blue, Typography, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemButton } from "@mui/material";
import { PersonIcon, AddIcon } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import DateDiff from "date-diff";
import { useSelector } from "react-redux";


export default function SecondHeader(props) {

    var bookingDetails = useSelector(state=>state.booking);
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(bookingDetails.city);
    const [startTime, setStartTime] = useState(bookingDetails.startTime);
    const [endTime, setEndTime] = useState(bookingDetails.endTime);

    const fetchCities = async () => {
        var response = await getData('user/display_cities')
        setCities(response.data)
    };

    useEffect(function () {
        fetchCities()
    }, []);

    const handleSetStartTimeValue = (newValue) => {
        setStartTime(newValue);
    }

    const handleSetEndTimeValue = (newValue) => {
        setEndTime(newValue)
    }

    const showTopCityList = () => {
        return cities.map((item) => {
            return (
                <>
                    {
                        item.status == 'Top City' ? <ListItem Button >
                            <ListItemText primary={<span style={{ fontSize: 18, fontWeight: 'bold' }}>{item.cityname}</span>} onClick={() => handleCitySelect(item.cityname)} />
                        </ListItem> : <></>
                    }
                </>
            )
        });
    };

    const showOtherCityList = () => {
        return cities.map((item) => {
            return (<>
                {item.status == 'Other City' ? <ListItem Button >
                    <ListItemText style={{ fontSize: 18, fontWeight: 'bold' }} primary={item.cityname} onClick={() => handleCitySelect(item.cityname)} />
                </ListItem> : <></>}</>)
        })
    }

    const handleCityDialog = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCitySelect = (cityselected) => {
        setSelectedCity(cityselected);
        setOpen(false)
    }

    const handleClick = () => {

    }

    const cityDialog = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    style={{ borderRadius: 20, height: '80%' }}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        {"Select City"}
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <List>
                            <div style={{ fontFamily: 'cursive', fontWeight: 'bolder' }}>Top Cities</div>
                            {showTopCityList()}
                        </List>
                        <Divider />
                        <List>
                            <div style={{ fontFamily: 'cursive', fontWeight: 'bolder' }}>Other Cities</div>
                            {showOtherCityList()}
                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} style={{ width: '80%', borderRadius: 20, border: '1px solid #bdc3c7' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <div onClick={handleCityDialog} style={{ cursor: 'pointer', alignItems: 'center', display: 'flex', padding: 15, width: 350, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, height: 25 }}>
                        <LocationOn />
                        <span style={{ fontSize: 20, fontWeight: 600, paddingLeft: 10 }}>{selectedCity}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ cursor: 'pointer', alignItems: 'center', display: 'flex', padding: 15, width: 250, height: 25, borderLeft: 0 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker
                                    label={<span style={{ fontSize: 18, fontWeight: 600, color: '#7f8c8d' }}>Start Time</span>}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    value={startTime}
                                    onChange={(newValue) => { handleSetStartTimeValue(newValue) }}
                                    renderInput={(params) => <TextField variant="standard" {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div style={{ cursor: 'pointer', alignItems: 'center', display: 'flex', padding: 15, width: 250, height: 25, border: '1px solid #bdc3c7', borderRight: '0px', borderTop: '0px', borderBottom: '0px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker
                                    label={<span style={{ fontSize: 18, fontWeight: 600, color: '#7f8c8d' }}>End Time</span>}
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    value={endTime}
                                    onChange={(newValue) => { handleSetEndTimeValue(newValue) }}
                                    renderInput={(params) => <TextField variant="standard" {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div>
                        <Button
                            //onClick={handleClick}
                            variant="contained"
                            style={{
                                background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
                                height: 57,
                                borderRadius: 20,
                                width: 200

                            }}
                        >
                            <span style={{ fontWeight: 600 }}>Modify Search</span>
                        </Button>
                    </div>
                </div>
            </Paper>
            <div>
                {cityDialog()}
            </div>
        </div>
    )
}