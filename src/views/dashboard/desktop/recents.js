import React, { useState } from "react"

import { Grid, Typography} from "@mui/material"

import Shortcuts from "./shortcuts"


const DesktopMain = () => {
    return(
        <Grid px={2} py={1} maxHeight={350}  minWidth={'40%'} >
            <Typography variant="h3" color="white" sx={{ mb: 2 }}> Acessados Recentemente </Typography>
        </Grid>
    )
}

export default DesktopMain