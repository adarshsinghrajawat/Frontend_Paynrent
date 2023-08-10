import { useState, useEffect } from "react";
import { getData } from "../../Services/FetchBackendData";

export default function Cities(props) {
    const [cities, setCities] = useState([]);

    const fetchCities = async () => {
        var response = await getData('user/display_cities')
        setCities(response.data)
    }

    useEffect(function () {
        fetchCities()
    }, [])


    const displayCities = () => {
        return cities.map((item, index) => {
            return (
                <div key={item.cityid}>
                    <div key={item.id} style={{ position: "relative", width: "100%", margin: 10, padding: "0 2px", boxSizing: "border-box", display: "block" }}>
                        <ul style={{ listStyle: "none", margin: "auto", padding: "0 0 0 15px" }}>
                            <li style={{ fontSize: 16 }}>
                                <span style={{ color: "#636e72", textDecoration: "none" }}>
                                    <a style={{ color: 'white' }} href="" >Self Drive Car Rental in <>{item.cityname}</></a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })
    }

    return (
        <div style={{ width: '92%', background: '#2f3640', display: 'flex', flexDirection: 'column', borderRadius: 20, margin: 20, padding: '2%', paddingLeft: '4%' }}>
            <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>
                    Serviceable Cities
                </div>
                <div>
                    {displayCities()}
                </div>
            </div>
        </div>
    )
}