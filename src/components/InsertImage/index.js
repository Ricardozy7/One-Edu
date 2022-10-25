import React, { useEffect, useState, memo } from "react"
import { Box, Typography } from "@mui/material"
import ModalComponent from "components/Modal"

import useActivity from "contexts/Activity"

import TabPanel from "./Tabs"

const InsertImage = ({
    open, setOpen, AddImgQuestion, AddImgQuestionLink
}) => {
    const { ListActivitySelected } = useActivity()
    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
        >
            <Box sx={{ p: 2, width: '70vw' }}>
                <Typography>Insirir imagem</Typography>
            </Box>
            <TabPanel 
            AddImgQuestion={AddImgQuestion} 
            setOpen={setOpen}
            AddImgQuestionLink={AddImgQuestionLink}
            questionId={ListActivitySelected.id}
            />
        </ModalComponent>
    )
}

export default memo(InsertImage)