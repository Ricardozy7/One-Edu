import React, { useState, useEffect, useRef } from "react"

import {
    Grid,
    InputBase,
    IconButton,
} from "@mui/material"
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import {
    FiTrash2,
    FiBold,
    FiItalic,
    FiAlignJustify,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
    FiUnderline,
    FiList,
    BiListOl
} from "react-icons/all"

import useTasks from "contexts/task"
import { v4 } from "uuid";

const TextQuestion = ({ textsQuestion, Reload, EditQuestion, TaskSelected, question }) => {
    const theme = useTheme()
    const refInput = useRef()
    const [styleText, setStyleText] = useState({
        bold: false,
        italic: false,
        justify: 'left',
        underline: false,
        list: false,
        numericList: false
    })


    const [styleEditVisible, setStyleEditVisible] = useState(false)

    const editStyleText = (field, value) => {

        // const edtItem = JSON.parse(localStorage.getItem("@projects-tasks")).
        //     filter(item => item.id === TaskSelected.id)

        // const myTextQuestion = edtItem[0].content?.questions?.filter(e => e.id === question.id)

        EditQuestion(textsQuestion.id, 'texts', { ...textsQuestion, [field]: value })

        setStyleText({
            ...styleText,
            [field]: value
        })
    }

    useEffect(() => {
        setStyleText({
            bold: textsQuestion.bold,
            italic: textsQuestion.italic,
            justify: textsQuestion.left,
            underline: textsQuestion.underline,
            list: textsQuestion.list,
            numericList: textsQuestion.numericList
        })
    }, [])


    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
    }, [refInput])

    const handleOutsideClick = (event) => {
        if (refInput && !refInput.current.contains(event.target)) {
            setStyleEditVisible(false)
        } if (refInput && refInput.current.contains(event.target)) {
            setStyleEditVisible(true)
        }
    }

    return (
        <Grid justifyContent={'right'} ref={refInput} container xs={12}>
            {
                textsQuestion?.id &&
                <>
                    <Grid xs={12} container flexDirection={"row"} mt={1}>
                        <Grid
                            xs={12}
                            bgcolor="#f4f4f4"
                            container
                            justifyContent="flex-end"
                            borderBottom={`1px solid ${styleEditVisible ? theme.palette.primary.main : '#707070'}`}
                            p={1}>
                            <InputBase
                                multiline
                                value={textsQuestion.value}
                                onChange={e => {
                                    const newValue= e.target.value
                                    EditQuestion(textsQuestion.id, 'texts', 
                                    { 
                                        ...textsQuestion, value: e.target.value.indexOf("1. ")  && styleText.numericList === -1 ? "1. " +  newValue : newValue
                                    })
                                    console.log()
                                }
                                }
                                id="standard-basic"
                                placeholder="Enunciado..."
                                variant="standard"
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    fontWeight: styleText.bold ? 'bold' : '400',
                                    fontStyle: styleText.italic ? 'italic' : 'normal',
                                    textAlign: styleText.justify,
                                    textDecoration: styleText.underline ? 'underline' : 'none',
                                    bgcolor: 'transparent'
                                }}
                                // sx={{ ml: 1, flex: 1 }}
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />

                        </Grid>
                        {/* <IconButton sx={{ m: 1 }} onClick={() =>
                        EditQuestion("texts", "texts", null)
                    }>
                        <FiTrash2 color="black" />

                    </IconButton> */}
                    </Grid>
                    {
                        styleEditVisible &&

                        <Grid
                            sx={{ transition: '1s' }}
                            xs={12} conatainer flexDirection="row">
                            <IconButton onClick={() => {
                                editStyleText('bold', !styleText.bold)
                            }} color="primary">
                                <FiBold color={styleText.bold ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('italic', !styleText.italic)
                                }}
                            >
                                <FiItalic color={styleText.italic ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('list', !styleText.list)
                                }}
                            >
                                <FiList color={styleText.list ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('numericList', !styleText.numericList)
                                }}
                            >
                                <BiListOl color={styleText.numericList ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('justify', 'center')
                                }}
                            >
                                <FiAlignJustify color={styleText.justify === 'center' ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('justify', 'left')
                                }}
                            >
                                <FiAlignLeft color={styleText.justify === 'left' ? theme.palette.primary.main : "black"} />
                            </IconButton>
                            <IconButton><FiAlignCenter color="black" /></IconButton>
                            <IconButton><FiAlignRight color="black" /></IconButton>
                            <IconButton
                                onClick={() => {
                                    editStyleText('underline', !styleText.underline)
                                }}
                            ><FiUnderline color="black" /></IconButton>
                            <IconButton onClick={() =>
                                EditQuestion("texts", "texts", null)
                            }>
                                <FiTrash2 color="black" />

                            </IconButton>
                        </Grid>
                    }
                </>
            }
        </Grid>
    )
}

export default TextQuestion