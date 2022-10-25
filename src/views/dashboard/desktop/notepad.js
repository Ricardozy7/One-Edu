import React, { useState } from "react"

import { Grid, TextField, Typography } from "@mui/material"

import Note from "components/notepade"

const Notepade = () => {
    return (
        <Grid sx={{ width: '65%', mt: 2 }}>
            <Note />
        </Grid>
    )
}

export default Notepade