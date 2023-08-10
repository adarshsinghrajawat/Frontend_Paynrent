import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "./CategoryCss";
import { postData, ServerURL } from "../../Services/FetchBackendData"
import Swal from "sweetalert2";

export default function Category(props) {

    const classes = useStyles();
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [categoryName, setCategoryName] = useState('');

    const handlePicture=(event)=>{
        setIcon({filename:URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0]})
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryname', categoryName);
        formData.append('icon', icon.bytes);
        var response = await postData("category/submit", formData)
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Category Submitted Successfully",
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
        setCategoryName(" ");
    }


    return (
        <div className={classes.box}>
            <div className={classes.center}>
                <Grid spacing={2} container>
                    <Grid item xs={12} className={classes.headingStyle}>
                        Category Interface
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Category Name" onChange={(event)=>setCategoryName(event.target.value)} />
                    </Grid>
                    <Grid xs={6} item>
                        <Button fullWidth variant= "contained" component= "label">
                            Upload
                            <input
                                hidden
                                accept="image/*"
                                multiple
                                type="file" 
                                onChange={handlePicture}/>
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
