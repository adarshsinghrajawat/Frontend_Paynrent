import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { postData, ServerURL } from '../Services/FetchBackendData'
import { useNavigate } from "react-router";

import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const styles = (theme) => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
    },
    margin: {
        marginRight: "80%",
        paddingLeft: "",
    },
    button: {
        margin: theme.spacing.unit,
    },

    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const PaymentGateway = (props) => {


    var vehicle = useSelector((state) => state.vehicle);
    var user = useSelector((state) => state.userDetails);
    var userDetails = Object.values(user)[0];
    var vehicleDetails = Object.values(vehicle)[0];

    var pickup = 400
    var sdeposit = 2000
    var total = pickup + sdeposit + vehicleDetails.rent

    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH",
        amount: total * 100, //  = INR 1
        name: "payNrent",
        // description: 'some description',
        image:
            `${ServerURL}/images/Logo1.png`,
        handler: async function (response) {

            alert(response.razorpay_payment_id)
            alert("Booking Confirmed")
            window.location.href = `/home`


        },
        prefill: {
            name: user.fullname,
            contact: user.mobile,
            email: user.email
        },
        notes: {
            address: "some address",
        },
        theme: {
            color: "blue",
            hide_topbar: false,
        },
    };


    const gotoRazorpay = () => {
        return (

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: 30, fontWeight: 'bold', color: 'GrayText', padding: 20 }}>Redirecting to Razorpay pls wait........</div>
                <div className="sweet-loading">
                    {openPayModal()}
                </div>
            </div>
        )
    }

    const openPayModal = async () => {
        var rzp1 = new window.Razorpay(options);
        await rzp1.open()


    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

    }, []);

    const { classes } = props;

    return (
        <>

            {gotoRazorpay()}

        </>
    );
};

export default withStyles(styles)(PaymentGateway);
