import * as React from 'react';
import { styled } from '@mui/material/styles';

import {
    IconButton,
    Grid,
    Menu,
    MenuItem,
    Fade,
    Typography
} from "@mui/material"

import { useTheme } from '@mui/material/styles';


export default function MenuOne({
    children,
    anchorEl,
    setAnchorEl
}) {
    const open = Boolean(anchorEl);
    const theme = useTheme()
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Menu
            id="fade-menu"
            MenuListProps={{
                'aria-labelledby': 'fade-button',


            }}
            PaperProps={{
                style: {
                    backgroundColor: theme.palette.background.bg800,
                    p: 1,
                    borderRadius: '3px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 400

                },
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            
            {children}
        </Menu>
    )
}