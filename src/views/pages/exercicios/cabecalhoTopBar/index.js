import React, { useEffect, useState } from "react"

import {
    Grid,
    Button,
    Typography,
    IconButton,
    CircularProgress,
    Modal,
    MenuItem
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';

import CustomizedSelect from "components/select"

import { FiTrash } from "react-icons/all"

import { Fonts } from "utils/fonts"

import useTasks from "contexts/task"
import useActivity from "contexts/Activity"
import { v4 } from "uuid"
import MenuOne from "components/menu";

const CabecalhoTopBar = ({
    reload,
    TaskSelected,
    setTaskSelected,
    EditProject,
    setHasBorder,
    hasBorder
}) => {

    const {
        TaskFonts,
        setTaskFonts
    } = useTasks()
    const theme = useTheme()
    const [modelsSaved, setmodelsSaved] = useState([])
    const [modelsSavedSelected, setModelsSavedSelected] = useState(0)

    const [saveModel, setSaveModel] = useState(0)

    const [FontsItems, setFotnsItems] = useState([{
        title: 'Selecionar fonte', value: 0
    }])
    const [FontsItemsSelected, setFontsItemsSavedSelected] = useState(0)

    const [LoadingSave, setLoadingSave] = useState(false)
    const [OpenModalSave, setOpenModalSave] = useState(null)

    const { cabecalho, setCabecalho, ListActivitySelected } = useActivity()



    const deleteTask = () => {
        const items = JSON.parse(localStorage.getItem("@projects-tasks")).
            filter(item => item.id !== TaskSelected.id)

        localStorage.setItem('@projects-tasks', JSON.stringify(items));
        if (items) {
            setTaskSelected(items[0])
        } else {
            setTaskSelected(null)
        }
        reload()
    }

    useEffect(() => {
        setTaskFonts([...FontsItems, ...Fonts])
        
    }, [])


    const editProjectCabecalho = (key, field, value) => {
        EditProject(key, field, value)
        reload()
    }

    const SaveModelCabecalho = async () => {
        try {
            setLoadingSave(true)
            let updateListCabecalho = []
            let updateList = []
            const ItemsCabecalho = JSON.parse(localStorage.getItem("@models-cabecalho"))

            const tasks = JSON.parse(localStorage.getItem("@projects-tasks")).
                filter(item => item.id !== TaskSelected.id)

            const NewItemsCabecalho = JSON.parse(localStorage.getItem("@projects-tasks")).
                filter(item => item.id === TaskSelected.id)

            const newSavedItemCabecalho = {
                ...NewItemsCabecalho[0].content.cabecalho,
                id: v4()
            }

            if (ItemsCabecalho) {
                ItemsCabecalho.map((e) => {
                    // delete e.id
                    // let t = delete newSavedItemCabecalho.id
                    const a = { ...e, id: null }
                    const r = { ...newSavedItemCabecalho, id: null }
                    if (a === r) {
                        alert('Um modelo já existe contendo as mesmas propriedades!')
                        setLoadingSave(false)
                        return
                    }
                })
            }

            if (ItemsCabecalho) {
                updateListCabecalho.push(newSavedItemCabecalho, ...ItemsCabecalho)
            } else {
                updateListCabecalho.push(newSavedItemCabecalho)
            }
            localStorage.setItem('@models-cabecalho', JSON.stringify(updateListCabecalho));
            setLoadingSave(false)

        } catch (error) {
            alert(`${error}`)
        }

    }

    const SelectCabecalhoSave = (value) => {
        let updateList = []
        if (value === 0) {
            return
        }
        const tasks = JSON.parse(localStorage.getItem("@projects-tasks")).
            filter(item => item.id !== TaskSelected.id)
        const tasksSelcted = JSON.parse(localStorage.getItem("@projects-tasks")).
            filter(item => item.id !== TaskSelected.id)

        const updateTaks = {
            ...tasksSelcted[0],
            id: v4(),
            content: {
                cabecalho: value
            }
        }

        if (tasks) {
            updateList.push(updateTaks, ...tasks)
        } else {
            updateList.push(updateTaks)
        }
        localStorage.setItem('@projects-tasks', JSON.stringify(updateList));
        setTaskSelected(updateTaks)
        reload()
    }


    useEffect(() => {
        const AddlistModels = []
        // localStorage.setItem('@models-cabecalho', JSON.stringify(updateListCabecalho));
        const Models = JSON.parse(localStorage.getItem('@models-cabecalho'))

        if (Models) {
            Models.map((e) => {
                AddlistModels.push({
                    title: e.id, value: e
                })
            })
        }

        setmodelsSaved([
            {
                title: 'Modelos Salvos', value: 0
            },
            ...AddlistModels
        ])

    }, [])

    return (
        <Grid className="task-bar-component" >
            <Grid container alignItems="center">
                <Grid>
                    <CustomizedSelect
                        items={modelsSaved}
                        value={modelsSavedSelected}
                        defaultValue={0}
                        onChange={e => {
                            setModelsSavedSelected(e.target.value);
                            SelectCabecalhoSave(e.target.value)
                            // setTaskFonts(e.target.value)
                        }}
                    />
                </Grid>
                <Grid m={1}>
                    {
                        LoadingSave ?
                            <CircularProgress size={20} /> :
                            // <Button onClick={SaveModelCabecalho}>
                            //     <Typography color="white">Salvar</Typography>
                            // </Button>

                            // <CustomizedSelect
                            //     items={[
                            //         { title: 'Salvar', value: 0 },
                            //         { title: 'Salvar modelo', value: 'saveModal' },
                            //         { title: 'Salvar Modelo no computador', value: 'saveModalPc' }
                            //     ]}
                            //     value={saveModel}
                            //     defaultValue={0}
                            //     onChange={e => {
                            //         setSaveModel(e.target.value);
                            //         // SelectCabecalhoSave(e.target.value)
                            //         // setTaskFonts(e.target.value)
                            //     }}
                            // />
                            <>
                            <Button 
                            sx={{
                                backgroundColor: saveModel ? '#383A8E' : 'transparent'
                            }}
                            onClick={(event) => {
                                setSaveModel(event.currentTarget);
                                console.log(ListActivitySelected)
                            }}>
                                 <Typography color="white">Salvar</Typography>
                            </Button>
                            <MenuOne
                                anchorEl={saveModel}
                                setAnchorEl={setSaveModel}
                            >
                                <Grid width={200} container alignItems="center" sx={{
                                    wordBreak: 'break-word'
                                }}>
                                    <MenuItem
                                    sx={{ 
                                        width: '100%',
                                        alignItems: "center",
                                        display: 'flex'
                                     }}
                                    >Salvar modelo</MenuItem>
                                    <MenuItem
                                     sx={{ 
                                        width: '100%',
                                        alignItems: "center",
                                        display: 'flex',
                                        wordBreak: 'break-word'
                                     }}
                                    >Salvar Modelo no<br/> computador</MenuItem>
                                </Grid>
                            </MenuOne>
                            </>
                    }

                </Grid>
                <Grid >
                    <Button >
                        <Typography color="white">Tornar modelo padrão</Typography>
                    </Button>
                </Grid>
                <Grid >
                    <Button
                        sx={{
                            backgroundColor: hasBorder ? theme.palette.secondary.main + 40 : 'transparent'
                        }}
                        onClick={() => editProjectCabecalho('cabecalho', 'border', !hasBorder)}>
                        <Typography color={hasBorder ? theme.palette.primary.main : 'white'}>Adicionar contorno</Typography>
                    </Button>
                </Grid>
                <Grid>
                    <CustomizedSelect
                        items={Fonts}
                        value={TaskFonts}
                        onChange={e => setTaskFonts(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid>
                <IconButton onClick={deleteTask}>
                    <FiTrash color="white" />
                </IconButton>
            </Grid>
            <SaveModal
                open={OpenModalSave}
                setOpen={setOpenModalSave}
            />
        </Grid>
    )
}

export default CabecalhoTopBar;


const SaveModal = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(null)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid>
                <Typography>
                    Salvar como
                </Typography>
            </Grid>
        </Modal>
    )
}