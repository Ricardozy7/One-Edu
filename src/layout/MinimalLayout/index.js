import { Outlet } from 'react-router-dom';

import Customization from '../Customization';

import { Grid } from "@mui/material"

const MinimalLayout = () => (
    <>
        <Outlet />
        <Customization />
    </>
);

export default MinimalLayout;
