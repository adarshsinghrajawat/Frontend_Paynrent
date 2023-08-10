import * as React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import UserDetailsDrawer from "./UserDetailsDrawer";
import { ServerURL, getData, postData } from "../../Services/FetchBackendData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function OtpInterface(props) {

    var [textOne, setTextOne] = useState('');
    var [textTwo, setTextTwo] = useState('');
    var [textThree, setTextThree] = useState('');
    var [textFour, setTextFour] = useState('');
    var [seconds, setSeconds] = useState(true);
    var [status, setStatus] = useState(false);
    var [time, setTime] = useState(10);
    var [refresh, setRefresh] = useState(false);
    var [inputOtp, setInputOtp] = useState('');
    var [userDetails, setUserDetails] = useState({})
    var interval = '';
    var navigate = useNavigate();
    var dispatch = useDispatch();

    const fetchUserDetails = async () => {
        var result = await postData('user/check_user_mobile', { mobile: props.mobile })
        setUserDetails(result)
    }

    useEffect(function () {
        myTimer()
    }, [])

    const myTimer = () => {
        var t = time
        if (seconds) {
            interval = setInterval(() => {
                if (t >= 1) {
                    t = t - 1
                    setTime(t)
                }
                else {
                    clearInterval(interval)
                    setSeconds(false)
                }
            }, 1000)
        }
        setRefresh(!refresh)
    }

    const handleTextOneChange = (event) => {
        if (event.target.value.length >= 1) {
            setTextOne(event.target.value)
            document.getElementById('t2').focus()
        }
    }

    const handleTextTwoChange = (event) => {
        if (event.target.value.length >= 1) {
            setTextTwo(event.target.value)
            document.getElementById('t3').focus()
        }
    }

    const handleTextThreeChange = (event) => {
        if (event.target.value.length >= 1) {
            setTextThree(event.target.value)
            document.getElementById('t4').focus()
        }
    }

    const handleTextFourChange = (event) => {
        if (event.target.value.length >= 1) {
            setTextFour(event.target.value)
            setInputOtp(textOne + textTwo + textThree + event.target.value)
            props.onChange(textOne + textTwo + textThree + event.target.value)
        }
    }

    const verifyOtp = async () => {
        alert(props.getOtp + " " + inputOtp)
        if (props.getOtp == props.generatedOtp) {
            var result = await postData('user/check_user_mobile', { mobile: props.mobile })
            if (result.status) {
                props.handleClose()
                dispatch({ type: 'ADD_USER', payload: [props.mobile, userDetails.data] })
                navigate('/vehicle_details_component');
            }
            else {
                setStatus(true)
            };

        }
        else {
            alert('not correct')
        }
    }

    const handleStatus = () => {
        setStatus(false)
        props.handleClose()
    }

    return (
        <div>
            <Grid container spacing={3} style={{ width: 250, padding: 20 }}>
                <Grid item xs={3}>
                    <TextField id="t1"
                        InputProps={{
                            fontFamily: 'Poppins',
                            fontWeight: 900
                        }}
                        onChange={handleTextOneChange} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t2"
                        InputProps={{
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                        }}
                        onChange={handleTextTwoChange} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t3"
                        InputProps={{
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                        }}
                        onChange={handleTextThreeChange} />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t4"
                        InputProps={{
                            fontFamily: 'Poppins',
                            fontWeight: 900,
                        }}
                        onChange={handleTextFourChange} />
                </Grid>
                <Grid item xs={12}>
                    <div style={{ fontSize: 10, justifyContent: 'center', alignItems: 'center', fontWeight: 400 }}>
                        {seconds ? <div>Waiting for Otp...{time}</div> : <div style={{ cursor: 'pointer' }} onClick={props.GenerateOtp}>Resend Otp</div>}
                    </div>
                </Grid>
                <Grid xs={12} item>
                    <Button
                        onClick={verifyOtp}
                        style={{
                            background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
                        }}
                        fullWidth
                        variant="contained"
                    >
                        Verify
                    </Button>
                </Grid>
            </Grid>
            <UserDetailsDrawer mobile={props.mobile} status={status} handleStatus={handleStatus} />
        </div>
    )
}