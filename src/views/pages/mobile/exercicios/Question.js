import React, { useState } from "react"

import {
    IconButton,
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    Switch
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';

import { FiArrowLeft, FiCornerUpLeft, FiCornerUpRight, FiCheck } from "react-icons/all"


const QuestionAdd = () => {
    const theme = useTheme()
    return (
        <Grid
            xs={11}
            m={2}
        >
            <Grid position="relative">
                <GridEffect />
                <BtnAddQuestion fullWidth>
                    <Typography sx={{ position: 'absolute', zIndex: 10 }} color="white">
                        Adcionar Questão
                    </Typography>
                </BtnAddQuestion>
            </Grid>

        </Grid>
    )
}

export default QuestionAdd;

const BtnAddQuestion = styled(Button)(({ theme }) => ({
    borderRadius: '5px',
    padding: 25
})
)

const GridEffect = styled(Button)(({ theme }) => ({
    backgroundColor: '#D9D9D9',
    mixBlendMode: 'soft-light',
    position: 'absolute',
    width: '100%',
    height: '100%'
}))
  