import React, { useState } from "react"

import { Grid, Typography, IconButton } from "@mui/material"

import { BsArrowUpRightSquare } from "react-icons/all"


const StickyNote = () => {
    return (
        <Grid className="glass" sx={{ borderRadius: 5 }}  mt={2} minWidth={'33.5%'}  py={1} px={2}>
            <Grid container alignItems="center" justifyContent="space-between">
            <Typography variant="h3" color="white"> Lembretes programados </Typography>
            <IconButton>
                <BsArrowUpRightSquare color="#fff" size={20}/>
            </IconButton>
            </Grid>
        </Grid>
    )
}

export default StickyNote