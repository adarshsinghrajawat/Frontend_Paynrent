import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "./ModelCss";
import { getData, postData, ServerURL } from "../../Services/FetchBackendData"
import Swal from "sweetalert2";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useNavigate } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";


export default function Model(props) {

  const classes = useStyles();
  var [modelId, setModelId] = useState('');
  var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  var [categoryName, setCategoryName] = useState('');
  var [categoryId, setCategoryId] = useState('');
  var [subCategoryId, setSubCategoryId] = useState('');
  var [companyId, setCompanyId] = useState('');
  var [categoryList, setCategoryList] = useState([]);
  var [subCategoryList, setSubCategoryList] = useState([]);
  var [companyList, setCompanyList] = useState([]);
  var [modelName, setModelName] = useState('');
  var [year, setYear] = useState('');

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

  const handlePicture = (event) => {
    setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
  }

  const handleSubmit = async () => {
    var formData = new FormData();
    formData.append('modelid', modelId);
    formData.append('categoryid', categoryId);
    formData.append('subcategoryid', subCategoryId);
    formData.append('companyid', companyId);
    formData.append('modelname', modelName);
    formData.append('year', year);
    formData.append('icon', icon.bytes);
    var response = await postData('model/submit', formData);
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
  }

  const fillCompanyDropDown = () => {
    return companyList.map((item) => {
      return (
        <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
      )
    })
  }


  return (
    <div className={classes.box}>
      <div className={classes.center}>
        <Grid spacing={2} container>
          <Grid item xs={12} className={classes.headingStyle}>
            Model Interface
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
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
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
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
          <Grid item xs={6}>
            <TextField fullWidth label="Model Name" onChange={(event) => setModelName(event.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Year" onChange={(event) => setYear(event.target.value)} />
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
