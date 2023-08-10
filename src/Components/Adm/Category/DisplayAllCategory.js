import MaterialTable from "@material-table/core";
import { useState, useEffect } from "react";
import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import {
  ServerURL,
  getData,
  postData,
  isValidAuth,
} from "../../Services/FetchBackendData";
import { useStyles } from "./DisplayAllCategoryCss";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

export default function DisplayAllCatergory(props) {
  const classes = useStyles();
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  var [categoryId, setCategoryId] = useState("");
  var [categoryName, setCategoryName] = useState("");
  var [icon, setIcon] = useState({
    filename: "/assets/defaultCar.png",
    bytes: "",
  });
  var [buttonStatus, setButtonStatus] = useState({ upload: true });
  var [prevIcon, setPrevIcon] = useState("");
  var [oldIcon, setOldIcon] = useState("");

  const fetchAllCategory = async () => {
    var result = await getData("category/display_category");
    setCategory(result.data);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleSetDataForDialog = (rowData) => {
    setCategoryId(rowData.categoryid);
    setCategoryName(rowData.categoryname);
    setOldIcon(rowData.icon);
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: "" });
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`);
    setOpen(true);
  };

  const showHidePictureButton = () => {
    return (
      <div>
        {buttonStatus.upload ? (
          <>
            <Button fullWidth variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handlePicture}
              />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleSavePicture}
              color="primary"
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleDiscard}>
              Discard
            </Button>
          </>
        )}
      </div>
    );
  };

  const handleSavePicture = async () => {
    var formData = new FormData();
    formData.append("categoryid", categoryId);
    formData.append("oldicon", oldIcon);
    formData.append("icon", icon.bytes);
    var response = await postData("category/edit_icon", formData);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Icon Edited Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setButtonStatus({ upload: true });
    setOpen(false);
    fetchAllCategory();
  };

  const handleEditData = async () => {
    var body = { categoryid: categoryId, categoryname: categoryName };
    var response = await postData("category/edit_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Icon Edited Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setOpen(false);
    fetchAllCategory();
  };

  const handleDelete = async () => {
    var body = { categoryid: categoryId, oldicon: oldIcon };
    var response = await postData("category/delete_data", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Icon Edited Successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    setOpen(false);
    fetchAllCategory();
  };

  const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: "" });
    setButtonStatus({ upload: true });
  };

  function displayCategory() {
    return (
      <MaterialTable
        title="Category Data"
        columns={[
          { title: "Category ID", field: "categoryid" },
          { title: "Category Name", field: "categoryname" },
          {
            title: "Icon",
            field: "icon",
            render: (rowData) => (
              <Avatar
                src={`${ServerURL}/images/${rowData.icon}`}
                style={{ width: 80, height: 56 }}
                variant="rounded"
              />
            ),
          },
        ]}
        data={category}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => handleSetDataForDialog(rowData),
          },
        ]}
      />
    );
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handlePicture = (event) => {
    setIcon({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setButtonStatus({ upload: false });
  };

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
            {"Category Interface"}
          </DialogTitle>
          <DialogContent>
            <div className={classes.box}>
              <div className={classes.center}>
                <Grid spacing={2} container>
                  <Grid item xs={12} className={classes.headingStyle}>
                    Category Interface
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      value={categoryName}
                      label="Category Name"
                      onChange={(event) => setCategoryName(event.target.value)}
                    />
                  </Grid>
                  <Grid xs={6} item>
                    {showHidePictureButton()}
                  </Grid>
                  <Grid item xs={6}>
                    <Avatar
                      alt="Category Icon"
                      src={icon.filename}
                      variant="rounded"
                      sx={{ width: 160, height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleEditData}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleDelete}
                    >
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
      </div>
    );
  };

  return (
    <div>
      <div>{displayCategory()}</div>
      {showDialog()}
    </div>
  );
}
