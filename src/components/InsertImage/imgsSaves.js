import { Button, Grid, Typography } from "@mui/material"
import React from "react"

import taken_empty from "assets/images/ilustrations/taken_empty.svg"


const ImgsSaves = () => {
    return(
        <Grid color="white" container xs={12} gap={3} justifyContent="center" alignItems="center" minHeight="50vh" flexDirection={"column"}>
            <img src={taken_empty} style={{ width: 250, margin: 20 }}/>
            <Button variant="contained">Procurar</Button>
        </Grid>
    )
}

export default ImgsSaves;