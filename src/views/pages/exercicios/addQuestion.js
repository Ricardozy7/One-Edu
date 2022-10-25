import React from "react"

import { Grid, IconButton, Input, Typography, Tooltip, Box, Button, Modal, TextField } from "@mui/material"

import { useTheme } from '@mui/material/styles';

import { FaPlus, FiEdit2, FiHelpCircle } from "react-icons/all"

import { Helps } from "utils/helps";

const AddQuestion = ({ open, setOpen }) => {
    const theme = useTheme()

    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal-container">
                <Typography id="modal-modal-title" variant="h2" color={theme.palette.simples.white} component="h2">
                    Adicionar Questão
                </Typography>
                <TextField 
                sx={{ width: '100%' }}
                id="filled-basic" label="Titulo" variant="filled" />
            </Box>
        </Modal>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: '#332F71',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

export default AddQuestion