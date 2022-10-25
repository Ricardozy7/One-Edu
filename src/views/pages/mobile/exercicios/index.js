import React, { useState } from "react"

import {
    IconButton,
    Grid,
    Typography,
    Button,
    TextField,
    Switch
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';

import Header from "./header";
import Cabecalho from "./cabecalho";
import LabelBottomNavigation from "./bottomNavigaton";
import Question from "./Question";

const MobileExercicios = () => {
    const theme = useTheme()
    return(
        <Grid xs={12}
        sx={{background: 'radial-gradient(90.6% 42.26% at 50% 50%, rgba(0, 240, 255, 0.2) 0%, rgba(0, 240, 255, 0) 100%), #15133F'
        }}
        >
            {/* <Grid className="background"/> */}
            <Header />
            <Cabecalho />
            <Question />
            <LabelBottomNavigation />
        </Grid>
    )
}

export default MobileExercicios;