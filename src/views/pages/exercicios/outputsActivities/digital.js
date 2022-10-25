import React, { useEffect, useState, memo } from "react"
import { Box, Typography, Grid, TextField } from "@mui/material"
import ModalComponent from "components/Modal"
import Parse from "./parse"
import htmlToRraft from "draftjs-to-html";
import draftToHtml from "draftjs-to-html";
import useActivity from "contexts/Activity"
import { EditorState, convertToRaw, ContentState } from "draft-js";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { Modelo1 } from "./cabecalho-modelo-1.js"
import { alphabet } from "views/utilities/alphabet";

import "./style.module.css"

import {
    Menu as MenuContext,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";
import OutputConlumns from "./outputConlumns";

const OutputDigital = ({
    open, setOpen
}) => {
    const { Question, ListActivitySelected } = useActivity()

    const [Content, setContent] = useState(Modelo1({
        name: 'Sociedade de Ensino Superior Estacio de Sá',
        logo: 'https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1.png'
    }))

    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(100);

    const [questDigital, setQuestDigital] = useState([])

    useEffect(() => {

        const QuestionSelected = Question.filter(e => e.activity_id === ListActivitySelected.id)
        if (QuestionSelected.length > 0) {
            const contentValue = QuestionSelected[0]?.content
            setQuestDigital(QuestionSelected)

        }
    }, [open])

    useEffect(() => {
        if (open) {

            // const timer = setInterval(() => {
            //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
            //   }, 300);
            //   setTimeout(() => clearInterval(timer), 2800)
            console.log(Question)

        }
    }, [open])

    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
        >
            <Box sx={{ p: 2, maxHeight: '90vh', overflowY: 'auto' }}>
                {
                    progress !== 100 ?
                        <Grid xs={12} container justifyContent="center" alignItems={"center"} minHeight={300}>
                            <LinearProgressWithLabel value={progress} />
                        </Grid>
                        :
                        <>
                            <Typography>Atividade</Typography>
                            <Box sx={{ width: '980px', minHeight: '1322px', p: 2, bgcolor: "white" }}>
                                <Parse choose={Content} />
                                {
                                    questDigital.map((quest) => {
                                        return (
                                            quest.content?.sort((a, b) => a.index - b.index).map((a, _index) => {
                                                if(quest.id !== a.quest_id){
                                                    return
                                                }
                                                return(
                                                <div key={_index} style={{ color: "black", marginTop: 35  , width: '100%' }}>
                                                    {a
                                                        .type === 'image' ?
                                                        <div style={{ display: 'flex', justifyContent: a?.content?.position, width: '100%' }}>
                                                            <img src={a?.content?.value} style={{ width: a.content?.width, height: a.content?.height }} />
                                                        </div> :
                                                        a.type === 'text' ?
                                                            <Parse choose={a?.content} /> :
                                                            a.type === 'objetiva' ?
                                                                <FormControl>
                                                                    <RadioGroup
                                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                                        name="controlled-radio-buttons-group"
                                                                    // value={value}
                                                                    // onChange={handleChange}
                                                                    >
                                                                        {
                                                                            a.content?.values.map((val, index) => (
                                                                                <FormControlLabel value={
                                                                                    alphabet[index]
                                                                                } control={<Radio />} label={val.value} />

                                                                            ))
                                                                        }
                                                                    </RadioGroup>
                                                                </FormControl>
                                                                :
                                                                a.type === 'dissertativa' ?
                                                                    <>
                                                                        <TextField
                                                                            multiline
                                                                            maxRows={parseInt(a.content.values)}
                                                                            rows={parseInt(a.content.values)}
                                                                            fullWidth

                                                                        />
                                                                    </>
                                                                    : a.type === 'Colunas' ?


                                                                        <>
                                                                            {
                                                                                a.content?.values.map((val, index) => {
                                                                                    return (
                                                                                        <OutputConlumns key={index} col={a.content?.values} val={val} index={index} />
                                                                                    )

                                                                                }
                                                                                )
                                                                            }

                                                                        </>
                                                                        : <></>
                                                    }
                                                </div>
                                            )})
                                        )
                                    })
                                }
                            </Box>
                        </>
                }

            </Box>
        </ModalComponent>
    )
}

export default memo(OutputDigital)


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            {/* <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box> */}
        </Box>
    );
}