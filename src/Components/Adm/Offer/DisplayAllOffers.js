import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Avatar, Button, TextField, Grid } from "@material-ui/core";
import { useStyles } from "../Category/DisplayAllCategoryCss";
import { Form, useNavigate } from "react-router-dom";
import { getData, postData, ServerURL } from "../../Services/FetchBackendData";
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { SetMealOutlined } from "@mui/icons-material";

export default function DisplayAllOffers(props) {

    const classes = useStyles();
    const [offers, setOffers] = useState([]);
    const [open, setOpen] = useState(false);
    var [offerId, setOfferId] = useState('');
    var [title, setTitle] = useState('');
    var [description, setDescription] = useState('');
    var [icon, setIcon] = useState({ filename: '/assets/f3.png', bytes: '' });
    var [oldIcon, setOldIcon] = useState('');
    var [prevIcon, setPrevIcon] = useState('');
    var [buttonStatus, setButtonStatus] = useState({ upload: true });

    const fetchOffers = async () => {
        var result = await getData('offer/display_offer')
        setOffers(result.data)
    }

    useEffect(function () {
        fetchOffers()
    }, [])

    function DisplayOffers() {
        return (
            <MaterialTable
                title="Offers"
                columns={[
                    { title: 'Offer ID', field: 'offerid' },
                    { title: 'Title', field: 'title' },
                    { title: 'Description', field: 'description' },
                    { title: 'Image', field: 'image', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 170, height: 76 }} variant="rounded" /> }
                ]}
                data={offers}
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
        setOfferId(rowData.offerid);
        setTitle(rowData.title);
        setDescription(rowData.description);
        setOldIcon(rowData.icon);
        setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' });
        setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    }

    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setButtonStatus({ upload: false });
    }

    const showHidePictureButton = () => {
        return (
            <div>
                {buttonStatus.upload ? <><Button variant="contained" component="label" fullWidth>
                    Upload
                    <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        onChange={handlePicture}
                    />
                </Button></> :
                    <><Button variant="contained" onClick={handleSavePicture} color="primary">
                        Save
                    </Button>
                        <Button variant="contained" onClick={handleDiscard}>
                            Discard
                        </Button></>}
            </div>
        )
    }

    const handleSavePicture = async () => {
        var formData = new FormData();
        formData.append('offerid', offerId);
        formData.append('oldicon', oldIcon);
        formData.append('icon', icon.bytes);
        var response = await postData('offer/edit_image', formData);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Icon Edited Successfully",
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        setButtonStatus({ upload: true })
        setOpen(false)
        fetchOffers()
    }

    const handleDiscard = () => {
        setIcon({ filename: prevIcon, bytes: '' });
        setButtonStatus({ upload: true });
    }

    const handleEdit = async () => {
        var body = { offerid: offerId, title: title, description: description }
        var response = await postData('offer/edit_data', body);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Icon Edited Successfully",
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        setOpen(false)
        fetchOffers()
    }

    const handleDelete = async () => {
        var body = { offerid: offerId, oldicon: oldIcon }
        var response = await postData('offer/delete_data', body);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "Icon Edited Successfully",
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
        setOpen(false)
        fetchOffers()
    }

    const handleClose = () => {
        setOpen(false)
    }

    const offerDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit"}
                </DialogTitle>
                <DialogContent>
                    <div className={classes.mainContainer}>
                        <div className={classes.box}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={classes.headingStyle}>
                                    <div className={classes.center}>
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
                                    {showHidePictureButton()}
                                </Grid>
                                <Grid item xs={6} className={classes.center}>
                                    <Avatar
                                        alt="Category Icon"
                                        src={icon.filename}
                                        variant="rounded"
                                        sx={{ width: 130, height: 56 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleEdit} variant="contained" fullWidth>
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleDelete} variant="contained" fullWidth>
                                        Delete
                                    </Button>
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


    return (
        <div>
            {DisplayOffers()}
            <div>
                {offerDialog()}
            </div>
        </div>
    )

}