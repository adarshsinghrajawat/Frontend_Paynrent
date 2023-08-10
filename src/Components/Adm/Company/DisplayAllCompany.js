import MaterialTable from "@material-table/core";
import { Avatar, Grid, Button, TextField } from "@material-ui/core";
import { getData, postData, ServerURL } from "../../Services/FetchBackendData";
import { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStyles } from "./DisplayAllCompanyCss";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function DisplayAllCompany(props) {

    const classes = useStyles();
    const [company, setCompany] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    var [companyId, setCompanyId] = useState('');
    var [categoryId, setCategoryId] = useState('');
    var [subCategoryId, setSubCategoryId] = useState('');
    var [companyName, setCompanyName] = useState('');
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [open, setOpen] = useState(false);


    const fetchAllComapany = async () => {
        var result = await getData('company/display_company');
        setCompany(result.data);
    }

    useEffect(function () {
        fetchAllComapany()
    }, [])

    const fetchAllCategory = async () => {
        var result = await getData('category/display_category')
        setCategoryList(result.data)
    }

    const fetchAllSubCategory = async () => {
        var result = await getData('subcategory/display_subcategory')
        setSubCategoryList(result.data);
    }

    const handleSetDataForDialog = (rowData) => {
        fetchAllComapany();
        fetchAllCategory();
        fetchAllSubCategory();
        setCompanyId(rowData.companyid);
        setCompanyName(rowData.companyname);
        setCategoryId(rowData.categoryid);
        setSubCategoryId(rowData.sucategoryid);
        setIcon({ filename: `${ServerURL}/images/${rowData.icon}` });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    function dipslayCompany() {
        return (
            <MaterialTable
                title="Company Data"
                columns={[
                    { title: 'Company ID', field: 'companyid' },
                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'Sub Category Name', field: 'subcategoryname' },
                    { title: 'Company Name', field: 'companyname' },
                    { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 80, height: 56 }} variant="rounded" /> }
                ]}
                data={company}
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

    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const fillSubCategoryDropDown = () => {
        return subCategoryList.map((item) => {
            return (
                <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const fetchSubCategoryByCategory = async (categoryId) => {
        var body = { categoryid: categoryId };
        var response = await postData('subcategory/fetch_subcategory_by_category', body);
        setSubCategoryList(response.data)
    }

    const handleShowCompanyList = () => {

    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
        fetchSubCategoryByCategory(event.target.value);
    }

    const handleSubCategoryChange = (event) => {
        setSubCategoryId(event.target.value);
    }

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.flies[0]), bytes: event.target.files[0] })
    }

    const handleDelete = () => {

    }

    const handleEdit = async () => {

    }



    const showDialog = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Edit Data"}
                    </DialogTitle>
                    <DialogContent>
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
                                        <Button fullWidth variant="contained" onClick={handleDelete}>Delete</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button fullWidth variant="contained" onClick={handleEdit}>Edit</Button>
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

            </div>
        )
    }


    return (
        <div>
            {dipslayCompany()}
            <div>
                {showDialog()}
            </div>
        </div>
    )
}