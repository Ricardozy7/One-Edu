import React, { useState } from "react"

import { Grid, Typography, IconButton } from "@mui/material"

import { BsArrowUpRightSquare } from "react-icons/all"


const NextEvents = () => {
    return(
        <Grid container className="glass" sx={{
            width: 345,
            p: 2,
            borderRadius: 5,
            mt: -1
        }}>
        <Typography variant="h3" color="white"> Lembretes programados </Typography>
    </Grid>
    )
}

export default NextEvents