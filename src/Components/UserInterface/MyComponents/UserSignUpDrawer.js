import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Button, TextField, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import OtpInterface from './OtpInterface';

export default function UserSignUpDrawer(props) {

    const [value, setValue] = useState('');
    const [getOtp, setOtp] = useState('');
    const [btnStatus, setBtnStatus] = useState(false);
    const [btnMsg, setBtnMsg] = useState('Get an OTP');
    const [mobile, setMobile] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState();
    const [state, setState] = useState({
        top: false,
        left: false,
        right: false,
        bottom: false
    });

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

    const handleClose = () => {
        setState({ ...state, ['right']: false })
    }

    const GenerateOtp = () => {
        if (btnMsg == 'Change Mobile Number') {
            setBtnMsg("Get an OTP")
            setBtnStatus(false)
            setMobile('')
        }
        else {
            var otp = parseInt(Math.random() * 8999) + 1000;
            alert(otp)
            setBtnStatus(true);
            setBtnMsg('Change Mobile Number');
        }
        setGeneratedOtp(otp)
    }

    const handleOtpChange = (value) => {
        setOtp(value);
    }


    const list = (anchor) => (
        <Grid container spacing={3} style={{ width: 400, padding: 50 }}>
            <Grid item xs={12}>
                <img src="/assets/logo1.png" style={{ width: '20%', padding: 3, alignItems: 'center' }} />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 700, width: 25 }}>
                Login
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(event) => setMobile(event.target.value)}
                    value={mobile}
                    InputProps={{
                        sx: { height: 50 }
                    }} variant='outlined' fullWidth label={
                        <span style={{ width: 24, fontFamily: "Poppins", fontWeight: 700 }}>
                            Mobile Number
                        </span>
                    }></TextField>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={GenerateOtp}
                    variant='contained'
                    style={{
                        background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",
                    }}
                    fullWidth>{btnMsg}
                </Button>
            </Grid>
            {btnStatus ?
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <OtpInterface handleClose={handleClose} generatedOtp={generatedOtp} getOtp={getOtp} onChange={handleOtpChange} GenerateOtp={GenerateOtp} mobile={mobile} />
                </Grid> : (<></>)}
        </Grid>
    )

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