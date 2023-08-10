import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import Category from "../Category/Category";
import DisplayAllCatergory from "../Category/DisplayAllCategory";
import SubCategory from "../Subcategory/SubCategory";
import DisplayAllSubCategory from "../Subcategory/DisplayAllSubCategory";
import Company from "../Company/Company";
import DisplayAllCompany from "../Company/DisplayAllCompany";
import FeatureInterface from '../Featured/FeatureInterface';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import MenuIcon from '@mui/icons-material/Menu';
import OfferInterface from '../Offer/OfferInterface';
import DisplayAllOffers from '../Offer/DisplayAllOffers';
import Model from '../Model/Model';
import Vehicle from '../Vehicle/Vehicle';
import { isValidAuth } from '../../Services/FetchBackendData';


export default function DashBoard(props) {

    const [authState, setAuthState] = React.useState(false);


    const checkAuth = async () => {
        var result = await isValidAuth()
        if (result.auth) {
            setAuthState(true)
        }
        else {
            setAuthState(false)
        }
    }

    React.useEffect(function () {
        checkAuth()
    }, [])

    return (
        <div>
            {authState ?
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                payNrent
                            </Typography>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.png" />
                        </Toolbar>
                    </AppBar>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <img src='/assets/defaultcar.png' style={{ width: 100 }} />
                        </Grid>
                        <Grid item xs={2}>
                            <Sidebar />
                        </Grid>
                        <Grid item xs={10}>
                            <Routes>
                                <Route element={<Category />} path='/category' />
                                <Route element={<DisplayAllCatergory />} path='/display_category' />
                                <Route element={<SubCategory />} path='/subcategory' />
                                <Route element={<DisplayAllSubCategory />} path='/display_subcategory' />
                                <Route element={<Company />} path="/company" />
                                <Route element={<DisplayAllCompany />} path="/display_company" />
                                <Route element={<FeatureInterface />} path="/featureinterface" />
                                <Route element={<OfferInterface />} path="/offer" />
                                <Route element={<DisplayAllOffers />} path="/display_offers" />
                                <Route element={<Model />} path="/models" />
                                <Route element={<Vehicle />} path="/vehicles" />
                            </Routes>
                        </Grid>
                    </Grid>
                </Box > : <><h5>Not a Valid User............</h5></>}
        </div>
    )
}