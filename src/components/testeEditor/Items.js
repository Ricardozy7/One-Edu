import { Grid } from "@mui/material";
import { Resizable } from "re-resizable"
import React from "react"
import { useState, useEffect, useRef, useReducer } from "react"

import { InfoBox } from "./outisde"

import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";

import {
    FaAlignCenter,
    FaAlignLeft,
    FaAlignRight
} from "react-icons/fa"
import useActivity from "contexts/Activity"


import Editor from "./textEditor"
import ImageEditorComponent from "./imageEditor";

const GridItems = ({
    item,
    imgsQuestion,
    setImage,
    Image,
    setAnchorEl,
    anchorEl,
    index,
    items,
    setItems,
    questionType,
    showEditorText,
    setshowEditorText,
    idQuestion,
    setImgsQuestion
}) => {
    const {  QuestionItems, setQuestionItems, Question } = useActivity()

    const MENU_ID = `menu-id-${item.id}`;
    let [showInfo1, setShowInfo1] = useState(false);
    const [newLink, setNewLink] = useState("")
    const refEditorImage = useRef()

    const [positionImg, setPositionImg] = useState('start')


    const [imageSizeble, setimageSizeble] = useState({
        id: item.id,
        width: 200,
        height: 300

    })


    useEffect(() => {
        // console.log(Question)
        // console.log(QuestionItems)
    }, [imageSizeble])

    const [open, setOpen] = useState(false);

    const { show } = useContextMenu({
        id: MENU_ID
    });

    return (
        <Grid
            xs={11.5}
            onMouseDown={(e) => e.stopPropagation()}>
            {
                item.type === "image" ?
                    <Grid xs={12}

                        ref={refEditorImage}
                        onContextMenu={show}
                        style={{
                            position: "relative"
                        }}
                        onClick={() => {
                            setAnchorEl(item.id)
                        }}
                    >
                        <Grid xs={12} container justifyContent={positionImg}>
                            <InfoBox
                                show={showInfo1}
                                onClickOutside={() => { setShowInfo1(null) }}
                                imageSizeble={imageSizeble}
                                item={item}
                                index={index}
                                anchorEl={anchorEl}
                                items={items}
                                setimageSizeble={setimageSizeble}
                                setShowInfo1={setShowInfo1}
                                showEditorText={showEditorText}
                                setshowEditorText={setshowEditorText}
                                idQuestion={idQuestion}
                                imgsQuestion={imgsQuestion}
                                positionImg={positionImg}
                                setPositionImg={setPositionImg}
                                setItems={setItems}
                                setImgsQuestion={setImgsQuestion}
                            />
                        </Grid>
                        <Menu

                            id={MENU_ID}>
                            {/* @ts-ignore */}
                            {/* <Item disabled>
                                link: <input 
                                value={newLink}
                                type="text" onChange={(e) => setNewLink(e.target.value)}/>
                                <button onClick={ChangetextLink}></button>
                            </Item> */}
                        </Menu>
                    </Grid>
                    :
                    <Editor idQuestion={idQuestion}  items={items} index={index} item={item} showEditorText={showEditorText}
                    setshowEditorText={setshowEditorText} />
            }

            <ImageEditorComponent open={open} setOpen={setOpen} img={link} />

        </Grid>)
}

export default GridItems;





const link = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"