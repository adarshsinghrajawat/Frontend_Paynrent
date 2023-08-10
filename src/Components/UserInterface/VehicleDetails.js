import { useState, useEffect } from "react";
import VehicleComponent from "./MyComponents/VehicleComponent";
import { getData } from "../Services/FetchBackendData";
import Header from "./MyComponents/Header";
import Filter from "./MyComponents/Filter";
import { Grid } from "@material-ui/core";
import SecondHeader from "./MyComponents/SecondHeader";

export default function VehicleDetails(props) {

    const [vehicleList, setVehicleList] = useState([]);
    const [tempVehicleList, setTempVehicleList] = useState([]);
    
    const fetchvehicle = async () => {
        var result = await getData('vehicle/display_vehicles')
        setVehicleList(result.data)
        setTempVehicleList(result.data)
    }

    useEffect(function () {
        fetchvehicle()
    }, [])

    const listOfVehicle = () => {
        return vehicleList.map((item) => {
            return (
                <div>
                    <VehicleComponent item={item} />
                </div>
            )
        })
    }


    const segmentFilter = (ids) => {
        alert(JSON.stringify(ids))
        var models = Object.values(ids?.segment ? ids.segment : {})
        var fuel = Object.values(ids?.fuel ? ids.fuel : {})
        var segment_str = ''
        var i
        ////Model
        if (models.length > 0) {
            for (i = 0; i < models.length; i++) {
                segment_str = segment_str + "item.companyid===" + models[i] + " || "
            }

            segment_str = segment_str.substring(0, segment_str.lastIndexOf('||') - 1)
        }
        alert("Segment:" + segment_str)
        ///Fuel
        var fuel_str = ''
        if (fuel.length > 0) {
            for (i = 0; i < fuel.length; i++) {
                fuel_str = fuel_str + "item.fueltype==='" + fuel[i] + "' || "
            }

            fuel_str = fuel_str.substring(0, fuel_str.lastIndexOf('||') - 1)
        }

        alert("Fuel:" + fuel_str)

        var final_query = ''
        if (segment_str != '') {
            final_query = final_query + segment_str + " && "
        }


        if (fuel_str != '') {
            final_query = final_query + fuel_str + " || "
        }

        if (fuel_str === '')
            final_query = final_query.substring(0, final_query.lastIndexOf('&&') - 1)
        else
            final_query = final_query.substring(0, final_query.lastIndexOf('||') - 1)

        alert(final_query)

        var temp = tempVehicleList.filter((item) => {
            return eval(final_query)
        })
        setVehicleList(temp)
    }


    const filterOperations = (parameter) => {
        segmentFilter(parameter)
    }

    return (
        <div >
            <div style={{ display: 'flex', flexDirection: 'column', background: '#dfe6e9' }}>
                <Header />
            </div>
            <div style={{ background: '#dfe4ea', margin: 1 }}>
                <SecondHeader />
            </div>
            <Grid container spacing={4} style={{ background: '#dfe4ea' }}>
                <Grid item xs={2}>
                    <Filter filterOperations={filterOperations} />
                </Grid>
                <Grid xs={10} item>
                    <div style={{ margin: 20, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {listOfVehicle()}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}