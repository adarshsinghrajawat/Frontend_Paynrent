import React from 'react'
import { Box } from '@mui/material'
import { useState } from 'react'
import Divider from "@mui/material/Divider";

export default function Faq(props){
    return (
            <div>
                <div style={{ color: '#bdc3c7', fontWeight: 'bold', fontSize: 28, marginLeft: 20 }}>Faqs</div>
                <div style={{ height: "auto", width: "93%", backgroundColor: "white", borderRadius: "10px", padding: 30, boxShadow: "0px 0px 10px -5px black", marginTop: 30, marginLeft: 20, borderRadius: 20 }}>
                    <div>
                        <h3 style={{ textAlign: "left", lineHeight: 0.3 }}>Is there a speed limit?</h3>
                        <p style={{ textAlign: "left", color: "#7e8898" }}>Revv allows up to 125 km/hr. However it is 80 km/hr in a few cities where some cars might be equipped with speed governors as per government directives. Revv strictly advises to follow local speed limits.</p>
                    </div>
                    <Divider />
                    <div>
                        <h3 style={{ textAlign: "left", lineHeight: 0.3 }}>Can I extend/ cancel/ modify?</h3>
                        <p style={{ textAlign: "left", color: "#7e8898" }}>Yes, extensions are possible subject to availability & charges. Cancellations & modifications will attract nominal charges as per our policy.</p>
                    </div>
                    <Divider />
                    <div>
                        <h3 style={{ textAlign: "left", lineHeight: 0.3 }}>Booking criteria & documents?</h3>
                        <p style={{ textAlign: "left", color: "#7e8898" }}>Min. 21 years old, have valid original government ID (Aadhar, Passport, or PAN only) and a valid driving licence for “Light Motor Vehicles”, which is min. 1 year old at the time of starting the trip.</p>
                    </div>
                    <Divider />
                    <div>
                        <h3 style={{ textAlign: "left", lineHeight: 0.3 }}>Are there any restricted areas?</h3>
                        <p style={{ textAlign: "left", color: "#7e8898" }}>Leh/Ladhakh, Spiti Valley & Kaza/Nako regions are not permitted to take Revv cars. Customer will be fully liable for any damages incurred to the car in that region.</p>
                    </div>
                </div>
            </div>
    )
}
