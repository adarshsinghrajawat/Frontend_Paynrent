import { ServerURL, getData } from "../../Services/FetchBackendData"
import { FormControlLabel } from "@material-ui/core"
import Checkbox from "@mui/material/Checkbox";
import { useStyles } from "./FilterCss";
import { useState } from "react";
import { useEffect } from "react";

export default function Filter(props) {

    const classes = useStyles();

    const [selectedSegment, setSelectedSegment] = useState({});
    const [segment, setSegment] = useState([]);
    const [selectedFuelType, setSelectedFuelType] = useState({});
    const [filterList, setFilterList] = useState([]);

    const fetchSegments = async () => {
        var result = await getData('user/display_company')
        setSegment(result.data);
    }

    useEffect(function () {
        fetchSegments()
    }, [])



    const displayFuelType = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox value="CNG" onChange={handleFuelType} />} label={"CNG"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Petrol" onChange={handleFuelType} />} label={"Petrol"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Diesel" onChange={handleFuelType} />} label={"Diesel"} />
                    <br />
                    <FormControlLabel control={<Checkbox value="Electric" onChange={handleFuelType} />} label={"Electric"} />
                </div>
            </div>
        );
    };

    const displayTransmission = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox />} label={"Manual"} />
                    <br />
                    <FormControlLabel control={<Checkbox />} label={"Automatic"} />
                </div>
            </div>
        );
    };

    const displaySeatingCapacity = () => {
        return (
            <div>
                <div className={classes.items}>
                    <FormControlLabel control={<Checkbox />} label={"2 Seats"} />
                    <br />
                    <FormControlLabel control={<Checkbox />} label={"5 Seats"} />
                    <br />
                    <FormControlLabel control={<Checkbox />} label={"7 Seats"} />
                </div>
            </div>
        );
    };

    const displaySegments = () => {
        return segment.map((item) => {
            return (
                <div key={item.companyid}>
                    <div className={classes.items}>
                        <FormControlLabel control={<Checkbox value={item.companyid} />} onChange={handleSegmentChange} label={<span style={{ fontFamily: 'Poppins' }}>{item.companyname}</span>} />
                    </div>
                </div>
            )
        });
    };

    const handleSegmentChange = (event) => {
        var segment = selectedSegment
        if(event.target.checked)
        segment[event.target.value] = event.target.value
        else
        delete segment[event.target.value]
        setSelectedSegment(segment)

        var filter = filterList
        filter = {...filter, 'segment': segment}
        setFilterList(filter)
        props.filterOperations(filter)
    }

    const handleFuelType = (event) => {
        var fuelType = selectedFuelType
        if(event.target.checked)
        fuelType[event.target.value] = event.target.value
        else
        delete fuelType[event.target.value]
        setSelectedFuelType(fuelType)

       var filter = filterList
        filter = {...filter, 'fuel ': fuelType}
        setFilterList(filter)
        props.filterOperations(filter)  
    }

    return (
        <>
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <div className={classes.heading}>FILTERS</div>
                    <div className={classes.text}>RESET ALL</div>
                </div>
                <div className={classes.box}>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Segment
                        </div>
                        {displaySegments()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Fuel Type
                        </div>
                        {displayFuelType()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Transmission Type
                        </div>
                        {displayTransmission()}
                    </div>
                    <div>
                        <div className={classes.filterOptionHeader}>
                            Seating Capacity
                        </div>
                        {displaySeatingCapacity()}
                    </div>
                </div>
            </div>
        </>
    )
}