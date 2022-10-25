import React, { memo } from "react"

import {
    IconButton,
    Grid,
    Menu,
    MenuItem,
    Fade 
} from "@mui/material"

import { useTheme } from '@mui/material/styles';
import {
    FiTag
} from "react-icons/all"
import MenuOne from "components/menu";


import Tags from "views/pages/exercicios/labels";

const Labes = ({
    listId
}) => {

    const theme = useTheme()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    

    return (
        <>
            <IconButton onClick={handleClick} >
                <FiTag size={25} color={theme.palette.simples.white} />
            </IconButton>
            <MenuOne
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            >
                <Grid
                    width={300}
                    minHeight={150}
                    container
                    gap={2}
                    p={2}
                    xs={12}>
                    <Tags listId={listId}/>
                </Grid>
            </MenuOne>
        </>
    )
}

export default memo(Labes)