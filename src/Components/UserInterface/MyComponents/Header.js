import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ServerURL, getData, postData } from '../../Services/FetchBackendData';

export default function Header(props) {

    const [categoryList, setCategoryList] = useState([]);
    const [ subCategoryList, setSubCategoryList] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const fetchAllCategory = async () => {
        var response = await getData('user/display_category');
        setCategoryList(response.data)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fetchAllSubCategory = async (cid) => {
        var body = {categoryid: cid}
        var response = await postData('user/fetch_subcategory_by_category', body)
        setSubCategoryList(response.data)
    }

    const showMainMenu = () => {
        return categoryList.map((item) => {
            return (
                <Button value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>
            )
        })
    }

    const showSubMenu=()=>{
        return subCategoryList.map((item)=>{
            return(
                <MenuItem onClick= {handleClose} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            )
        })
    }

    const handleClick = (event) => {
        fetchAllSubCategory(event.currentTarget.value)
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="inherit">
                <Toolbar>

                    <img src='/assets/logo.png' style={{ width: 70, padding: 3 }} />
                    <Box component="div" sx={{ flexGrow: 1 }}>
                    </Box>
                    <Box>
                        {showMainMenu()}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {showSubMenu()}
                        </Menu>
                    </Box>
                    <Button variant='inherit'>Login or SignUp</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}