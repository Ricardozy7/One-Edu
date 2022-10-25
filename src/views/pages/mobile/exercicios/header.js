import React from "react"

import {
    IconButton,
    Grid,
} from "@mui/material"

import { useTheme } from '@mui/material/styles';

import { FiArrowLeft, FiCornerUpLeft, FiCornerUpRight, FiCheck } from "react-icons/all"


const Header = () => {
    const theme = useTheme()
    return (
        <Grid
            xs={12}
            height={75}
            container
            alignItems={"center"}
            bgcolor={"#28256E"}
            justifyContent="space-between"
            flexDirection="row">
            <Grid display={'flex'}>
                <IconButton>
                    <FiArrowLeft color="white" />
                </IconButton>
                <h3 style={{ borderBottom: 'dotted 1px #fff', color: 'white' }}>
                    Nova Atividade
                </h3>
            </Grid>
            <Grid>
                <IconButton>
                    <FiCornerUpLeft color="white" />
                </IconButton>
                <IconButton>
                    <FiCornerUpRight color="white" />
                </IconButton>
                <IconButton>
                    <FiCheck color="white" />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default Header;