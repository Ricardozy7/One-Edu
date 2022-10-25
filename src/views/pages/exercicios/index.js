import React, { useEffect, useState } from "react"

import {
    IconButton,
    Grid,
    Typography,
    Button,
    TextField,
    Switch
} from "@mui/material"

import { styled, useTheme } from '@mui/material/styles';

import TopBar from "./TopBar"
import Drawer from "./drawer"
import EditCabecalho from "./editCabecalho"
import AddQuestion from "./addQuestion";
import useTasks from "contexts/task"


import useActivity from "contexts/Activity"

import MobileExercicios from "../mobile/exercicios"
import { RemoteServices } from "services";
import Lottie from "react-lottie";

import { loadingAnimate } from "themes/animations"
import OutputConventional from "./outputsActivities/conventional";
import OutputDigital from "./outputsActivities/digital";
import ActivitySkeleton from "./components/skeleton/activities";

const Exercicios = () => {
    const theme = useTheme()
    const { TaskSelected, setTaskSelected, Tasks } = useTasks()

    const {
        ListActivity,
        setListActivity,
        ListActivitySelected,
        setListActivitySelected, 
        Question
    } = useActivity()

    const [reload, setReload] = useState(false)
    const [Loading, setLoading] = useState(false)
    // const [first, setFirst] = useState(true)

    const [showActivityPreviewConvetinal, setShowActivityPreviewConvetinal] = useState(false)
    const [showActivityPreviewDigital, setShowActivityPreviewDigital] = useState(false)

    const Reload = () => {
        ListAllActivitys()
    }

    const ListAllActivitys = (first) => {
        if(ListActivity.length > 0 && first){
            return
        }
        
        if (first) {
            setLoading(true)
        }
        RemoteServices.Teachers.ActivityLists()
            .then((response) => {
                if (response.activityLists) {
                    const ActivityListReponse = response.activityLists.sort((a, b) => new Date(a?.created_at) - new Date(b?.created_at))
                    setListActivity(ActivityListReponse)
                    if (first) {
                        setListActivitySelected(ActivityListReponse[0])
                    }
                }

            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        ListAllActivitys(true)
    }, [])

    const EditProject = async (key, field, value) => {
        // const updateList = []
        // const t = [TaskSelected].map((e, i) => {
        //     if (key === 'cabecalho') {
        //         return {
        //             ...e, content: {
        //                 cabecalho: {
        //                     ...e.content.cabecalho,
        //                     [field]: value,
        //                 },
        //                 questions: [...e.content.questions]
        //             }
        //         }
        //     }
        //     return { ...e, [field]: value }
        // })
        // if (Tasks) {
        //     updateList.push(...t, ...Tasks)
        // } else {
        //     updateList.push(t)
        // }
        // Reload()
        // localStorage.setItem('@projects-tasks', JSON.stringify(updateList));
        // setTaskSelected(...t)
    }

    return (
        <Grid>
            <Grid p={3} className="desktop">
                {
                    Loading ?
                        <Grid container xs={12} marginTop={"2%"} justifyContent="center" alignItems="start">
                            <ActivitySkeleton />
                        </Grid> :
                        <>
                            <TopBar
                                ListActivitySelected={ListActivitySelected}
                                setListActivitySelected={setListActivitySelected}
                                reloadProjects={Reload}
                                ListActivity={ListActivity}
                                EditProject={EditProject}
                                showActivityPreviewConvetinal={showActivityPreviewConvetinal}
                                setShowActivityPreviewConvetinal={setShowActivityPreviewConvetinal}
                                setShowActivityPreviewDigital={setShowActivityPreviewDigital}
                                showActivityPreviewDigital={showActivityPreviewDigital}
                            />
                            <Grid container flexDirection={"row"}>
                                <Drawer />
                                <Grid p={3} xs={11}>
                                    <EditCabecalho
                                        ListActivitySelected={ListActivitySelected}
                                        setListActivitySelected={setListActivitySelected}
                                        reload={Reload}
                                        EditProject={EditProject}
                                    />
                                </Grid>
                            </Grid>
                        </>
                }

            </Grid>
            <Grid className="mobile">
                <MobileExercicios />
            </Grid>
            <OutputConventional
                open={showActivityPreviewConvetinal}
                setOpen={setShowActivityPreviewConvetinal} />
            <OutputDigital
                open={showActivityPreviewDigital}
                setOpen={setShowActivityPreviewDigital}
            />
        </Grid >
    )
}

export default Exercicios