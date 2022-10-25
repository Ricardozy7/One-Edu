import { useEffect, useState } from 'react';
import { Grid, Box, Modal, Typography, Button } from '@mui/material';

import { gridSpacing } from 'store/constant';

import Mobile from "views/dashboard/Mobile"

import Desktop from "views/dashboard/desktop"

import useAuth from "contexts/auth"

import { RemoteServices } from "services"

const Dashboard = () => {

    const { setMe, logout } = useAuth()

    useEffect(() => {
        // RemoteServices.Teachers.Me()
        // .then(e => {
        //     if(e.error){
        //         e.error === 'Token expirado' && logout()
        //     }
        //     setMe(e)
        // })
    },[])

    return (
        <Grid >
            <Mobile />
            <Desktop />
        </Grid>
    );
};


export default Dashboard;
