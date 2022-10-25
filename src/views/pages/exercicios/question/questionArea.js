import React, { useState, useEffect, useRef, memo } from "react"

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

import "./style.modules.css"

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
import GridItems from "./GridItems";
import Read from "components/editor/Read";


import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveImmutable } from "array-move";

const QuestionArea = ({
    questionType,
    imgsQuestion,
    textsQuestion,
    setQuestionType,
    setImgsQuestion,
    setTextsQuestion,
    question,
    Reload,
    EditQuestion,
    deleteQuestion,
    allQuestions
}) => {
    const theme = useTheme()
    const { TaskSelected, setTaskSelected, Tasks } = useTasks()
    const [fav, setFav] = useState(false)
    const [isDesibleDrag, setIsDesibleDrag] = useState(false)
    const [IsDesibleDragImageEditor, setIsDesibleDragImageEditor] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);

    const [items, setItems] = useState([]);



    useEffect(() => {
        if (question) {
            setImgsQuestion(question?.img)
            setTextsQuestion(question?.texts)
            setFav(question.fav)
            if (question?.typeQuestion) {
                setQuestionType(question.typeQuestion)
            }
            setItems(question.content)
        }
    }, [question])

    const onSortEnd = (oldIndex, newIndex) => {
        
        setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex));
        
    };

    return (
        <div className="container">
            <Grid xs={12} mt={2} p={2} borderRadius={3} sx={{
                minHeight: '300px',
                backgroundColor: theme.palette.simples.white
            }}>

                <SortableList
                    onSortEnd={onSortEnd}
                    className="SortableList"
                    draggedItemClassName="dragged"
                >
                    {items.map((item, index) => {
                        if(item.id !== question.id){
                            return
                        }
                        <SortableItem key={item.id}>
                            <Grid
                                maxWidth={1080}
                                p={3}
                                container flexDirection="row" justifyContent={"space-between"} alignItems="center">
                                <div style={{
                                    cursor: "move"
                                }}>
                                    :::
                                </div>
                                <GridItems
                                    item={item}
                                    TextQuestion={TextQuestion}
                                    EditQuestion={EditQuestion}
                                    TaskSelected={TaskSelected}
                                    index={index}
                                    deleteQuestion={deleteQuestion}
                                />
                            </Grid>
                        </SortableItem>
                    })}
                </SortableList>
            </Grid>
        </div>
    )
}

export default memo(QuestionArea)