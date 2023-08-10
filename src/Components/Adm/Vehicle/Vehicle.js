import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useStyles } from "./VehicleCss";
import { getData, ServerURL, postData } from "../../Services/FetchBackendData";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


export default function Vehicle(props) {

    const classes = useStyles();
    var [vehicleId, setVehicleId] = useState('');
    var [modelId, setModelId] = useState('');
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [categoryId, setCategoryId] = useState('');
    var [subCategoryId, setSubCategoryId] = useState('');
    var [companyId, setCompanyId] = useState('');
    var [categoryList, setCategoryList] = useState([]);
    var [subCategoryList, setSubCategoryList] = useState([]);
    var [companyList, setCompanyList] = useState([]);
    var [modelList, setModelList] = useState([]);
    var [vendorId, setVendorId] = useState('');
    var [registration, setRegistration] = useState('');
    var [color, setColor] = useState('');
    var [fueltype, setFuelType] = useState('');
    var [ratings, setRatings] = useState('');
    var [average, setAverage] = useState('');
    var [remarks, setRemarks] = useState('');
    var [capacity, setCapacity] = useState('');
    var [status, setStatus] = useState('');
    var [feature, setFeature] = useState('');


    const fetchCategory = async () => {
        var result = await getData('category/display_category');
        setCategoryList(result.data);
    }

    useEffect(function () {
        fetchCategory()
    }, [])

    const fetchSubCategoryByCategory = async (cid) => {
        var body = { categoryid: cid }
        var result = await postData('subcategory/fetch_subcategory_by_category', body);
        setSubCategoryList(result.data)
    }

    const fetchCompanybySubCategory = async (subcategory_id) => {
        var body = { subcategoryid: subcategory_id };
        var result = await postData('company/fetch_company_by_subcategory', body);
        setCompanyList(result.data);
    }

    const fetchModelByCompany = async (company_id) => {
        var body = { companyid: company_id };
        var result = await postData('model/fetch_model_by_company', body);
        setModelList(result.data);
    }

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
    }


    const handleClear = (event) => {
        setIcon({ filename: '/assets/defaultcar.png', bytes: '' });

    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchSubCategoryByCategory(event.target.value);
    }

    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const handleSubCategoryChange = (event) => {
        setSubCategoryId(event.target.value);
        fetchCompanybySubCategory(event.target.value);
    }

    const fillSubCategoryDropDown = () => {
        return subCategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const handleCompanyChange = (event) => {
        setCompanyId(event.target.value);
        fetchModelByCompany(event.target.value);
    }

    const fillCompanyDropDown = () => {
        return companyList.map((item) => {
            return (
                <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
            )
        })
    }

    const handleModelChange = (event) => {
        setModelId(event.target.value);
    }

    const fillModelDropDown = () => {
        return modelList.map((item) => {
            return (
                <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
            )
        })
    }

    const handleFuel = (event) => {
        setFuelType(event.target.value);
    }

    const handleRatings = (event) => {
        setRatings(event.target.value)
    }

    const handlestatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('vehicleid', vehicleId);
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('companyid', companyId);
        formData.append('modelid', modelId);
        formData.append('vendorid', vendorId);
        formData.append('registration', registration);
        formData.append('color', color);
        formData.append('fueltype', fueltype);
        formData.append('ratings', ratings);
        formData.append('average', average);
        formData.append('remarks', remarks);
        formData.append('capacity', capacity);
        formData.append('status', status);
        formData.append('feature', feature);
        formData.append('icon', icon.bytes);
        var response = await postData('vehicle/submit', formData);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Model Submitted Successfully",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }

    };


    return (
        <div className={classes.box}>
            <div className={classes.center}>
                <Grid spacing={2} container>
                    <Grid item xs={12} className={classes.headingStyle}>
                        Model Interface
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category Name"
                                onChange={handleCategoryChange}
                            >
                                {fillCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategoryId}
                                label="Sub Category Name"
                                onChange={handleSubCategoryChange}
                            >
                                {fillSubCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Company Name"
                                onChange={handleCompanyChange}
                            >
                                {fillCompanyDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modelId}
                                label="Company Name"
                                onChange={handleModelChange}
                            >
                                {fillModelDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth label="Vendor ID" onChange={(event) => setVendorId(event.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Registration Number" onChange={(event) => setRegistration(event.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth label="Color" onChange={(event) => setColor(event.target.value)} />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Select Fueltype
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fueltype}
                                label="Select Fueltype"
                                onChange={handleFuel}
                            >
                                <MenuItem value={1}>Petrol</MenuItem>
                                <MenuItem value={2}>Diesel</MenuItem>
                                <MenuItem value={3}>CNG</MenuItem>
                                <MenuItem value={4}>Electric</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Select Ratings
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={ratings}
                                label="Select Ratings"
                                onChange={handleRatings}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onChange={(event) => setAverage(event.target.value)} label="Average" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onChange={(event) => setRemarks(event.target.value)} label="Remarks" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField onChange={(event) => setCapacity(event.target.value)} label="Capacity" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setFeature(event.target.value)} label="Feature" fullWidth />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={status}
                                onChange={handlestatusChange}
                            >
                                <FormControlLabel value="Continue" control={<Radio />} label="Continue" />
                                <FormControlLabel value="Discontinue" control={<Radio />} label="Discontinue" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid xs={6} item>
                        <Button fullWidth variant="contained" component="label">
                            Upload
                            <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={handlePicture} />
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar
                            alt="Category Icon"
                            src={icon.filename}
                            variant="rounded"
                            sx={{ width: 150, height: 56 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleClear}>Reset</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleSubmit}>SUBMIT</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}