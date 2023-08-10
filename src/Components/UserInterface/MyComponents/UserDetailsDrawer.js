import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Button, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { postData } from "../../Services/FetchBackendData";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function UserDetailsDrawer(props) {

    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [license, setLicense] = useState('');
    const [state, setState] = useState({
        top: false,
        left: false,
        right: false,
        bottom: false
    });

    var navigate = useNavigate()
    var dispatch = useDispatch()

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.handleStatus(open)
        setState({ ...state, ['right']: open });
    }

    useEffect(function () {
        setState({ ...state, ['right']: props.status })
    }, [props])


    const fetchUserDetails=async()=>{
        var result = await postData('user/check_user_mobile', {mobile: props.mobile})
        dispatch({type: 'ADD_USER', payload: [props.mobile, result.data]})
    }


    const handleSubmit = async () => {
        var body = { mobile: props.mobile, email: email, fullname: fullName, dob: dob, aadhar: aadhar, license: license }
        var response = await postData('user/user_details_submit', body)
        if (response.status) {
            alert('User Registered Successfully')
            setState({ ...state, ['right']: false });
            fetchUserDetails()
            navigate('/vehicle_details_component');
        }
        else {
            alert('Unsuccessfull')
        }
    }

    const list = (anchor) => (
        <Grid container spacing={3} style={{ width: 400, padding: 30 }}>
            <Grid item xs={12}>
                <img src="/assets/logo1.png" style={{ width: 70, padding: 3 }} />
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    textAlign: "center",
                    width: 24,
                    fontFamily: "Poppins",
                    fontWeight: 700,
                }}
            >
                Sign Up
            </Grid>

            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setMobile(event.target.value)}
                    value={mobile}
                    variant="outlined"
                    fullWidth
                    value={props.mobile}
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Mobile Number
                        </span>
                    }
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setEmail(event.target.value)}
                    variant="outlined"
                    fullWidth
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Email Address
                        </span>
                    }
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setFullName(event.target.value)}
                    variant="outlined"
                    fullWidth
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            FullName
                        </span>
                    }
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField

                    onChange={(event) => setDob(event.target.value)}
                    variant="outlined"
                    fullWidth
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Birth Date
                        </span>
                    }
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setAadhar(event.target.value)}
                    variant="outlined"
                    fullWidth
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Aadhar Number
                        </span>
                    }
                ></TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setLicense(event.target.value)}
                    variant="outlined"
                    fullWidth
                    label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Driving License
                        </span>
                    }
                ></TextField>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                        background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
                    }}
                    fullWidth
                >
                    Proceed
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer
                    PaperProps={{ sx: { width: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center' } }}
                    anchor={'right'}
                    open={state.right}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>
        </div>
    )
}