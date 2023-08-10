import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "../Company/CompanyCss";
import { postData, ServerURL, getData } from "../../Services/FetchBackendData";
import Swal from "sweetalert2";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function Company(props) {

    const classes = useStyles();
    const navigate = useNavigate();
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [companyId, setCompanyId] = useState('');
    var [categoryId, setCategoryId] = useState('');
    var [subCategoryId, setSubCategoryId] = useState('');
    var [categoryList, setCategoryList] = useState([]);
    var [SubCategoryList, setSubCategoryList] = useState([]);
    var [companyName, setCompanyName] = useState('');


    const fetchAllCategory = async () => {
        var result = await getData('category/display_category')
        setCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchSubCategoryByCategory = async (category_id) => {
        var body = { categoryid: category_id }
        var response = await postData('subcategory/fetch_subcategory_by_category', body);
        setSubCategoryList(response.data)
    }

    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategoryDropDown = () => {
        return SubCategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchAllCategory(event.target.value);
        fetchSubCategoryByCategory(event.target.value);
    }

    const handleSubCategoryChange = (event) => {
        setSubCategoryId(event.target.value);

    }

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleShowSubCategoryData = () => {
        navigate('/display_company')
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('companyid', companyId);
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId);
        formData.append('companyname', companyName);
        formData.append('icon', icon.bytes);
        var response = await postData('company/submit', formData);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Company Submitted Successfully",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    const handleClear = () => {
        setCategoryId('');
        setSubCategoryId('');
        setCompanyName('');
        setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
    }

    const handleShowCompanyList=()=>{
        navigate('/display_company')
    }

    return (
        <div className={classes.box}>
            <div className={classes.center}>
                <Grid spacing={2} container>
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ paddingRight: "2%" }}>
                                <ListAltIcon style={{ cursor: 'pointer' }} onClick={handleShowCompanyList} />
                            </div>

                            <div className={classes.headingStyle}>Company Interface</div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                    <Grid item xs={12}>
                        <TextField fullWidth label="Company Name" onChange={(event) => setCompanyName(event.target.value)} />
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
                            alt="Company Icon"
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
