import React, { useState } from "react"

import {
    Grid,
    IconButton,
    Box,
    Modal,
    Fade,
    Backdrop
} from "@mui/material"

import { useTheme } from '@mui/material/styles';

import { FiX } from "react-icons/all"


const ModalComponent = ({ open, setOpen, children }) => {
    const theme = useTheme()

    const handleClose = () => setOpen(false);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropComponent={Backdrop}
            style={{
                zIndex: 999,
            }}
        >
            <Fade in={open}>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#00000080'

                }}>
                    <Box

                        sx={{
                            bgcolor: theme.palette.background.bg800,
                            color: "white",
                            display: "flex",
                            gap: 2,
                            flexDirection: "column",
                            zIndex: 999
                        }}
                        className="modal-container">
                        <Grid right={0} top={0} p={1} position="absolute">
                            <IconButton onClick={handleClose}>
                                <FiX color={theme.palette.error.main} />
                            </IconButton>
                        </Grid>
                        {children}
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ModalComponent
