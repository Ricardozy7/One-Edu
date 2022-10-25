import React, { useEffect, useRef, useState, memo } from "react"

import {
    IconButton,
    Grid,
    Typography,
    Button,
    ButtonGroup,
    Tabs,
    Tab,
    Menu
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';
import { 
    FiChevronLeft, 
    FiPlus, 
    FiSmartphone, 
    FiFile, 
    FiUpload, 
    FiBookmark, 
    FiChevronsRight,
    FiSettings
} from "react-icons/all"
import { Link } from "react-router-dom";
import AddProject from "./addProject"

import ConfigPage from "./configsPage";
import ExportQuestion from "./components/export";
import Labels from "./components/labels";

import SwitchComponent from "ui-component/switch";
import useTasks from "contexts/task"
import { saveActivite } from "components/save";

import useActivity from "contexts/Activity";


const TopBar = ({ 
    ListActivitySelected, 
    setListActivitySelected, 
    reloadProjects, 
    EditProject,
    ListActivity,
    showActivityPreviewConvetinal, 
    setShowActivityPreviewConvetinal,
    showActivityPreviewDigital, 
    setShowActivityPreviewDigital
}) => {
    const theme = useTheme()
    const { Question, setQuestion,  setListActivity } = useActivity()

    const [scoreTextValue, setScoreTextValue] = useState(10)
    const [gabarito, setGabarito] = useState(false)
    const [newProject, setNewProject] = useState(false)
    const [listAll, setlistAll] = useState(false)

    const ref = useRef()
    const ref2 = useRef()
    const [value, setValue] = React.useState(0);

    const [configOpen, setConfigOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    useEffect(() => {
        setGabarito(ListActivitySelected?.is_open)
        setScoreTextValue(ListActivitySelected?.total_value)
    }, [ListActivitySelected])

    const updateTaks = (key, field, value) => {
        EditProject(key, field, value)
    }

    useEffect(() => {
        if (ref && ref2) {
            if ((ref.current?.scrollWidth + 100) > ref2.current?.scrollWidth) {
                setlistAll(true)
            } else {
                setlistAll(false)
            }
        }
    }, [ref.current?.scrollWidth, ref2.current?.scrollWidth])


    const editCabecalho = (key, value) => {
        const SavaCabecalho = saveActivite({ key, value, reload: reloadProjects, ListActivitySelected })
        if (SavaCabecalho?.error) {
            // setNameProject(ListActivitySelected?.title)
        }else{
            setListActivity((e) => e.id === ListActivitySelected.id && {
                ...e,
                [key]: value
            })
        }
        return
    }
    


    const MenuProjectsList = () => {
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                PaperProps={{
                    style: {
                        backgroundColor: 'rgba(38, 47, 105, 0.95)',
                        p: 1
                    },
                }}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Grid container flexDirection="column">
                {
                  ListActivity &&  ListActivity.map((e, i) => (
                        <StyledTab 
                        onClick={() =>{
                            setListActivitySelected(e)
                            handleClose()
                        }} sx={{ m: .5 }} 
                        variant="contained">
                            {e.title}</StyledTab>
                    ))
                }
                </Grid>
            </Menu>)
    }

    return (
        <Grid 
        container 
        bgcolor={"red"} 
        flexDirection="row" 
        justifyContent="space-between" 
        zIndex={1}
        position="relative"
        >
            {/* <Grid className="task-top-bar" /> */}
            <Grid 
            bgcolor={"#221F60"}
            className="task-top-bar2" 
            xs={12}>
                <Grid
                    xs={6}
                    overflow="scroll"
                    className="top-bar-tasks-abas-area"
                    alignItems="center">
                    <IconButton
                        LinkComponent={Link} to="/"
                        color="default">
                        <FiChevronLeft size={35} color={theme.palette.simples.white} />
                    </IconButton>
                    <Grid ref={ref2} container flexDirection="row" alignItems="center" maxWidth={"75%"}>
                        <Grid maxWidth={"100%"} >
                            <div className="tabs-task" ref={ref}>
                                {
                                  ListActivity && ListActivity.map((e, i) => (
                                        // <StyledTab 
                                        // sx={{
                                        //     p: 0,
                                        //     height: 0
                                        // }}
                                        //     label={e?.title}
                                        //     onClick={() => { setListActivitySelected(e) }}
                                        //     className="new-task-project-bnt" style={{ opacity: projectSelected?.id === e.id ? 1 : .5 }}>

                                        // </StyledTab >
                                        <StyledTab
                                            sx={{ backgroundColor: '#413A9D', opacity: ListActivitySelected?.id === e.id ? 1 : 0.5}}
                                            onClick={() => { setListActivitySelected(e) }}
                                        variant="contained">{e.title ? e.title : `Nova  atividade ${ListActivitySelected?.id.substring(0, 3)}...`}</StyledTab>
                                    ))
                                }
                            </div>
                            {/* */}
                        </Grid>
                    </Grid>
                    <IconButton onClick={() => setNewProject(true)}>
                        <FiPlus size={35} color={theme.palette.simples.white} />
                    </IconButton>
                    {
                        listAll &&
                        <IconButton onClick={handleClick}>
                            <FiChevronsRight size={35} color={theme.palette.simples.white} />
                        </IconButton>
                    }
                    <MenuProjectsList />
                </Grid>
                <Grid xs={2} width={200}>
                    <IconButton
                    onClick={() => setShowActivityPreviewDigital(true)}
                    >
                        <FiSmartphone size={30} color={theme.palette.simples.white} />
                    </IconButton>
                    <IconButton
                    onClick={() => setShowActivityPreviewConvetinal(true)}
                    >
                        <FiFile size={30} color={theme.palette.simples.white} />
                    </IconButton>
                </Grid>
                <Grid xs={4} justifyContent="flex-end" display={'flex'} flexDirection="row" alignItems={"center"}>
                    <Typography fontSize={15} color={'white'}>
                        Valor
                    </Typography>
                    <Grid>
                        <input
                            value={scoreTextValue}
                            onBlur={(e) => editCabecalho('total_value', e.target.value)}
                            onChange={e => {
                                setScoreTextValue(e.target.value)
                                // updateTaks('scoreValue', 'total_value', e.target.value)
                            }}
                            type={'number'}
                            className="score-tasks"
                        />
                    </Grid>
                    {/* <Typography fontSize={15} color={'white'}>
                        Gabarito
                    </Typography>
                    <Grid>
                        <SwitchComponent
                            onChange={(e) => {
                                setGabarito(!gabarito)
                                updateTaks('gabarito', 'gabarito', !gabarito)
                            }}
                            checked={gabarito} />
                    </Grid> */}
                    <span style={{ height: 40, width: 1, backgroundColor: theme.palette.grey[400], marginInline: 10 }} />
                    {/* <IconButton>
                        <FiUpload size={25} color={theme.palette.simples.white} />
                    </IconButton> */}
                    <ExportQuestion />
                    <Labels listId={ListActivitySelected?.id}/>
                    <span style={{ height: 40, width: 1, backgroundColor: theme.palette.grey[400], marginInline: 10 }} />
                    <IconButton onClick={setConfigOpen}>
                        <FiSettings size={25} color={theme.palette.simples.white} />
                    </IconButton>
                </Grid>

            </Grid>
            <ConfigPage open={configOpen} setOpen={setConfigOpen}/>
            <AddProject open={newProject} setOpen={setNewProject} reload={() => {}} />
        </Grid>
    )
}

export default memo(TopBar)



const StyledTab = styled((props) => <Grid  {...props} />)(
    ({ theme }) => ({
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        marginInline: 2,
        maxWidth: '150px',
        minWidth: '80px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderRadius: '3px',
        boxShadow: 'box-shadow: 0px 5.72742px 4.29557px rgba(0, 0, 0, 0.04)',
        textOverflow: 'ellipsis',
        ":hover": {
            backgroundColor: '#413A9D',
            cursor: 'pointer',
        },
        backgroundImage: 'url(http://api.thumbr.it/whitenoise-361x370.png?)',
            background: '4ea6caff&noise=626262&density=53&opacity=27',
    }),
);

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
    //   TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    height: '30px !important',
    backgroundColor: 'transparent',
    paddingTop: 0,
    '& .MuiTabs-indicator': {
        display: 'none',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    }
}); 