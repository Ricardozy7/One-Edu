import React, { useEffect, useState, useRef, useMemo, useCallback, memo } from "react"

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToRraft from "html-to-draftjs";


import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  Menu as MenuClickMouse,
  Item,
  Separator,
  Submenu,
  useContextMenu
} from "react-contexify";

import "react-contexify/dist/ReactContexify.css";

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

import { FaTrash } from "react-icons/fa"
import { RemoteServices } from "services"

import { Equations } from "utils/equations"
import { useTheme } from '@mui/material/styles';

import { MathBlock } from "./Math";

import Read from "./Read"

const TextEditor = ({
  DeleteMe,
  index,
  EditQuestion,
  TaskSelected,
  TextQuestion,


}) => {
  const refInput = useRef()
  const refEditor = useRef(null)

  const MENU_ID = `menu-id-${TextQuestion.id}`;

  const [editor, setEditor] = useState(``);
  const [helpEquations, seteHelpEquations] = useState(false);

  let [showInfo1, setShowInfo1] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const { show } = useContextMenu({
    id: MENU_ID
  });


  function displayMenu(e) {
    show(e);
  }



  const theme = useTheme()

  useEffect(() => {
    try {
      const contentBlock = htmlToRraft(TextQuestion.value)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      setEditorState(EditorState.createWithContent(contentState))
    } catch (r) {

    }
  }, [])

  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        showInfo1 && setShowInfo1(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showInfo1]);



  const deteleMe = () => {
    const edtItem = JSON.parse(localStorage.getItem("@projects-tasks")).
      filter(item => item.id === TaskSelected.id)
    const deleteME = edtItem[0].content.questions[0].texts.filter(item => item.id !== TextQuestion.id)
    EditQuestion("texts", "texts", deleteME)
  }



  useEffect(() => {
    // if (draftToHtml(convertToRaw(editorState.getCurrentContent())).indexOf("$") >= 0) {
    //   seteHelpEquations(true)
    // } else {
    //   seteHelpEquations(false)
    // }
    const edtItem = JSON.parse(localStorage.getItem("@projects-tasks")).
      filter(item => item.id === TaskSelected.id)
    const getOteherTextCurrent = edtItem[0].content.questions[0].content
    getOteherTextCurrent.forEach(item => {
      if (item.id === TextQuestion.id) {
        item.value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      }
    });
    EditQuestion("content", "content", getOteherTextCurrent)
  }, [editorState])


  const config = {
    readonly: false,
    height: 500,
  };




  return (
    <div style={{
      width: "100%"
    }}>
      <div
        ref={ref}
        className={`editor-${index}`}
        tabIndex={1}
        style={{
          overflow: "hidden",
          height: "100%",
          width: "100%",
        }}

      >
        {
          showInfo1 ?
            <Editor
              editorState={editorState}
              customStyleMap={{
                redBackground: {
                  backgroundColor: 'red'
                },
                greenBackground: {
                  backgroundColor: 'green'
                }
              }}
              // toolbarOnFocus
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
                inline: { inDropdown: true },
                list: { inDropdown: false },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false },
              }}
            />
            :
            <div
              onClick={() => setShowInfo1(true)}
              style={{ width: "100%" }}>
              {draftToHtml(convertToRaw(editorState.getCurrentContent())).length <= 8 && "New Text is empty"}
              <Read choose={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
            </div>
        }
        {/* {
          helpEquations &&
          <>
            <MathBlock content={convertToRaw(editorState.getCurrentContent())} index={index} />
            <Grid
              bgcolor={theme.palette.background.bg800}
              style={{
                gap: 5,
                flexWrap: "wrap",
                display: "flex",
                maxWidth: 300,
                maxHeight: 300,
                padding: 5,
                borderRadius: 3
              }}>
              {
                Equations.map((equation, i) => (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      let converText = convertToRaw(editorState.getCurrentContent())
                      let ActiveVal = ""
                      if (converText[converText.length - 1] !== "$") {
                        ActiveVal = "$"
                      } else {
                        ActiveVal = ""
                      }
                      setEditorState(`${converText}${ActiveVal}${equation.code}${"$"}`)
                    }} key={i}
                  >
                    <img src={equation.icon} width={20} />
                  </Button>

                ))
              }
            </Grid>
          </>
        } */}
      </div>
      <MenuClickMouse id={MENU_ID} theme={"demo-toolbar-custom"}>
        <Item onClick={deteleMe}>
          <Grid color="white" container alignItems={"center"} gap={1} theme>
            <FaTrash color="red" style={{
              marginRight: 5
            }} /> Excluir
          </Grid>

        </Item>
        <Separator />
      </MenuClickMouse>
    </div>
  )
}

export default memo(TextEditor)
