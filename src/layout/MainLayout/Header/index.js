import React, { useEffect, useState } from "react"

import { useTheme } from '@mui/material/styles';
import {
    Grid,
    IconButton,
    Typography,
    Menu,
    MenuItem
} from '@mui/material';


import { FaBell, FiLogOut } from "react-icons/all"

import useAuth from "contexts/auth"

import profile from "assets/images/profile.jpg"
import Gear from "assets/images/icons/configuraçõe.svg"

import { toCashBR } from "utils/functionTools"

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();

    const { logout, me } = useAuth()

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
                className='desktop'
                container
                alignItems="center"
                justifyContent={"space-between"}
                style={{
                    position: 'absolute',
                    padding: 25
                }}
            >
                <Grid width="50%" position={"fixed"} container alignItems="center" flexDirection="row">
                    <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        overflow: 'hidden',
                        backgroundColor: theme.palette.secondary.main,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {
                            me?.personal_data?.photo_uri?.length > 0 ?
                                <img src={me?.personal_data?.photo_uri} width={50} /> :
                                <div style={{ fontSize: 20, fontWeight: 'bold', color: theme.palette.background.paper }}>
                                    {/* {me?.personal_data?.name[0]} */}
                                </div>
                        }

                    </div>
                    <div><Typography ml={2} variant="h4" color="white">Olá, {me?.personal_data?.name}</Typography></div>
                </Grid>
                <Grid width="100%" container alignItems="center" justifyContent={"end"}>
                    <Grid
                        container
                        justifyContent={"center"}
                        alignItems="center"
                        sx={{
                            width: 150,
                            height: 50,
                            background: '#D9D9D910',
                            borderRadius: 50,
                            color: theme.palette.secondary.main,
                            "-webkit-backdrop-filter": "blur( 13.5px )"
                        }}>
                        <Typography color={theme.palette.success.main} variant="h4"> {me.credits ? toCashBR(me.credits) : 'R$ 0'} </Typography>
                    </Grid>
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
                        <MenuItem onClick={logout}>
                            <FiLogOut color="#fff" />
                            <Typography color="white" ml={2}>Logout</Typography>
                        </MenuItem>
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
