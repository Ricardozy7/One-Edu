import { Button, Grid, Typography } from "@mui/material"
import React from "react"

import upload_re_pasx from "assets/images/ilustrations/upload_re_pasx.svg"


const PostingImg = ({
    AddImgQuestion, setOpen
}) => {
    return (
        <Grid color="white" container xs={12} gap={3} justifyContent="center" alignItems="center" minHeight="50vh" flexDirection={"column"}>
            <img src={upload_re_pasx} style={{ width: 250, margin: 20 }} />
            <Button 
            component="label"
            onClick={() => {
            }} variant="contained">Procurar
                <input
                    hidden accept="image/*" type="file"
                    onChange={AddImgQuestion} />
            </Button>
        </Grid>
    )
}

export default PostingImg;