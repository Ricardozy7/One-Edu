import React from "react"

import { Link } from "react-router-dom"

import { Grid, Typography, Button, IconButton } from "@mui/material"

import { useTheme } from '@mui/material/styles';

import EditText from "assets/images/icons/edit-text.svg"

import { BsPencilSquare } from "react-icons/all"



const Shortcuts = () => {

    const theme = useTheme()

    return (
        <>
            <Grid sx={{ maxWidth: 300, pr: 5, borderRight: 'solid 1px #303D6E', maxHeight: 350 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h3" color="white" sx={{ mb: 2 }}>Atalhos</Typography>
                    <IconButton sx={{ mb: 2 }}>
                        <BsPencilSquare color="#fff" />
                    </IconButton>
                </Grid>
                <Button LinkComponent={Link} to="/t/novo-exercicio" variant="contained" fullWidth sx={{ ...styleButton }}>Novo exercicio</Button>
                <Button variant="contained" fullWidth sx={{ ...styleButton }}>Novo lembrete</Button>
                <Button variant="contained" fullWidth sx={{ ...styleButton }}>Adcionar evento</Button>
                <Button variant="contained" fullWidth sx={{ ...styleButton }}>Acessar notas</Button>
                <Button variant="contained" fullWidth sx={{ ...styleButton }}>Plano de aula</Button>
            </Grid>

        </>
    )
}

const styleButton = {
    p: 1,
    m: 1,
    color: 'white',
    background: "linear-gradient(to right, #3f3d7d 0%, #475a85 100%)",
    backdropFilter: 'blur( 13.5px )',
    ' -webkit-backdrop-filter': 'blur( 13.5px )',
    borderRadius: 2,
    ':focus': {
        background: "linear-gradient(to right, #3f3d7d 0%, #475a85 100%)",
    },
    ':hover': {
        background: "linear-gradient(to right, #3f3d7d95 0%, #475a8595 100%)",
    }
}

export default Shortcuts