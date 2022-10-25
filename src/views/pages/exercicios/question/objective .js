import React, { useEffect, useState } from "react"
import { Grid, Typography, TextField, Button, IconButton } from "@mui/material"
import { v4 } from "uuid"

import { FiCheck, FiX } from "react-icons/all"
import OneCheckBox from "components/checkBox"
import useActivity from "contexts/Activity"
import { useTheme } from '@mui/material/styles';

import {
    Menu as MenuContext,
    Item,
    Separator,
    Submenu,
    useContextMenu
} from "react-contexify";
import { alphabet } from "views/utilities/alphabet"

const Objective = ({
    id,
    type,
    index,
    idQuestion
}) => {

    const { Question, ListActivitySelected, setQuestion } = useActivity()
    const theme = useTheme()
    const [options, setOptions] = useState([])

    const [TypeAnswer, setTypeAnswer] = useState('ball')
    const [CorrectQuestion, setCorrectQuestion] = useState(null)



    const AddOptions = () => {
        setOptions([...options, {
            id: v4(),
            value: '',
            created_at: new Date()
        }])
    }

    const editOptions = (i, field, value) => {
        const OtherOptionSelected = options.filter(e => e.id !== i)
        const getOptionSelected = options.filter(e => e.id === i)
        const optionSelected = getOptionSelected[0]
        const newValue = {
            ...optionSelected,
            [field]: value
        }
        const values = [...OtherOptionSelected, newValue]
        setOptions(values.sort((a, b) => a.created_at - b.created_at))

    }

    const Save = () => {
        const onChangeQuestionContentQuestion = {
            type: type,
            id: id,
            index: index,
            quest_id: idQuestion,
            typeAnswer: TypeAnswer,
            correct_answer: CorrectQuestion,
            content: {
                values: options,
            }
        }
        const newArr = Question.map(object => {
            if (object.id === idQuestion) {
                const getQuestion = object?.content.sort((a, b) => a.index - b.index
                ).filter(e => e.id !== onChangeQuestionContentQuestion.id)
                return { ...object, content: [...getQuestion, onChangeQuestionContentQuestion] };
            }
            return object;
        });
        setQuestion(newArr)
    }


    useEffect(() => {
        Save()
    }, [options, TypeAnswer])


    const Remove = (id) => {
        const OtherOptionSelected = options.filter(e => e.id !== id)
        setOptions(OtherOptionSelected.sort((a, b) => a.created_at - b.created_at))
    }


    return (
        <Grid container xs={12}>
            {
                options.map((a, index) => (
                    <OptionsItems 
                        index={index}
                        TypeAnswer={TypeAnswer}
                        items={a}
                        editOptions={editOptions}
                        setCorrectQuestion={setCorrectQuestion}
                        Remove={Remove}
                        setTypeAnswer={setTypeAnswer}
                        CorrectQuestion={CorrectQuestion}
                    />
                ))
            }
            <Grid
                component={Button}
                container
                alignItems={"center"}
                justifyContent={"flex-start"}
                onClick={AddOptions} sx={{ mt: 1, ml: -1 }}>
                <Grid
                    height={15}
                    width={15}
                    border="solid 1px black"
                    borderRadius={'50%'}
                />
                <Typography className="dark" sx={{ fontStyle: 'italic', fontWeight: '400', color: '#808080', ml: 2 }}>
                    Adicionar opção...
                </Typography>
            </Grid>
            <Grid
                container
                ml={-2}
                alignItems="center"
            >
                <OneCheckBox />
                <Typography
                    className="dark"
                    sx={{
                        fontSize: 12,
                        color: '#15133F'
                    }}
                >
                    Sinalizar resposta correta
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Objective;



const OptionsItems = ({
    index,
    TypeAnswer,
    items,
    editOptions,
    setCorrectQuestion,
    Remove,
    setTypeAnswer,
    CorrectQuestion
}) => {


    const MENU_ID = `menu-id-${items.id}`;
   
    const { show } = useContextMenu({
        id: MENU_ID
    });
    const theme = useTheme()

    const [optionValue, setOptionValue] = useState('')

    useEffect(() => {
        setOptionValue(items.value)
    },[items])

    return (
        <Grid mt={2} key={index} container alignItems="center" onContextMenu={show} >
            {
                TypeAnswer === 'ball' ?
                    <Grid
                        height={15}
                        width={15}
                        border="solid 1px black"
                        borderRadius={'50%'}
                    /> :
                    TypeAnswer === 'lettersParentheses' || TypeAnswer === 'lettersPoint' ?
                        <Typography className="dark" sx={{
                            fontSize: '1rem'
                        }}>
                            {`${alphabet[index]} ${TypeAnswer === 'lettersParentheses' ? ')' : "."}`}
                        </Typography>
                        :
                        TypeAnswer === 'numberParentheses' || TypeAnswer === 'numberPoint' ?
                            <Typography className="dark" sx={{
                                fontSize: '1rem'
                            }}>
                                {`${index + 1}${TypeAnswer === 'numberParentheses' ? ')' : '.'}`}
                            </Typography>
                            : ''
            }

            <TextField
                multiline
                onBlur={e => editOptions(items.id, 'value', e.target.value)}
                onChange={e => setOptionValue(e.target.value)}
                value={optionValue}
                id="filled-size-small"
                variant="standard"
                placeholder="Opção..."
                sx={{ width: '88%', marginLeft: '1%' }}
            />
            <IconButton onClick={() => {
                setCorrectQuestion(items.id)
            }}>
                <FiCheck color={CorrectQuestion === items.id ? theme.palette.success.main : 'inherit'} />
            </IconButton>
            <IconButton
                onClick={() => Remove(items.id)}
            >
                <FiX />
            </IconButton>
            <MenuContext
                style={{
                    maxHeight: 400,
                    maxWidth: 200,
                    flexDirection: 'column',
                    overflowY: 'auto',
                    width: 500,
                    display: 'flex',
                    gap: 2,
                }}
                id={MENU_ID}>
                <Item
                
                    onClick={() => setTypeAnswer('ball')}
                    style={{ color: 'white' }}>
                    tipo {'◯'}
                </Item>
                <Item
                    onClick={() => setTypeAnswer('lettersParentheses')}
                    style={{ color: 'white' }}>
                    tipo {'"a)"'}
                </Item>
                <Item
                    onClick={() => setTypeAnswer('lettersPoint')}
                    style={{ color: 'white' }}>
                    tipo {'"a."'}
                </Item>
                <Item
                    onClick={() => setTypeAnswer('numberParentheses')}
                    style={{ color: 'white' }}>
                    tipo {'"1)"'}
                </Item>
                <Item
                    onClick={() => setTypeAnswer('numberPoint')}
                    style={{ color: 'white' }}>
                    tipo {'"1."'}
                </Item>
            </MenuContext>
        </Grid>
    )
}