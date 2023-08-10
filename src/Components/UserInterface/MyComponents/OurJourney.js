import { Stack } from '@mui/system'
import { Box } from '@mui/system'
import React from 'react'

export default function OurJourney(props) {


    return (
        <div>
            <div style={{ color: '#bdc3c7', fontWeight: 'bold', fontSize: 28, marginLeft: 20 }}>Our Journey So Far</div>
            <div style={{ color: '#bdc3c7', fontWeight: 'bold', fontSize: 12, margin: 20 }}>
                <div style={{ height: "auto", width: '85vw', backgroundColor: "white", borderRadius: "20px", padding: "20px", boxShadow: "0px 0px 10px -5px black", marginTop: 30 }}>
                    <Stack sx={{ display: "flex", justifyContent: "space-between" }} direction={{ xs: "column", sm: "column", md: "row" }}>
                        <Box xs={3} sx={{ display: "flex", justifyContent: "center", padding: "0px 60px" }}>
                            <Box sx={{ padding: "10px 0px", textAlign: "left" }}>
                                <div><img src='assets/OJ_icon1.png' width="70px" /></div>
                                <h2 style={{ lineHeight: 0.5 }}>1 Mn +</h2>
                                <h6 style={{fontSize: 10}}>Happy Customer</h6>
                            </Box>
                        </Box>
                        <Box xs={3} sx={{ display: "flex", justifyContent: "center", padding: "0px 60px" }}>
                            <Box sx={{ padding: "10px 0px", textAlign: "left" }}>
                                <div><img src='assets/OJ_icon2.png' width="70px" /></div>
                                <h2 style={{ lineHeight: 0.5 }}>22+ cities</h2>
                                <h6 style={{fontSize: 10}}>Across India</h6>
                            </Box>
                        </Box>
                        <Box xs={3} sx={{ display: "flex", justifyContent: "center", padding: "0px 60px" }}>
                            <Box sx={{ padding: "10px 0px", textAlign: "left" }}>
                                <div><img src='assets/OJ_icon3.png' width="70px" /></div>
                                <h2 style={{ lineHeight: 0.5 }}>50 Mn +</h2>
                                <h6 style={{fontSize: 10}}>Kms Travelled</h6>
                            </Box>
                        </Box>
                        <Box xs={3} sx={{ display: "flex", justifyContent: "center", padding: "0px 60px" }}>
                            <Box sx={{ padding: "10px 0px", textAlign: "left" }}>
                                <div><img src='assets/OJ_icon4.png' width="70px" /></div>
                                <h2 style={{ lineHeight: 0.5 }}>4.8 / 5</h2>
                                <h6 style={{fontSize: 10}}>20K+ reviewers</h6>
                            </Box>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    )
}