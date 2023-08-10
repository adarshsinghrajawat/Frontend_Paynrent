import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';


export default function Sidebar(props){

    const navigate = useNavigate();

    return(
        <div style={{marginTop: 5}}>
            <React.Fragment>
                <ListItemButton onClick={()=>navigate('/dashboard/display_category')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/display_subcategory')}>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sub Category" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/display_company')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/featureinterface')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Features" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/display_offers')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Offers" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/models')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="models" />
                </ListItemButton>
                <ListItemButton onClick={()=>navigate('/dashboard/vehicles')}>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="vehicles" />
                </ListItemButton>
            </React.Fragment>

            <React.Fragment>
                <ListSubheader component= "div" inset>
                    User Report
                </ListSubheader>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current Month" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last Quarter" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end Sale" />
                </ListItemButton>
            </React.Fragment>
        </div>
    )
}