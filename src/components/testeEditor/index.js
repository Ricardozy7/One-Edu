import React, { useState, useEffect, useRef } from "react"
import SortableList, { SortableItem } from "react-easy-sort";

import { v4 } from "uuid"

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
import IconSelect from "@mui/icons-material/KeyboardArrowDown"

import SwipeableEdgeDrawer from "./swipperDrawer"

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { arrayMoveImmutable } from "array-move";

import QuestionEssay from "./essay"
import QuestionTrueOrFalse from "./trueAndFalse"

import GridItems from "./Items";
import Objective from "views/pages/exercicios/question/objective ";
import ColumnsActivity from "./columns";

import useActivity from "contexts/Activity"
import MenuOne from "components/menu";
import InsertImage from "components/InsertImage";


const QuestionArea = ({
    idQuestion
}) => {

    const { QuestionItems, setQuestionItems, Question, setQuestion } = useActivity()

    const theme = useTheme()

    const [newImage, setNewImage] = useState(false)

    const inputRef = useRef(null);
    const [imgsQuestion, setImgsQuestion] = useState({ position: 'left', value: null, width: 150, height: 150 })
    const [questionType, setQuestionType] = useState({
        id: 0,
        value: 0,
        created_at: '',
    })

    const AddImgQuestionLink = (imgLink) => {
        const newImage = {
            id: v4(),
            quest_id: idQuestion,
            type: "image",
            position: imgPostion,
            value: imgLink,
            width: 200,
            height: 200
        }
        setImgsQuestion(newImage)
        AddImage()
    }

    const AddImgQuestion = (e, type) => {

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
                    quest_id: idQuestion,
                    type: "image",
                    position: imgPostion,
                    value: reader.result,
                    width: largura,
                    height: altura
                }
                setImgsQuestion(newImage)
                // const edQuest = TaskSelected.content?.questions?.filter(e => e.id === question.id)

                // if (edQuest[0]?.content) {
                //     newTask = [...edQuest[0].content, newImage]
                // } else {
                //     newTask = [newImage]
                // }

                // EditQuestion('content', 'content', newTask)
            })
        }
        reader.readAsDataURL(files[0])
        AddImage()
    }


    const [imgPostion, setImgPostion] = useState("left")
    const [ImageEd, setImageEd] = useState({
        width: "100%", height: "100%",
    })

    const [anchorEl, setAnchorEl] = useState(null);

    const [items, setItems] = useState([]);
    let [showEditorText, setshowEditorText] = useState(false);

    const onSortEnd = (oldIndex, newIndex) => {
        // @ts-ignore
        setQuestionItems((array) => {
            return {
                ...array,
                item: arrayMoveImmutable(array.item, oldIndex, newIndex)
            }
        
            
        });
    };


    const AddText = () => {
        const newTextId = v4()
        setQuestionItems({
            id: QuestionItems.id ? QuestionItems.id : v4(),
            item:
                [
                    ...(QuestionItems.item && QuestionItems.item),
                    { id: newTextId, type: "text", created_at: new Date(), quest_id: idQuestion, }
                ]
        })
        setshowEditorText(newTextId)
    }

    const AddImage = () => {
        setQuestionItems(
            {
                id: QuestionItems.id ? QuestionItems.id : v4(),
                item:
                    [
                        ...(QuestionItems.item && QuestionItems.item),
                        {
                            created_at: new Date(),
                            quest_id: idQuestion,
                            id: v4(),
                            type: "image",
                            height: 220,
                            width: "100%",
                            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ60Nr2nJ4Lz-l2cZvjITdePmp8bG4uF4qG5CPJ7CscfSeErtA6BAqT7zXVkI3v-HdDrQ&usqp=CAU"
                        }
                    ]
            })
    }


    useEffect(() => {
        const newArr = Question.map(object => {
            if (object.id === idQuestion) {
                const getQuestion = object?.content.sort((a, b) => a.index - b.index).filter(e => e.id !== QuestionItems.id)
                return { ...object, content: [...getQuestion, ...QuestionItems.item] };
            }
            return object;
        });
        setQuestion(newArr)
    }, [])

    return (
        <Grid
            onMouseDown={(e) => e.stopPropagation()}
            container xs={12} mt={2}>
            <Grid
                className="task-bar-component"
                xs={12}>
                {/* <div
                    style={{
                        mixBlendMode: 'soft-light',
                        height: "100%",
                        backgroundColor: "#DADADA",
                        position: "absolute",
                        zIndex: 1,
                        width: '100%'
                    }}
                /> */}
                <Grid zIndex={2}>
                    <Select
                        IconComponent={() => <IconSelect color="#fff" />}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: theme.palette.background.bg800
                                },
                            },
                            color: '#fff'
                        }}
                        {...(!questionType && {
                            defaultValue: 0
                        })}
                        value={questionType.value}
                        onChange={(e) => {
                            setQuestionType({
                                id: v4(),
                                value: e.target.value,
                                created_at: new Date(),
                            })

                        }}
                        input={<BootstrapInput />}
                    >
                        <MenuItem sx={SelectItem} value={0}>Tipo de questão</MenuItem>
                        <MenuItem sx={SelectItem} value={"objetiva"}>Objetivas</MenuItem>
                        <MenuItem sx={SelectItem} value={"dissertativa"}>Dissertivas</MenuItem>
                        <MenuItem sx={SelectItem} value={"Verdadeiro/falso"}>Verdadeiro/false</MenuItem>
                        <MenuItem sx={SelectItem} value={"Colunas"}>Colunas</MenuItem>
                    </Select>
                    <Button
                        color="inherit"
                        sx={{ color: 'white', fontFamily: 12 }}
                        onClick={AddText}>Adicionar Texto</Button>
                    <Button
                        onClick={() => setNewImage(true)}
                        component="label"
                        color="inherit"
                        sx={{ color: 'white', fontFamily: 12 }}
                    >
                        Adicionar Image
                        {/* <input
                            hidden accept="image/*" type="file"
                            onChange={AddImgQuestion} /> */}
                    </Button>

                </Grid>
            </Grid>
            <Grid
                bgcolor="#fff"
                borderLeft={`solid 5px ${theme.palette.primary.main}`}
                xs={12}
                minHeight={300}
                container
                justifyContent="center"
                alignItems="flex-start"
                mt={2} borderRadius={3}>

                <SortableList
                    onSortEnd={onSortEnd}
                    className="SortableList"
                    draggedItemClassName="dragged"
                >

                    {QuestionItems?.item ? QuestionItems?.item?.map((item, index) => {
                        if (item.quest_id !== idQuestion) {
                            return
                        }

                        return (
                        <SortableItem key={item.id}>
                            <Grid
                                maxWidth={1080}
                                p={2}
                                container
                                flexDirection="row"
                                justifyContent={"space-between"}
                                alignItems="center">
                                <GridItems
                                    setItem={setQuestionItems}
                                    item={item}
                                    index={index}
                                    items={QuestionItems.item}
                                    Image={ImageEd}
                                    idQuestion={idQuestion}
                                    setImage={setImageEd}
                                    setImgsQuestion={setImgsQuestion}
                                    setAnchorEl={setAnchorEl}
                                    anchorEl={anchorEl}
                                    setItems={setQuestionItems}
                                    imgsQuestion={imgsQuestion}
                                    showEditorText={showEditorText}
                                    setshowEditorText={setshowEditorText}
                                />
                                <div style={{
                                    cursor: "move"
                                }}>
                                    :::
                                </div>
                            </Grid>
                        </SortableItem>)
                    }) : <>  <SortableItem><div></div></SortableItem></>
                    }
                    <Grid
                        maxWidth={1080}
                        p={2}
                        mr={3}
                        xs={10.5}
                        container
                        flexDirection="row"
                        justifyContent={"space-between"}
                        alignItems="center">
                        {
                            questionType.value === "Verdadeiro/falso" ?
                                <QuestionTrueOrFalse
                                    idQuestion={idQuestion}
                                    index={QuestionItems.item.length + 2}
                                    id={questionType.id}
                                    type={questionType.value}
                                    created={questionType.created_at} />
                                :
                                questionType.value === "dissertativa" ?
                                    <QuestionEssay
                                        idQuestion={idQuestion}
                                        index={QuestionItems.item.length + 2}
                                        id={questionType.id}
                                        type={questionType.value}
                                        created={questionType.created_at}
                                    /> :
                                    questionType.value === "objetiva" ?
                                        <Objective
                                            idQuestion={idQuestion}
                                            index={QuestionItems.item.length + 2}
                                            id={questionType.id} type={questionType.value} />
                                        :
                                        questionType.value === "Colunas" ?
                                            <ColumnsActivity
                                                idQuestion={idQuestion}
                                                index={QuestionItems.item.length + 2}
                                                id={questionType.id}
                                                type={questionType.value}
                                                created={questionType.created_at}
                                            />
                                            :
                                            <div></div>
                        }
                    </Grid>
                </SortableList>
            </Grid>
            <SwipeableEdgeDrawer />
            <InsertImage
                open={newImage}
                setOpen={setNewImage}
                AddImgQuestion={AddImgQuestion}
                AddImgQuestionLink={AddImgQuestionLink}
            />
        </Grid>
    )
}

export default QuestionArea


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