import React, { useState, useEffect, useRef } from "react"
// @ts-ignore
import SortableList, { SortableItem } from "react-easy-sort";
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
import { arrayMoveImmutable } from "array-move";
import { Resizable } from "re-resizable";
import useActivity from "contexts/Activity"

import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa"
import { FiX } from "react-icons/fi"

export function InfoBox(props) {

    const { Question, ListActivitySelected, setQuestion } = useActivity()


    const theme = useTheme()
    const ref = useRef(null);
    const { onClickOutside } = props;


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(!anchorEl);
    };



    useEffect(() => {
        const handleClickOutside = (event) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);



    const Save = () => {
        const onChangeImageContentQuestion = {
            ...props.item,
            index: props.index,
            content: {
                height: props.imageSizeble.height,
                width: props.imageSizeble.width,
                value: props.imgsQuestion.value,
                position: props.positionImg
            }
        }
        const newArr = Question.map(object => {
            if (object.id === props.idQuestion) {
                const getQuestion = object?.content.sort((a, b) => a.index - b.index).filter(e => e.id !== onChangeImageContentQuestion.id)
                return { ...object, content: [...getQuestion, onChangeImageContentQuestion] };
            }
            return object;
        });

        setQuestion(newArr)
    }

    useEffect(() => {
        Save()
    }, [props.imageSizeble, props.items, props.positionImg])


    const DeleteImg = () => {
        const newArr = Question.map(object => {
            if (object.activity_id === ListActivitySelected.id) {
                const getQuestion = object?.content.filter(e => e.id !== props.item.id)
                // console.log(getQuestion, props.item.id)
                return { ...object, content: getQuestion };
            }
            return object;
        });
        props.setItems((it) => it.filter(at => at.id !== props.item.id))
        setQuestion(newArr)
    }


    useEffect(() => {

        const MyQues = Question.filter(_que => _que.id === props.idQuestion)
        if (MyQues[0] && MyQues[0]?.content?.length > 0) {
            const myImg = MyQues[0]?.content.filter(cont => cont.id === props.item.id)
            if (myImg[0]?.content) {
                props.setimageSizeble({
                    id: props.item.id,
                    width: myImg[0].content?.width,
                    height: myImg[0].content?.height
                })
                props.setImgsQuestion(myImg[0].content)
            }
        }
    }, [])


    return (
        <Grid xs={12}
            onClick={() => props.setShowInfo1(props.item.id)}
            ref={ref} style={{ backgroundColor: "#000", display: "contents" }}
        >
            <Resizable
                // @ts-ignore
                handleStyles={props.show === props.item.id ? styleResizable : {
                    top: { display: "none" },
                    topLeft: { display: "none" },
                    topRight: { display: "none" },
                    left: { display: "none" },
                    right: { display: "none" },
                    bottom: { display: "none" },
                    bottomLeft: { display: "none" },
                    bottomRight: { display: "none" }
                }}
                size={{ width: props.imageSizeble.width, height: props.imageSizeble.height }}
                maxWidth={"100%"}
                maxHeight={500}
                onResizeStop={(e, direction, ref, d) => {
                    props.setimageSizeble({
                        id: props.item.id,
                        width: props.imageSizeble.width + d.width,
                        height: props.imageSizeble.height + d.height
                    })

                }}
                style={{
                    border: props.show === props.item.id ? "2px solid rgba(57,155,252,0.6)" : "0px solid",
                    padding: props.show === props.item.id ? 3 : 0,
                    userSelect: "none",
                }}

                defaultSize={{
                    height: 300,
                    width: 300
                }}>
                <img className={`img-preview-${props.item.id}`} src={props.imgsQuestion.value} style={{ width: "100%", height: "100%" }} />


                {/* <IconButton
                    onClick={handleClick}
                    color="inherit" sx={{
                        position: "absolute",
                        right: -25,
                        top: -25,
                        borderRadius: "50%",
                        width: 50,
                        height: 50,
                        zIndex: 99,
                        bgcolor: theme.palette.background.bg800,
                        ':hover': {
                            bgcolor: '#15133F'
                        }
                    }}>
                    <FiMoreVertical color="#fff" />
                </IconButton> */}
                {
                    props.show === props.item.id &&
                    <Grid
                        container
                        flexDirection="column"
                        justfyContent="space-between"
                        style={{
                            position: 'absolute',
                            right: -35,
                            top: 0,
                            width: 30
                        }}>
                        <Grid
                            container
                            flexDirection="column"
                            justfyContent="space-between"
                        >
                            <IconButton
                                color={props.positionImg === 'start' ? 'primary' : 'inherit'}
                                onClick={() => props.setPositionImg("start")}
                                sx={{ width: 30 }}>
                                <FaAlignLeft />
                            </IconButton>
                            <IconButton
                                color={props.positionImg === 'center' ? 'primary' : 'inherit'}
                                onClick={() => props.setPositionImg("center")}
                                sx={{ width: 30 }}>
                                <FaAlignCenter />
                            </IconButton>
                            <IconButton
                                color={props.positionImg === 'end' ? 'primary' : 'inherit'}
                                onClick={() => props.setPositionImg("end")}
                                sx={{ width: 30 }}>
                                <FaAlignRight />
                            </IconButton>
                        </Grid>
                        <IconButton
                            onClick={DeleteImg}
                            sx={{ width: 30 }}>
                            <FiX />
                        </IconButton>
                    </Grid>
                }

            </Resizable>
        </Grid>);
}




const styleResizable = {
    top: {
        marginTop: -3,
        marginLeft: -5,
        top: 0,
        left: "50%",
        cursor: "ns-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    topLeft: {
        marginTop: -2,
        marginLeft: -2,
        top: 0,
        left: 0,
        cursor: "nwse-resize",
        border: "3px solid #999",
        borderRight: "none",
        borderBottom: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    left: {
        marginTop: -5,
        marginLeft: -3,
        top: "50%",
        left: 0,
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderRight: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottomLeft: {
        marginTop: -7,
        marginLeft: -2,
        top: "100%",
        left: 0,
        cursor: "nesw-resize",
        border: "3px solid #999",
        borderRight: "none",
        borderTop: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottom: {
        marginTop: -7,
        marginLeft: -5,
        top: "100%",
        left: "50%",
        cursor: "ns-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    bottomRight: {
        marginTop: -7,
        marginLeft: -7,
        top: "100%",
        left: "100%",
        cursor: "nwse-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderTop: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    right: {
        marginTop: -5,
        marginLeft: -7,
        top: "50%",
        left: "100%",
        cursor: "ew-resize",
        border: "3px solid #999",
        borderTop: "none",
        borderLeft: "none",
        borderBottom: "none",
        borderWidth: 5,
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    },
    topRight: {
        marginTop: -2,
        marginLeft: -7,
        top: 0,
        left: "100%",
        cursor: "nesw-resize",
        border: "3px solid #999",
        borderLeft: "none",
        borderBottom: "none",
        borderColor: "#09f",
        width: 10,
        height: 10,
        boxSizing: "border-box",
        zIndex: 1
    }
}
