import React, { useEffect, useState, memo } from "react"
import { Typography, Grid } from "@mui/material"

import {
    Menu as MenuContext,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";

import OutputConlumns from "./outputConlumns";

const OutputColumns = ({
    val, index, col
}) => {

    const MENU_ID = `menu-id-${index}`

    const [valSelect, setValSelect] = useState(' ')

    const { show } = useContextMenu({
        id: MENU_ID,
    });

    function displayMenu(e) {
        show(e);
    }

    return (
        <Grid mt={2} xs={12} container alignItems="start">
            <Grid xs={6}>
                <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>({index + 1})</Typography>
                <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black', ml: 1 }}>{val.value}</Typography>
            </Grid>
            <Grid xs={5.5} ml={.5} container flexDirection="row">
                <Grid onClick={displayMenu} xs={1} position="relative" onContextMenu={show}>
                    <Typography  className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>({valSelect})</Typography>
                    <MenuContext
                        style={{
                            maxHeight: 400,
                            maxWidth: 200,
                            flexDirection: 'column',
                            overflowY: 'auto',
                            display: 'flex',
                            gap: 2,
                            zIndex: 999
                        }}
                        id={MENU_ID}>
                        {
                            col.map((a, i) => (
                                <Item
                                    onClick={() => setValSelect(i + 1)}
                                    style={{ color: 'white' }}>
                                    {i + 1}
                                </Item>
                            ))
                        }

                    </MenuContext>
                </Grid>
                <Grid xs={5}>
                    <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>{val.value2}</Typography>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default memo(OutputColumns);