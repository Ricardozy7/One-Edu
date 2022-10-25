import React, { useState } from "react"

import { useTheme } from '@mui/material/styles';
import {
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@mui/material';


import { FaBell } from "react-icons/all"

import useAuth from "contexts/auth"

import profile from "assets/images/profile.jpg"
import Gear from "assets/images/icons/configuraçõe.svg"


const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    const { logout } = useAuth()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Grid
                className="mobile"
                container
                alignItems="center"
                justifyContent={"space-between"}
                style={{
                    position: 'absolute',
                    padding: 10,
                }}
            >
                <Grid width="50%" container alignItems="center" flexDirection="row">
                    <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        overflow: 'hidden'
                    }}>

                        <img src={profile} width={50} />
                    </div>
                    <div>
                        <Typography ml={2} variant="h4" color="white">Olá, Fulano</Typography>
                        <Typography ml={2} variant="h6" color="white">R$ 15,00</Typography>

                    </div>
                </Grid>
                <Grid width="100%" mt={-6} container alignItems="center" justifyContent={"end"}>
                    <IconButton 
                    onClick={handleClick}
                    sx={{
                        mr: 3
                    }}>
                        <img src={Gear} width={30} />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={logout}><div style={{ color: "#fff" }}>Logout</div></MenuItem>
                    </Menu>
                    <IconButton>
                        <FaBell color='#fff' />
                    </IconButton>
                </Grid>

            </Grid>
        </>
    );
};
export default Header;
