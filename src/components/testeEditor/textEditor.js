import React, { useEffect, useState, useRef, useCallback } from "react"

import Read from "./Read"
// import { MathBlock } from "./Math";
// Components

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToRraft from "html-to-draftjs";


import { Equations } from "./mathEquations";

import useActivity from "contexts/Activity"
import {
    toggleCustomInlineStyle, getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";

import "./style.css"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@mui/material";
import { RemoteServices } from "services";


const App = ({
    index,
    item,
    items,
    setshowEditorText,
    showEditorText,
    idQuestion
}) => {

    return (
        <div>
            <ArrayTeste
                key={item.id}
                item={item}
                items={items}
                index={index}
                showEditorText={showEditorText}
                setshowEditorText={setshowEditorText}
                idQuestion={idQuestion}
            />


        </div>
    )

}

export default App

const ArrayTeste = ({
    index,
    item,
    items,
    showInfo1,
    setShowInfo1,
    setshowEditorText,
    showEditorText,
    idQuestion
}) => {

    const { Question, ListActivitySelected, setQuestion, setQuestionItems } = useActivity()

    const MENU_ID = `menu-id-text-editor-${item.id}`;

    const wrapperRef = useRef(null);
    const editorRef = useRef()
    const [editor, setEditor] = useState();
    const [eqtVis, seteqtVis] = useState(false);
    const [search, setSearch] = useState("");

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };



    const { show } = useContextMenu({
        id: MENU_ID
    });

    const refInput = useRef()
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                showEditorText === item.id && setshowEditorText(false) && Save();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [showEditorText]);



    useEffect(() => {
        // const fontSize = getSelectionCustomInlineStyle(editorState, ['FONTSIZE',]).FONTSIZE
        // const fontFamily = getSelectionCustomInlineStyle(editorState, ['FONTFAMILY',]).FONTFAMILY
        // if (!fontSize) {
        //     setEditorState(toggleCustomInlineStyle(editorState, 'fontSize', 24))
        // }
        // if (!fontFamily) {
        //     setEditorState(toggleCustomInlineStyle(editorState, 'fontFamily', 'Arial'))
        // }
        const MyQues = Question.filter(_que => _que.id === idQuestion)
        if (MyQues[0] && MyQues[0]?.content?.length > 0) {
            const myText = MyQues[0]?.content.filter(cont => cont.id === item.id)
            if(myText[0]?.content){
                const contentBlock = htmlToRraft(myText[0]?.content)
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                setEditorState(EditorState.createWithContent(contentState))
            }
            
        }
    }, [])

    const focusEditor = (ref) => {
        ref?.focus();

    }

    const Save = () => {
        const onChangeTextContentQuestion = {
            ...item,
            index: index,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
        const newArr = Question.map((object, _index) => {
            object.index = _index;
            if (object.id === idQuestion) {
                const getQuestion = object?.content.sort((a, b) => a.index - b.index).filter(e => e.id !== onChangeTextContentQuestion.id)
                return { ...object, content: [...getQuestion, onChangeTextContentQuestion] };
            }
            return object;
        })

        setQuestion(newArr)


        RemoteServices.Teachers.ResourcesActivity({ 
            idActivity: 1,
            data: {
                    kind: "assertiva",
                    listId: item.id,
                    resources: [{
                        kind: "text",
                        content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                        action: "add"
                    }]
            }
         })
         .then((e) => {
            console.log(e)
         })

    }

    useEffect(() => {
        Save()
    }, [showEditorText])

    return (
        <div>
            {/* <h3>Teste {index}</h3> */}
            <div
                onContextMenu={show}
                ref={ref}
                id={item.id}
                style={{ overflow: "hidden", marginTop: 10 }}
                className={`editor-${item.id}`}>
                {
                    showEditorText === item.id ?
                        <Editor
                            editorState={editorState}
                            editorRef={focusEditor}
                            autoFocus
                            customStyleMap={{
                                redBackground: {
                                    backgroundColor: 'red'
                                },
                                greenBackground: {
                                    backgroundColor: 'green'
                                }
                            }}
                            toolbarClassName="demo-toolbar-custom"
                            wrapperClassName="wrapper-class"
                            editorClassName="emo-editor-custom"
                            onEditorStateChange={onEditorStateChange}

                            localization={{
                                locale: 'br',
                            }}
                            toolbar={{
                                options: ['inline', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
                                // options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                                fontFamily: {
                                    inDropdown: true,
                                    options: ['Arial', 'Poppins', 'sans-serif', 'Roboto', 'Segoe UI', '-appel-system', 'Impact', 'Geargia', 'Tahoma']
                                },
                                inline: { inDropdown: true },
                                list: { inDropdown: false },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: false },
                            }}
                        /> :
                        <div
                            onClick={() => setshowEditorText(item.id)}
                            style={{ width: "100%" }}>
                            {draftToHtml(convertToRaw(editorState.getCurrentContent())).length <= 8 && "New Text is empty"}
                            <Read choose={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
                        </div>
                }



                <Menu
                    style={{
                        maxHeight: 400,
                        overflowY: 'scroll',
                        width: 500,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2
                    }}
                    id={MENU_ID}>
                    {
                        Equations.map(() => (
                            <Button style={{
                                height: 50,
                                width: 50,
                                backgroundColor: '#457',
                            }}>Teste</Button>
                        ))
                    }
                </Menu>

            </div>
        </div>
    )
}