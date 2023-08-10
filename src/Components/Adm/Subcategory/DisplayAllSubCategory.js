import { useState, useEffect } from "react";
import { postData, ServerURL, getData } from "../../Services/FetchBackendData";
import MaterialTable from "@material-table/core";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from "sweetalert2";
import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useStyles } from "./DisplayAllSubCategoryCss";

export default function DisplayAllSubCategory(props) {
    const classes = useStyles();
    const [subCategory, setSubCategory] = useState([]);
    const [open, setOpen] = useState(false);
    const [subCategoryId, setSubCategoryId] = useState('');
    var [subCategoryName, setSubCategoryName] = useState('');
    var [priority, setPriority] = useState('');
    var [categoryId, setCategoryId] = useState('');
    var [categoryName, setCategoryName] = useState('');
    var [icon, setIcon] = useState({ filename: '/assets/defaultCar.png', bytes: '' });
    var [buttonStatus, setButtonStatus] = useState({ upload: true });
    var [prevIcon, setPrevIcon] = useState('');
    var [oldIcon, setOldIcon] = useState('');
    var [categoryList, setCategoryList] = useState([]);


    const fetchAllSubCategory = async () => {
        var result = await getData('subcategory/display_subcategory')
        setSubCategory(result.data)
    }
    
    useEffect(function () {
        fetchAllSubCategory()
    }, [])

    const fetchAllCategory = async () => {
        var result = await getData('category/display_category')
        setCategoryList(result.data)
    }


    function displaySubCategory() {

        return (
            <MaterialTable
                title="Sub Category Data"
                columns={[
                    { title: 'Sub Category ID', field: 'subcategoryid' },
                    { title: 'Category Name', field: 'cname' },
                    { title: 'Sub Category Name', field: 'subcategoryname' },
                    { title: 'Priority', field: 'priority' },
                    { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 80, height: 56 }} variant="rounded" /> }
                ]}
                data={subCategory}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleSetDataForDialog(rowData)
                    }
                ]}
            />
        )
    }

    const handleSetDataForDialog = (rowData) => {
        setOpen(true);
        fetchAllSubCategory();
        fetchAllCategory();
        setCategoryId(rowData.categoryid);
        setSubCategoryId(rowData.subcategoryid);
        setSubCategoryName(rowData.subcategoryname);
        setPriority(rowData.priority);
        setIcon({filename:`${ServerURL}/images/${rowData.icon}`, bytes: ''});
        

    }


    const showDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Sub Category Data"}
                </DialogTitle>
                <DialogContent>
                    <div className={classes.box}>
                        <div className={classes.center}>
                            <Grid spacing={2} container>
                                <Grid item xs={12} className={classes.headingStyle}>
                                    Sub Category Interface
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryId}
                                            label="Category Name"
                                            onChange={handleChange}
                                        >
                                            {fillCategoryDropDown()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Sub Category Name" value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={priority}
                                            label="Priority"
                                            onChange={handlePriorityChange}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                        </Select>
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

                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    const handleClose = () => {
        setOpen(false)
    }

    const fillCategoryDropDown = () => {
        return categoryList.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })     
    }

    const handleChange=(event)=>{
        setCategoryId(event.target.value)
    }

    const handlePriorityChange=(event)=>{
        setPriority(event.target.value)
    }

    const handlePicture = (event) => {
        setIcon({filename:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    const handleSubmit = async () => {

    }

    const handleClear = () => {

    }



    return (
        <div>
            {displaySubCategory()}
            <div className={classes.dialogBox}>
                {showDialog()}
            </div>
        </div>
    )
}