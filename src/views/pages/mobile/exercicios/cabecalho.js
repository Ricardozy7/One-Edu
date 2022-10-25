import React from "react"
import { Link } from "react-router-dom"

import {
    Grid,
    Typography,
    Button,
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';

import { FiArrowLeft, FiCornerUpLeft, FiCornerUpRight, FiCheck } from "react-icons/all"


const Cabecalho = () => {
    const theme = useTheme()
    return (
        <Grid
            component={Button}
            LinkComponent={Link}
            to="/t/exercicio-cabecalho"
            xs={11}
            m={2}
            container
            height={60}
            alignItems={"center"}
            justifyContent="center"
            border="2px dashed white"
            borderRadius={"5px"}
        >
            <Typography color="white">Click aqui para editar o cabecalho</Typography>
        </Grid>
    )
}

export default Cabecalho;