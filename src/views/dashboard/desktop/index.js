import React, { useState } from "react"

import { Grid } from "@mui/material"

import Shortcuts from "./shortcuts"
import Recents from "./recents"
import Tasks from "./tasks"
import Notepade from "./notepad"
import StickyNotes from "./stickyNotes"
import NextEvents from "./nextEvents"


const DesktopMain = () => {
    return (
        <Grid width={"100%"} position="relative" height="100%" overflowY={"scroll"} className="desktop" >
            <Grid justifyContent="space-between" container xs={12}>
                <Grid width={'77%'} container>
                    <Shortcuts />
                    <Recents />
                    <Grid justifyContent="space-between" width={'100%'} container>
                        <Notepade />
                        <StickyNotes />
                        {/* <NextEvents /> */}
                    </Grid>
                </Grid>
                <Tasks />
            </Grid>

        </Grid>
    )
}

export default DesktopMain