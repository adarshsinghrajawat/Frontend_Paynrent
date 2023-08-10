import { useState, useEffect } from "react";
import { ServerURL, getData, postData } from "../../Services/FetchBackendData";
import { Button } from "@material-ui/core";
import UserSignUpDrawer from "./UserSignUpDrawer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function VehicleComponent(props) {

    var dispatch = useDispatch();
    var bookingDetails = useSelector((state) => state.booking)

    var item = props.item;

    var [status, setStatus] = useState(false);

    const handleClick = () => {
        setStatus(true)
        var rent = (item.rentperhour * (bookingDetails.days * 24)) + (item.rentperhour * bookingDetails.hrs)
        item['rent'] = rent
        dispatch({ type: "ADD_VEHICLE", payload: [item.vehicleid, item] })
    }

    const handleStatus = () => {
        setStatus(false)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: '#ffffff', width: 280, height: 340, padding: 10, borderRadius: 10, margin: 10, paddingBottom: 25 }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontWeight: 600, fontSize: 20, marginTop: 10, justifyContent: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 500, paddingLeft: 10 }}>{item.companyname}</div>
                <div style={{ marginLeft: 20 }}>{item.modelname}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={`${ServerURL}/images/${item.icon}`} style={{ padding: 20, paddingTop: 7 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, marginTop: 2 }}>
                <div style={{ fontFamily: 'cursive', fontSize: 12, fontWeight: 400 }}><span style={{ padding: 5 }}><img src="/assets/iconTransmission.svg" width='12' height='11' /></span>Automatic</div>
                <div style={{ fontFamily: 'cursive', fontSize: 12, fontWeight: 400 }}><span style={{ padding: 5 }}><img src="/assets/iconDiesel.svg" width='12' height='11' /></span>{item.fueltype}</div>
                <div style={{ fontFamily: 'cursive', fontSize: 12, fontWeight: 400 }}><span style={{ padding: 5 }}><img src="/assets/iconSeat.svg" width='14' height='13' /></span>{item.capacity}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 5, padding: 10, height: 30, alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <span style={{ fontSize: 28, fontWeight: "bolder", marginRight: 5 }}>&#8377;</span>
                    <span style={{ fontSize: 28, fontWeight: "bolder" }}>{(item.rentperhour*(bookingDetails.days*24))+(item.rentperhour*bookingDetails.hrs)}</span>
                </div>
                <div>
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        style={{
                            background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)",

                        }}
                    >
                        <span style={{ fontWeight: 600 }}>Book &gt;</span>
                    </Button>
                </div>
            </div>
            <div style={{ marginLeft: 10, marginTop: 8, fontFamily: 'cursive', fontSize: 12 }}>
                Prices exclude fuel cost
            </div>
            <div style={{ width: '5%' }}>
                <UserSignUpDrawer status={status} handleStatus={handleStatus} />
            </div>
        </div>
    )
}