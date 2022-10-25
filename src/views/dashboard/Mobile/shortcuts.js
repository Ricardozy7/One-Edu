import React from "react"
import { Grid, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

import { useTheme } from '@mui/material/styles';


const Shortcuts = () => {

    const theme = useTheme()

    return (
        <Grid xs={12} mt={2}>
            <Typography variant="h3" color="white" sx={{ mb: 2 }}>Atalhos</Typography>
            <Button LinkComponent={Link} to="/t/novo-exercicio-mobile" variant="contained" fullWidth sx={{ ...styleButton }}>Novo exercicio</Button>
            <Button variant="contained" fullWidth sx={{ ...styleButton }}>Novo lembrete</Button>
            <Button variant="contained" fullWidth sx={{ ...styleButton }}>Adcionar evento</Button>
            <Button variant="contained" fullWidth sx={{ ...styleButton }}>Acessar notas</Button>
            <Button variant="contained" fullWidth sx={{ ...styleButton }}>Plano de aula</Button>
        </Grid>
    )
}

const styleButton = {
    p: 2,
    m: 1,
    background: " rgba(255,255,255,0.20)",
    backdropFilter: 'blur( 13.5px )',
    ' -webkit-backdrop-filter': 'blur( 13.5px )',
    borderRadius: 2,
    ':focus': {
        background: " rgba(255,255,255,0.20)",
    }
}

export default Shortcuts