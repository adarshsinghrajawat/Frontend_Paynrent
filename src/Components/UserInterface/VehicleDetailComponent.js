import { useState, useEffect } from "react";
import Header from "../UserInterface/MyComponents/Header";
import { Divider, Paper, TextField, Button } from "@mui/material";
import { ServerURL } from "../Services/FetchBackendData";
import { useSelector } from "react-redux";
import { useStyles } from "./VehicleDetailComponentCss";
import { useNavigate } from "react-router-dom";

export default function VehicleDetailComponent(props) {

    const navigate = useNavigate();
    const classes = useStyles();
    var vehicle = useSelector((state) => state.vehicle);
    var vehicleDetails = Object.values(vehicle)[0];
    var pickup = 400;
    var sdeposit = 2000;
    var total = pickup + sdeposit + vehicleDetails.rent

    var bookingDetails = useSelector((state) => state.booking);
    //console.log("ss", new Date(Object.values(bookingDetails.starttime)[2]))
    console.log("Start Time : ", bookingDetails.starttime);
    var st = Object.values(bookingDetails.starttime)[2];
    var std = st.toDateString();
    var stt = st.getHours() + ":" + st.getMinutes() + ":" + st.getSeconds();

    var et = Object.values(bookingDetails.endtime)[2];
    var etd = et.toDateString();
    var ett = et.getHours() + ":" + et.getMinutes() + ":" + et.getSeconds();

    return (
        <div style={{ background: "rgb(241, 241, 241)", height: "100%", }}>
            <Header />
            <div className={classes.container}>
                <div className={classes.subContainerFirst}>
                    <Paper square={true} elevation={3} style={{ marginTop: 6, marginBottom: 6, }}>
                        <div className={classes.card}>
                            <div className={classes.cardBody}>
                                <div className={classes.cardFirst}>
                                    <div className={classes.cardFirstHeading}>
                                        <b style={{ fontSize: 18, }}>
                                            {vehicleDetails.companyname} {vehicleDetails.modelname}
                                        </b>
                                    </div>
                                    <br />
                                    <img className={classes.cardFirstImage} src={`${ServerURL}/images/${vehicleDetails.icon}`} alt="Audi" />
                                    <br />
                                    <div className={classes.carDetails}>
                                        <div className={classes.subCarDetails}>
                                            <img src="/assets/iconTransmission.svg" alt="Automatic" style={{ marginRight: 6, verticalAlign: "middle", width: 16, }} />
                                            <br />
                                            <span className={classes.carDetailsText}>
                                                Automatic
                                            </span>
                                        </div>
                                        <div className={classes.subCarDetails}>
                                            <img src="/assets/iconDiesel.svg" alt="Fuel" style={{ marginRight: 6, verticalAlign: "middle", width: 14, }} />
                                            <br />
                                            <span className={classes.carDetailsText}>
                                                {vehicleDetails.fueltype}
                                            </span>
                                        </div>
                                        <div className={classes.subCarDetails}>
                                            <img src="/assets/iconSeat.svg" alt="Automatic" style={{ marginRight: 6, verticalAlign: "middle", width: 12, }} />
                                            <br />
                                            <span className={classes.carDetailsText}>
                                                {vehicleDetails.capacity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.cardSecond}>
                                    <span style={{ fontSize: 18, }}>
                                        <Divider>BOOKING DETAILS</Divider>
                                        <br />
                                        <div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', wordSpacing: '5px', fontSize: 15, fontFamily: 'cursive' }}>
                                            <div style={{  width: "50%", padding: 5, fontWeight: 700, fontSize: 15 }}>
                                                {std + " " + stt}
                                            </div>
                                            <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 15, padding: 5 }}>TO</div>
                                            <div style={{ width: "50%", padding: 5, fontWeight: 700, fontSize: 15 }}>
                                                {etd + " " + ett}
                                            </div>
                                        </div>
                                        <br />
                                        <div style={{ marginTop: 12, fontSize: 13, fontFamily: 'cursive' }}>
                                            <span>
                                                {bookingDetails.duration}
                                            </span>
                                        </div>
                                        <br /><br />
                                        <div style={{ display: "inline-flex", }}>
                                            <span style={{ marginRight: 20, }}><b>City : {bookingDetails.city}</b></span>
                                        </div>
                                        <br />
                                        <div style={{ display: "inline-flex", paddingTop: 10 }}>
                                            <span style={{ marginRight: 20, }}>
                                                <b>
                                                    Pricing Plan: Includes 870 kms, Includes fuel
                                                </b>
                                            </span>
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Paper>
                    <Paper square={true} elevation={8} style={{ marginTop: 8, }}>
                        <div className={classes.card}>
                            <Divider>
                                <span style={{ fontSize: 18, fontWeight: 600, fontFamily: "Poppins", }}>
                                    IMPORTANT POINTS TO REMEMBER
                                </span>
                            </Divider>
                            <br />
                            <table style={{ border: "1px solid #e9ecef", fontSize: 16, margin: 8, marginBottom: "1rem", borderSpacing: 2, borderCollapse: "collapse", }}>
                                <tbody style={{ display: "table-row-group", verticalAlign: "middle", borderColor: "inherit", }}>
                                    <tr style={{ display: "table-row", }}>
                                        <td style={{ width: "20vw", paddingBottom: 12, }}>
                                            CHANGE IN PRICING PLAN:
                                        </td>
                                        <td style={{ paddingBottom: 12, }}>
                                            The pricing plan (15 kms/hr, with fuel) cannot be changed after the booking is made
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ minWidth: "20vw", paddingBottom: 12, }}>
                                            FUEL:
                                        </td>
                                        <td style={{ paddingBottom: 12, }}>
                                            Included. If you need to refuel during your trip, we will reimburse the fuel bills (while returning the car, please let our executive take a pic of them. Hand-written bills are NOT valid)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingBottom: 12, }}>
                                            TOLLS, PARKING, INTER-STATE TAXES:
                                        </td>
                                        <td style={{ paddingBottom: 12, }}>
                                            To be paid by you.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingBottom: 12, }}>
                                            ID VERIFICATION:
                                        </td>
                                        <td style={{ paddingBottom: 12, }}>
                                            Please keep your original Driving License handy. While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ paddingBottom: 5 }}>
                                            PRE-HANDOVER INSPECTION:
                                        </td>
                                        <td >Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </div>
                <div className={classes.subContainerSecond}>
                    <Paper square={true} elevation={6} style={{ marginTop: 6, marginBottom: 6 }}>
                        <div style={{ background: "#f1f1f1", }}>
                            <div style={{ padding: "1rem", }}>
                                <Divider>
                                    <span style={{ textAlign: "center", fontSize: 18, fontWeight: 600, fontFamily: "Poppins", }}>
                                        FARE DETAILS
                                    </span>
                                </Divider>
                                <br />
                                <table style={{ fontSize: 16, margin: 8, marginBottom: "1rem", borderSpacing: 2, borderCollapse: "collapse", width: "100%", }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Base Fare
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                &#x20B9; {vehicleDetails.rent}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Doorstep Delivery & Pickup
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                &#x20B9; {pickup}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Insurance
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                Included
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Refundable Security Deposit
                                            </td>
                                            <td style={{ paddingBottom: 12 }}>
                                                &#x20B9; {sdeposit}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: 24, paddingRight: 84, }}>
                                                <TextField id="standard-basic" label="Promo Code" variant="standard" fullWidth />
                                            </td>
                                            <td style={{ paddingTop: 36, paddingLeft: 12, }}>
                                                <Button variant='outlined'>
                                                    Apply
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <br />
                                <hr style={{ size: 6, }} />
                                <table style={{ fontSize: 16, margin: 8, marginBottom: "1rem", borderSpacing: 2, borderCollapse: "collapse", width: "100%", }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingLeft: 2, }}>
                                                <span style={{ fontSize: 20, fontWeight: 600, }}>
                                                    TOTAL
                                                </span>
                                            </td>
                                            <td style={{ paddingLeft: 300, }}>
                                                <span style={{ fontSize: 20, fontWeight: 500, }}>
                                                    &#x20B9; {total}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr style={{ size: 6, }} />
                                <br />
                                <br />
                                <table style={{ fontSize: 16, margin: 8, marginBottom: "1rem", borderSpacing: 2, borderCollapse: "collapse", width: "100%", }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Kms Limit
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                870 Kms
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Fuel
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                Included
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Extra kms charge
                                            </td>
                                            <td style={{ paddingBottom: 6 }}>
                                                &#x20B9; 11/Km
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingBottom: 6 }}>
                                                Tolls, Parking & Inter-state taxes
                                            </td>
                                            <td style={{ paddingBottom: 12 }}>
                                                To be paid by you
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ paddingTop: 24, paddingRight: 84, paddingBottom: 8, }}>
                                                <TextField id="standard-basic" label="Delivery Location" variant="standard" fullWidth />
                                            </td>
                                            <td style={{ paddingTop: 36, paddingLeft: 12, paddingBottom: 8, }}>
                                                <Button color='secondary' variant='contained' onClick={()=>navigate("/payment_gateway")}>
                                                    Proceed
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}