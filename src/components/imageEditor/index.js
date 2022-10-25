import {
    Grid,
    IconButton,
    Menu,
    useTheme,
    Popper,
    Box,
    ButtonGroup
} from "@mui/material"

import "./style.modules.css"

import { Resizable } from "re-resizable"

import {
    FiMoreVertical,
    FiAlignLeft,
    FiAlignRight,
    FiAlignJustify,
    FiTrash2
} from "react-icons/all"
import { useState, useRef, useEffect, memo, useReducer } from "react";

const ImageEditor = ({
    imgsQuestion,
    TaskSelected,
    EditQuestion,
    index
}) => {

    const refEditorImage = useRef()

    let [editorStart, setEditorStart] = useState(false);

    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(!anchorEl);
    };






    const AdjusteImg = (field, value) => {
        const edtItem = JSON.parse(localStorage.getItem("@projects-tasks")).
            filter(item => item.id === TaskSelected.id)
        const getOteherTextCurrent = edtItem[0].content.questions[0].content
        getOteherTextCurrent.forEach(item => {
            if (item.id === imgsQuestion.id) {
                item[field] = value;
            }
        })
        EditQuestion("content", "content", getOteherTextCurrent)
    }

    const ref = useRef(null);
    const onClickOutside = () => {
        setEditorStart(false)
    }

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

    return (
        <Grid 
        onMouseDown={(e) => e.stopPropagation()}
        justifyContent={imgsQuestion?.position} position="relative" container xs={12}>
            <Grid position="relative" style={{ maxWidth: '100%' }}>
                <Grid position="relative">
                    
                        <IconButton
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
                        </IconButton>
                        {
                            anchorEl && <Grid
                            sx={{
                                position: "absolute",
                                right: -100,
                                top: 30,
                                borderRadius: 4,
                                height: 50,
                                zIndex: 9999
                            }}
                            id={imgsQuestion.id} open={open} anchorEl={anchorEl}>
                            <Box sx={{ p: 1, 
                                borderRadius: 2,                                
                                bgcolor: theme.palette.background.bg800 }}>
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label="Disabled elevation buttons"
                                >
                                    <IconButton sx={{ m: 1 }}
                                        onClick={() =>
                                            AdjusteImg("position", "left")
                                        }>
                                        <FiAlignLeft color="white" />
                                    </IconButton>
                                    <IconButton sx={{ m: 1 }} onClick={() =>
                                        AdjusteImg("position", "center")
                                    }>
                                        <FiAlignJustify color="white" />
                                    </IconButton>
                                    <IconButton sx={{ m: 1 }} onClick={() =>
                                        AdjusteImg("position", "right")
                                    }>
                                        <FiAlignRight color="white" />
                                    </IconButton>
                                    <IconButton sx={{ m: 1 }} onClick={() =>
                                        AdjusteImg("value", null)
                                    }>
                                        <FiTrash2 color="white" />
                                    </IconButton>
                                </ButtonGroup>
                            </Box>
                        </Grid>
                        }
                </Grid>
                {
                    
                        <div
                            ref={ref}
                            onClick={() => setEditorStart(imgsQuestion.id)}
                            style={{ display: "contents" }}
                        >
                            <Resizable
                                size={{ width: imgsQuestion.width, height: imgsQuestion.height }}
                                handleStyles={editorStart === imgsQuestion.id ? styleResizable : {
                                    top: { display: "none" },
                                    topLeft: { display: "none" },
                                    topRight: { display: "none" },
                                    left: { display: "none" },
                                    right: { display: "none" },
                                    bottom: { display: "none" },
                                    bottomLeft: { display: "none" },
                                    bottomRight: { display: "none" }
                                }}
                                maxWidth={"70vw"}
                                maxHeight={500}
                                onResizeStop={(e, direction, ref, d) => {
                                    AdjusteImg("width", imgsQuestion.width + d.width)
                                    AdjusteImg("height", imgsQuestion.height + d.height)

                                }}
                                defaultSize={{
                                    height: imgsQuestion.height,
                                    width: imgsQuestion.width
                                }}
                                
                                style={{
                                    border: editorStart === imgsQuestion.id ? "2px solid rgba(57,155,252,0.6)" : "0px solid",
                                    padding: editorStart === imgsQuestion.id ? 3 : 0,
                                    userSelect: "none",
                                }}
                                >
                                <img
                                style={{ width: "100%", height: "100%" }}
                                    src={imgsQuestion?.value}

                                />
                            </Resizable>
                        </div>
                        // <img 
                        // ref={refEditorImage}
                        // onClick={() => {
                        // }}
                        // src={imgsQuestion?.value} style={{
                        //     height: imgsQuestion.height,
                        //     width: imgsQuestion.width 
                        // }} />

                }

                {/* <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    sx={{
                        position: "absolute"
                    }}
                    PaperProps={{
                        style: {
                            backgroundColor: 'rgba(38, 47, 105, 0.95)'
                        },
                    }}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <Grid>
                        <IconButton sx={{ m: 1 }}
                            onClick={() =>
                                AdjusteImg("position", "left")
                            }>
                            <FiAlignLeft color="white" />
                        </IconButton>
                        <IconButton sx={{ m: 1 }} onClick={() =>
                            AdjusteImg("position", "center")
                        }>
                            <FiAlignJustify color="white" />
                        </IconButton>
                        <IconButton sx={{ m: 1 }} onClick={() =>
                            AdjusteImg("position", "right")
                        }>
                            <FiAlignRight color="white" />
                        </IconButton>
                        <IconButton sx={{ m: 1 }} onClick={() =>
                            AdjusteImg("value", null)
                        }>
                            <FiTrash2 color="white" />
                        </IconButton>
                    </Grid>
                </Menu> */}
            </Grid>
        </Grid>
    )
}

export default memo(ImageEditor);








const styleResizable = (colorPrimary) => {
    return {
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
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
            borderColor: colorPrimary,
            width: 10,
            height: 10,
            boxSizing: "border-box",
            zIndex: 1
        }
    }
}





