import React, { useState } from "react"

import { Grid, IconButton, Input, Typography, Tooltip, Box, Button, Modal, TextField, Stack, CircularProgress } from "@mui/material"

import { useTheme } from '@mui/material/styles';

import { v4 } from "uuid";

import { toast, Slide } from "react-toastify"
import useTasks from "contexts/task"
import useActivity from "contexts/Activity"

import { RemoteServices } from "services";

const AddProject = ({ open, setOpen, reload }) => {
    const theme = useTheme()
    const { setTaskSelected } = useTasks()
    const { 
        ListActivity, 
        setListActivity,
        ListActivitySelected, 
        setListActivitySelected
    } = useActivity()

    const [projectName, setProjectName] = useState("")
    const [gabarito, setGabarito] = useState(false)
    const [scoreTextValue, setScoreTextValue] = useState('10')

    const [LoadingCreateActivity, setLoadingCreateActivity] = useState(false)

    const handleClose = () => setOpen(false);


    const createNewProject = async () => {
        setLoadingCreateActivity(true)
        RemoteServices.Teachers.CreateActivity()
            .then((ActivityResponse) => {
                RemoteServices.Teachers.ActivityLists()
                .then((responseListActivity) => {
                    const ActivityLists = responseListActivity?.activityLists

                    if(ActivityLists){
                       const currentCreate =  ActivityLists.find(list => list.id === ActivityResponse.listId)
                       setListActivitySelected(currentCreate)
                        setListActivity(ActivityLists)
                    }
                    
                })
                handleClose()
                toast.info('Projeto Criado!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => {
                setLoadingCreateActivity(false)
            })

        // let NewTitleProject = projectName ? projectName : 'New Project'
        // const TitleUseds = JSON.parse(localStorage.getItem("@projects-tasks"))
        // let count = 0
        // if (TitleUseds) {
        //     TitleUseds.forEach((e, i) => {
        //         if (e.title === NewTitleProject) {
        //             count += 1

        //         }
        //         for (let i = 0; i < TitleUseds.length; i++) {
        //             if (e.title === `${NewTitleProject} (${i})` || e.title === `${NewTitleProject} (${count})`) {
        //                 count += 1
        //             }
        //         }
        //     })
        //     if (count > 0) {
        //         NewTitleProject = `${NewTitleProject} (${count})`
        //     }
        // }
        // const newData = {
        //     title: NewTitleProject,
        //     id: v4(),
        //     gabarito: gabarito,
        //     scoreValue: scoreTextValue,
        //     content: {
        //         cabecalho: {
        //             logo: '',
        //             institutionName: '',
        //             instructions: '',
        //             frase: '',
        //             border: false,
        //             cabecalhoItemsisActive: {
        //                 name: true,
        //                 date: true,
        //                 yaer: true,
        //                 class: true,
        //                 teacher: true,
        //                 disciplinary: true,
        //                 phrase: true,
        //                 instructions: true
        //             }
        //         },
        //         questions: []
        //     }
        // }
        // const oldItm = JSON.parse(localStorage.getItem("@projects-tasks"))
        // if (oldItm) {
        //     localStorage.setItem('@projects-tasks', JSON.stringify([newData, ...oldItm]));
        // }
        // else {
        //     localStorage.setItem('@projects-tasks', JSON.stringify([newData]));
        // }
        // setTaskSelected(newData)
        // handleClose()
        // toast.info('Projeto Criado!', {
        //     position: "bottom-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
        // setProjectName("")
        // setGabarito("")
        // setScoreTextValue("10")
        // reload()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    bgcolor: theme.palette.background.bg800
                }}
                className="modal-container">
                <Typography id="modal-modal-title" variant="h2" color={theme.palette.simples.white} component="h2">
                    Criar novo projeto
                </Typography>
                <Grid container justifyContent={"space-between"}>

                    <Button color="error" variant="contained" sx={{ mt: 3, width: 150 }} onClick={handleClose}>Cancelar</Button>

                    <Button 
                    disabled={LoadingCreateActivity}
                    variant="contained" sx={{ mt: 3, width: 150 }} onClick={createNewProject}>
                    {LoadingCreateActivity ? <CircularProgress size="sm" /> : "Criar"}
                    </Button>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AddProject