import React, { useEffect, useState, memo, useRef } from "react"

import {
    Grid,
    IconButton,
    Input,
    Typography,
    Tooltip,
    Box,
    Button,

} from "@mui/material"

import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

import sortableIcon from "assets/images/icons/sortable-icon.svg"
 
import { useTheme } from '@mui/material/styles';

import { FaPlus, FiEdit2, FiHelpCircle, FiEye, FiEyeOff, FiX } from "react-icons/all"

import { Helps } from "utils/helps";

import TestItems from "components/testeEditor"

// import AddQuestion from "./addQuestion"

import Question from "./question";

import addImageIcon from "assets/images/icons/add-img.svg"

import useTasks from "contexts/task"
import { toast } from 'react-toastify';
import { v4 } from "uuid";
import CabecalhoTopBar from "./cabecalhoTopBar";
import { RemoteServices } from "services";
import { saveActivite } from "components/save";
import useActivity from "contexts/Activity";

const Cabecalho = ({
    projectSelected,
    setProjectSelected,
    reload,
    EditProject,
    ListActivitySelected,
    setListActivitySelected
}) => {

    const theme = useTheme()
    const { TaskSelected, setTaskSelected, Tasks, TaskFonts } = useTasks()

    const { Question, setQuestion, ListActivity, setListActivity, cabecalho,    } = useActivity()

    const [avatar, setAvatar] = useState(null)
    const [editNameProject, setEditNameProject] = useState(false)
    const [NameProject, setNameProject] = useState('')
    const [institutionName, setInstitutionName] = useState('')

    const [hasBorder, setHasBorder] = useState(false)


    const [AddQuestionModal, setAddQuestionModal] = useState(null)

    const [saving, setSalving] = useState(false)
    const toastId = useRef(null);

    const [cabecalhoItemsIsActivate, setCabecalhoItemsIsActivate] = useState({
        name: true,
        date: true,
        yaer: true,
        class: true,
        teacher: true,
        disciplinary: true,
        phrase: true,
        instructions: true
    })

    const onSortEnd = (oldIndex, newIndex) => {
        setQuestion((array) => arrayMoveImmutable(array, oldIndex, newIndex));
    };

    const logotipoImg = (e) => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setAvatar(reader.result)
            EditProject('cabecalho', 'logo', reader.result)
        }
        reader.readAsDataURL(files[0])
    }

    useEffect(() => {
        if (ListActivitySelected) {
            // setAvatar(TaskSelected?.content?.cabecalho?.logo)
            setNameProject(ListActivitySelected?.title)
            // setInstitutionName(TaskSelected?.content?.cabecalho?.institutionName)
            // setCabecalhoItemsIsActivate(TaskSelected?.content?.cabecalho?.cabecalhoItemsisActive)
            // setHasBorder(TaskSelected?.content?.cabecalho?.border)
        }
    }, [ListActivitySelected])
    const CloseButton = ({ closeToast }) => (
        <FiX color="red" onClick={closeToast} />
    );
    const editCabecalho = (key, value) => {
        const SavaCabecalho = saveActivite({ key, value, reload, ListActivitySelected })
        
        if (SavaCabecalho?.error) {
            setNameProject(ListActivitySelected?.title)
        }
        return
    }

    const AddQuestion = async (id) => {

        const itemM = []
        const updateList = []
        const NI = []
        let maior = 0
        if (Question) {
            Question.map(e => itemM.push(e))
            if (itemM.length > 0) {
                itemM.map(e => NI.push(e.numberQuestion))
                maior = Math.max.apply(null, NI);
            }
        }
        const nb = maior + 1
        const newQuestions = {
            activity_id: id,
            id: v4(),
            numberQuestion: nb,
            created: new Date(),
            perguntas: [],
            content: [
                // { type: "image | text"
                // img: { position: 'left', value: null }
            ],
            typeQuestion: null,
            fav: false
        }

        if (Question) {
            setQuestion([...Question, newQuestions])
        } else {
            setQuestion([newQuestions])
        }


    }

    useEffect(() => {

    }, [])

    return (
        <Grid paddingY={10} mx={3} container justifyContent={"center"}>
            {
                ListActivitySelected ?
                    <Grid maxWidth={1280}>
                        <Typography variant="h3" color="white" className="cabecalho-text">
                            {
                                editNameProject ?
                                    <input
                                        value={NameProject}
                                        className="cabecalho-text"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                setEditNameProject(false)
                                                editCabecalho("title", NameProject)
                                            }
                                        }}
                                        onChange={(e) => {
                                            setNameProject(e.target.value)
                                            EditProject('title', 'title', e.target.value)
                                        }}

                                        autoFocus
                                        onBlur={() => {
                                            setEditNameProject(false)
                                            editCabecalho("title", NameProject)
                                        }}
                                        style={{ backgroundColor: 'transparent', border: 'solid 0px', fontFamily: TaskFonts }}
                                        type={"text"} /> :
                                    NameProject ? NameProject : 'Nova Atividade'
                            }

                            <IconButton onClick={() => setEditNameProject(!editNameProject)}>
                                <FiEdit2 size={15} color="#fff" />
                            </IconButton>
                        </Typography>
                        <Grid my={2} container flexDirection="row" alignItems={"center"}>
                            <Typography variant="subtitle2" marginRight={1} color="white">
                                cabeçalho
                            </Typography>
                            <Tooltip
                                componentsProps={{
                                    tooltip: {
                                        style: { backgroundColor: theme.palette.simples.bg, boxShadow: theme.shadows[20] }
                                    }
                                }}
                                title={Helps.cabecalho}>
                                <span >
                                    <FiHelpCircle size={17} color="#fff" />
                                </span>
                            </Tooltip>
                        </Grid>
                        <CabecalhoTopBar
                            TaskSelected={TaskSelected}
                            reload={reload}
                            setTaskSelected={setTaskSelected}
                            EditProject={EditProject}
                            hasBorder={hasBorder}
                            setHasBorder={setHasBorder}
                        />

                        <Grid
                            xs={12}
                            padding={.5}
                            bgcolor="white"
                            borderLeft={`solid 5px ${theme.palette.primary.main}`}
                            borderRadius={3}
                            mt={2}>
                            <Grid
                                border={`solid ${hasBorder ? '1px' : '0px'} #000`}
                                padding={1.5} borderRadius={3}>
                                <Grid display="flex" flexDirection="row" xs={12}>
                                    <Grid
                                        className="cabecalho-border logotipo"
                                        container
                                        overflow="hidden"
                                        justifyContent="center"
                                        alignItems="center"
                                        flexDirection="column"
                                        sx={{ width: 120, height: 120, position: 'relative', ":hover": { cursor: 'pointer' } }}>


                                        {
                                            avatar ? <img src={avatar} style={{ width: '100%', objectFit: 'contain' }} /> : <>
                                                <img src={addImageIcon} style={{ width: 15, height: 15, filter: 'invert(1)' }} />
                                                <Typography className="text-logo">
                                                    Isirir<br /> logotipo
                                                </Typography>
                                                <label for="img-logo" style={{ cursor: 'pointer', }}>
                                                    {/* <img src={imgHavard} width="100" /> */}
                                                </label>
                                            </>
                                        }

                                        <input
                                            accept=".jpg,.png,.jpeg,.svg"
                                            type="file"
                                            id="img-logo"
                                            onChange={logotipoImg} />
                                    </Grid>
                                    <Grid ml={2} xs={12} container flexWrap="wrap">
                                        <div className="cabecalho-border cabecalho-border-conteiner">
                                            <input
                                                value={institutionName}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    setInstitutionName(value)
                                                    // editCabecalho('cabecalho', 'institutionName', value)
                                                }}
                                                defaultValue=""
                                                className="input-cabecalho"
                                                style={{ width: '100%', padding: 5, fontFamily: TaskFonts }
                                                } />

                                        </div>
                                        <Grid xs={12} mt={1} container flexDirection="row" alignItems="start">
                                            <Grid xs={7} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.name ? .3 : 1
                                            }} container flexDirection="row" alignItems="center" justifyContent={"space-between"} className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Nome:</span>
                                                <Button color="inherit" onClick={() => editCabecalho('name', !cabecalhoItemsIsActivate.name)}>
                                                    {cabecalhoItemsIsActivate.name ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                            <Grid xs={4.9} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.date ? .3 : 1
                                            }} container flexDirection="row" alignItems="center" justifyContent={"space-between"} ml={1} className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Data:</span>
                                                <Button color="inherit" onClick={() => editCabecalho('date', !cabecalhoItemsIsActivate.date)}>
                                                    {cabecalhoItemsIsActivate.date ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={12} mt={1} justifyContent={"space-between"} container flexDirection="row" alignItems="start">
                                            <Grid xs={2.59} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.yaer ? .3 : 1
                                            }} container justifyContent={"space-between"} flexDirection="row" alignItems="center" className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Ano:</span>
                                                <Button color="inherit" onClick={() => editCabecalho('yaer', !cabecalhoItemsIsActivate.yaer)}>
                                                    {cabecalhoItemsIsActivate.yaer ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.class ? .3 : 1
                                            }} container justifyContent={"space-between"} flexDirection="row" alignItems="center" ml={1} className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Turma:</span>
                                                <Button color="inherit" onClick={() => editCabecalho('class', !cabecalhoItemsIsActivate.class)}>
                                                    {cabecalhoItemsIsActivate.class ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.teacher ? .3 : 1
                                            }}
                                                container
                                                flexDirection="row"
                                                justifyContent={"space-between"}
                                                alignItems="center"
                                                ml={1}
                                                className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Professor:</span>
                                                <Button color="inherit" onClick={() => editCabecalho('teacher', !cabecalhoItemsIsActivate.teacher)}>
                                                    {cabecalhoItemsIsActivate.teacher ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                            <Grid xs={3} style={{
                                                padding: 5,
                                                opacity: !cabecalhoItemsIsActivate.disciplinary ? .3 : 1
                                            }}
                                                container flexDirection="row"
                                                justifyContent={"space-between"}
                                                alignItems="center" ml={1}
                                                className="cabecalho-border">
                                                <span style={{ fontFamily: TaskFonts }}>Disciplina:</span>
                                                <Button color="inherit"
                                                    onClick={() => editCabecalho('disciplinary', !cabecalhoItemsIsActivate.disciplinary)}>
                                                    {cabecalhoItemsIsActivate.disciplinary ? <FiEye /> : <FiEyeOff />}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    sx={{ opacity: !cabecalhoItemsIsActivate.instructions ? .3 : 1 }}
                                    xs={12}
                                    height={100}
                                    p={1}
                                    container
                                    flexWrap="wrap"
                                    className="cabecalho-border"
                                    justifyContent={"space-between"}
                                    mt={2}>
                                    <Typography style={{ fontSize: 15, fontFamily: TaskFonts }} color="black">Instruções:</Typography>
                                    <Button style={{ height: 30 }} color="inherit"
                                        onClick={() => editCabecalho('instructions', !cabecalhoItemsIsActivate.instructions)}>
                                        {cabecalhoItemsIsActivate.instructions ? <FiEye /> : <FiEyeOff />}
                                    </Button>
                                </Grid>
                                <Grid
                                    xs={12}
                                    sx={{ opacity: !cabecalhoItemsIsActivate.phrase ? .3 : 1 }}
                                    justifyContent="space-between"
                                    p={1}
                                    container
                                    flexWrap="wrap"
                                    className="cabecalho-border"
                                    mt={2}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography
                                            style={{
                                                fontSize: 15,
                                                fontFamily: TaskFonts,
                                                fontStyle: 'italic',
                                                fontWeight: '400',
                                                color: '#808080'
                                            }} color="black">Frase:</Typography>
                                        <Typography
                                            style={{
                                                fontSize: 15,
                                                fontFamily: TaskFonts,
                                                fontWeight: '400',
                                            }} color="black">{' '}Boa prova!</Typography>
                                    </div>
                                    <Button color="inherit" onClick={() =>
                                        editCabecalho('phrase', !cabecalhoItemsIsActivate.phrase)}>
                                        {cabecalhoItemsIsActivate.phrase ? <FiEye /> : <FiEyeOff />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <TestItems /> */}
                        <SortableList
                            onSortEnd={onSortEnd}
                            className="SortableList"
                            draggedItemClassName="dragged"
                        >
                            {
                                Question.map((e, index) => {
                                        if (e.activity_id !== ListActivitySelected.id) {
                                            return
                                        }
                                        return (
                                            <SortableItem key={e.id}>
                                                <Grid
                                                    maxWidth={1280}
                                                    mt={2}
                                                    position="relative"
                                                    container
                                                    flexDirection="row"
                                                    justifyContent={"space-between"}
                                                    alignItems="center">
                                                    <Typography>Questão {index + 1}</Typography>
                                                    <div style={{
                                                        cursor: "move",
                                                        position: "absolute",
                                                        top: 'calc(50% + 25px)',
                                                        left: 30
                                                    }}>
                                                        <img src={sortableIcon} style={{
                                                            height: 22,
                                                        }}/>
                                                    </div>
                                                    <TestItems idQuestion={e.id}/>
                                                </Grid>
                                            </SortableItem>
                                        )
                                    })
                            }
                        </SortableList>
                        {/* <Question allQuestions={projectSelected} TaskSelected={projectSelected} question={e} Reload={reload} /> */}
                        <Button
                            onClick={() => AddQuestion(ListActivitySelected.id)}
                            sx={{
                                width: '100%',
                                mt: 2,

                                backgroundColor: 'rgba(51, 47, 113, 0.30)',
                                ":hover": {
                                    backgroundColor: 'rgba(51, 47, 113, 0.30)',
                                },
                                // boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.04)',
                                backdropFilter: 'blur(15px)'

                            }} variant="contained">
                            <Typography color={"white"} zIndex={125}>Adcionar Questão</Typography></Button>
                    </Grid>    
                    : <></>
            }
            {/* <AddQuestion open={AddQuestionModal} setOpen={setAddQuestionModal} /> */}
        </Grid>

    )
}

export default memo(Cabecalho)
