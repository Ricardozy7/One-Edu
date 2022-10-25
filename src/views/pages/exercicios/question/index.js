import React, { useState, useEffect, memo } from "react"

import {
    Box,
    Grid,
    Typography,
    InputBase,
    MenuItem,
    FormControl,
    Select,
    NativeSelect,
    Button,
    IconButton,
    Menu,
    TextField
} from "@mui/material"
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import {
    FiMoreVertica,
    FiChevronDown,
    FiMoreVertical,
    FiAlignLeft,
    FiAlignRight,
    FiAlignJustify,
    FiTrash2,
    FaDoorClosed
} from "react-icons/all"

import { Resizable } from "re-resizable"

import Editor from "components/editor"

import IconSelect from "@mui/icons-material/KeyboardArrowDown"

import TrashIcon from "assets/images/icons/lixeira.svg"
import CopyIcon from "assets/images/icons/copy.svg"
import FavIcon from "assets/images/icons/fav.svg"
import useTasks from "contexts/task"
import { v4 } from "uuid";
import TextQuestion from "./textQuestion";

import FavAnimation from "assets/animations/fav.json"

import TrueAndFalseQuestion from "./trueAndFalse";
import Essay from "./essay";
import QuestionArea from "./questionArea";

import "./style.modules.css"


const Question = ({ question, Reload, allQuestions }) => {
    const theme = useTheme()
    const { TaskSelected, setTaskSelected, Tasks } = useTasks()
    const [questionType, setQuestionType] = useState(0)
    const [imgsQuestion, setImgsQuestion] = useState({ position: 'left', value: null, width: 150, height: 150 })
    const [textsQuestion, setTextsQuestion] = useState([])
    const [fav, setFav] = useState(false)

    // const [imageW]

    const [imgPostion, setImgPostion] = useState("left")


    useEffect(() => {
        if (question) {
            console.log(question?.texts)
            // setImgsQuestion(question?.content)
            // setTextsQuestion(question?.texts)
            setFav(question.fav)
            if (question?.typeQuestion) {
                setQuestionType(question.typeQuestion)
            }
        }
    }, [question])

    const deleteQuestion = async () => {
        const updateList = []

        const t = [TaskSelected].map((e, i) => {
            const deleteItem = []
            e.content.questions.map(e => e.id !== question.id && deleteItem.push(e))
            return {
                ...e, content: {
                    cabecalho: {
                        ...e.content.cabecalho,
                    },
                    questions: deleteItem
                }
            }
        })
        if (Tasks) {
            updateList.push(...t, ...Tasks)
        } else {
            updateList.push(t)
        }
        setTaskSelected(...t)
        Reload()
        localStorage.setItem('@projects-tasks', JSON.stringify(updateList));

    }

    const EditQuestion = async (key, field, value) => {
        try {
            let newListQuestion = []

            const edtItem = JSON.parse(localStorage.getItem("@projects-tasks")).
                filter(item => item.id === TaskSelected.id)

            const OldedQuest = TaskSelected.content?.questions?.filter(e => e.id !== question.id)
            const edQuest = TaskSelected.content?.questions?.filter(e => e.id === question.id)

            const q = edQuest.map((e) => {
                return {
                    ...e,
                    [field]: value
                }
            })

            if (OldedQuest) {
                newListQuestion.push(...q, ...OldedQuest)
            } else {
                newListQuestion.push(q)
            }

            const t = edtItem.map((e, i) => {
                return {
                    ...e, content: {
                        cabecalho: {
                            ...e.content.cabecalho,
                        },
                        questions: newListQuestion
                    }
                }
            })
            SaveChanges({ items: Tasks, val: t })
        } catch (error) {
            console.log(error)
        }


    }

    const SaveChanges = ({ items, val }) => {
        const updateList = []
        if (items) {
            updateList.push(...items, ...val)
        } else {
            updateList.push(...val)
        }
        Reload()
        localStorage.setItem('@projects-tasks', JSON.stringify(updateList));
        setTaskSelected(...val)
    }

    const AddImgQuestion = (e) => {
        // const newImg = new Image();
        const image = e.target.files
        // console.log(e.target.files)
        let newTask = []


        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            let myImage = new Image();

            const GetSize = new Promise((resolve) => {
                resolve(myImage.src = reader.result);
            })
            GetSize.then(() => {
                let largura = parseInt(myImage.width);
                let altura = parseInt(myImage.height);
                console.log(largura, altura)
                const newImage = {
                     id: v4(),
                     type: "image",
                     position: imgPostion, 
                     value: reader.result, 
                     width: largura, 
                     height: altura 
                    }
                setImgsQuestion(newImage)
                const edQuest = TaskSelected.content?.questions?.filter(e => e.id === question.id)

                if (edQuest[0]?.content) {
                    newTask = [...edQuest[0].content, newImage]
                } else {
                    newTask = [newImage]
                }

                EditQuestion('content', 'content', newTask)
            })
        }
        reader.readAsDataURL(files[0])
    }


    const AddTexts = () => {

        let newTask = []
        // presentation: line - number - romanNumber - null

        const edQuest = TaskSelected.content?.questions?.filter(e => e.id === question.id)



        const newText = {
            id: v4(),
            type: "text",
            value: '',
            bold: false,
            italic: false,
            fx: {},
            justify: 'left',
            underline: false,
            list: false,
            numericList: false
        }


        if (edQuest[0]?.content) {
            newTask = [...edQuest[0].content, newText]
        } else {
            newTask = [newText]
        }

        console.log(newTask)

        EditQuestion('content', 'content', newTask)
    }


    const FavAction = () => {
        EditQuestion('fav', 'fav', !fav)
    }



    return (
        <Box mt={3}>
            <Typography sx={{ fontSize: 12, color: 'white', my: 1 }}>Questão {question?.numberQuestion}</Typography>
            {/* <Typography sx={{ fontSize: 12, color: 'white', my: 1 }}>Questão {newquestion?.created}</Typography> */}
            {/* <Editor /> */}
            <Grid
                className="task-bar-component"
            >
                <Grid >
                    <Select
                        IconComponent={() => <IconSelect color="#fff" />}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: 'rgba(38, 47, 105, 0.95)'
                                },
                            },
                            color: '#fff'
                        }}
                        {...(!questionType && {
                            defaultValue: 0
                        })}
                        value={questionType}
                        onChange={(e) => EditQuestion('typeQuestion', 'typeQuestion', e.target.value)}
                        input={<BootstrapInput />}
                    >
                        <MenuItem sx={SelectItem} value={0}>Tipo de questão</MenuItem>
                        <MenuItem sx={SelectItem} value={"objetiva"}>Objetivas</MenuItem>
                        <MenuItem sx={SelectItem} value={"dissertativa"}>Dissertivas</MenuItem>
                        <MenuItem sx={SelectItem} value={"Verdadeiro/falso"}>Verdadeiro/false</MenuItem>
                        <MenuItem sx={SelectItem} value={"Colunas"}>Colunas</MenuItem>
                    </Select>
                    <Button onClick={AddTexts} color="inherit" sx={{ color: 'white', fontFamily: 12 }}>
                        Adcionar texto
                    </Button>

                    <Button component="label" color="inherit" sx={{ color: 'white', fontFamily: 12 }}>
                        Adcionar imagem
                        <input
                            hidden accept="image/*" type="file"
                            onChange={AddImgQuestion} />
                    </Button>
                </Grid>
                <Grid>
                    <IconButton sx={{ ml: 1 }} onClick={FavAction}>
                        {/* {
                           <Lottie options={{
                                animationData: FavAnimation,
                                loop: false,
                                autoplay: true
                            }}
                            speed={1.5}
                            direction={fav ? 1 : -1 }
                            style={{ width: 30, transform: 'scale(3)', marginTop: 15 }}
                            />
                        } */}

                    </IconButton>
                    <IconButton sx={{ mx: 1 }}>
                        <img src={CopyIcon} style={{ width: 20, height: 20 }} onClick={deleteQuestion} />
                    </IconButton>
                    <IconButton sx={{ mx: 1 }}>
                        <img src={TrashIcon} style={{ width: 20, height: 20 }} onClick={deleteQuestion} />
                    </IconButton>
                    <IconButton sx={{ mx: 1 }}>
                        <FiMoreVertical color="white" size={20} />
                    </IconButton>
                </Grid>
            </Grid>


            {/* backdrop area */}



            <QuestionArea
                questionType={questionType}
                imgsQuestion={imgsQuestion}
                textsQuestion={textsQuestion}
                setQuestionType={setQuestionType}
                setImgsQuestion={setImgsQuestion}
                setTextsQuestion={setTextsQuestion}
                question={question}
                Reload={Reload}
                EditQuestion={EditQuestion}
                deleteQuestion={deleteQuestion}
                allQuestions={allQuestions}
                
            />

        </Box>
    )
}

export default memo(Question)



const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 2,
        position: 'relative',
        backgroundColor: "transparent",
        fontSize: 12,
        // width: 125,
        color: '#fff',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
        },
        '& .MuiSelect-icon': {
            color: '#fff'
        }
    },
}));

const SelectItem = (({ theme }) => ({
    color: 'white',
    fontFamily: 'Poppins, sans serif',
    fontSize: '12px',
    fontWeight: '700',
    background: 'transparent',
    ':hover': {
        color: '#00F0FF'
    },
})
)