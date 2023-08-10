import { useState, useEffect } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import { useStyles } from "./OfferCss";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { ServerURL, postData } from "../../Services/FetchBackendData";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function OfferInterface(props) {

    const classes = useStyles();
    var navigate = useNavigate();
    var [icon, setIcon] = useState({ filename: '/assets/f3.png', bytes: '' });
    var [title, setTitle] = useState('');
    var [description, setDescription] = useState('');

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
    };

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('icon', icon.bytes);
        var response = await postData('offer/submit', formData);
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Category Submitted Successfully',
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    const clearValues = () => {
        setTitle('');
        setDescription('');
        setIcon({ filename: '/assest/f3.png', bytes: '' })
    }

    const handleshowOfferList = () => {
        navigate('/dashboard/display_offer')
    }


    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div className={classes.center}>
                            <ListAltIcon onClick={handleshowOfferList} />
                            <div style={{ marginLeft: 5 }}>
                                Offer Interface
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setTitle(event.target.value)} value={title} label="Title" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setDescription(event.target.value)} value={description} label="Description" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" component="label" fullWidth>
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={classes.center}>
                        <Avatar
                            alt="Offers Icon"
                            src={icon.filename}
                            variant="rounded"
                            sx={{ width: 130, height: 56 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth>
                            submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={clearValues} variant="contained" fullWidth>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}