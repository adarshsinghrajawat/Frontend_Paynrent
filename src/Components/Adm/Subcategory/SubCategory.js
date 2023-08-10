import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "../Subcategory/SubCategoryCss";
import { postData, ServerURL, getData } from "../../Services/FetchBackendData";
import Swal from "sweetalert2";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";


export default function SubCategory(props) {

    const classes = useStyles();
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState('');
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [categoryName, setCategoryName] = useState('');
    var [categoryList, setCategoryList] = useState([]);
    var [subCategoryName, setSubCategoryName] = useState('');
    var [priority, setPriority] = useState('');

    const fetchAllCategory = async () => {
        var result = await getData('category/display_category')
        setCategoryList(result.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, []);


    const fillCategoryDropDown = () => {
        return categoryList.map((item) => {
            return (

                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>

            )
        })
    }


    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('subcategoryname', subCategoryName);
        formData.append('priority', priority);
        formData.append('icon', icon.bytes);
        var response = await postData("subcategory/submit", formData)
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Sub Category Submitted Successfully",
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const handleClear = (event) => {
        setIcon({ filename: '/assets/defaultcar.png', bytes: '' });
        setCategoryName('');
        setSubCategoryName('');
        setPriority(' ');
    }
    
    const handleShowSubCategoryData=()=>{
        navigate('/display_all_subcategory')
    }


    return (
        <div className={classes.box}>
            <div className={classes.center}>
                <Grid spacing={2} container>
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div>
                            <div>
                                <ListAltIcon style={{ cursor: 'pointer' }} onClick={handleShowSubCategoryData} />
                            </div>
                            <div>Sub Interface</div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Category Name"
                                onChange={(event) => setCategoryId(event.target.value)}
                            >
                                {fillCategoryDropDown()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Sub Category Name" onChange={(event) => setSubCategoryName(event.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Priority"
                                onChange={(event) => setPriority(event.target.value)}
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
    )
};
