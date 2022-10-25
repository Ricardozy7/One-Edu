import React, { useEffect, useState } from "react"
import { Grid, Typography, TextField, Button } from "@mui/material"
import { v4 } from "uuid"
import useActivity from "contexts/Activity"

const ColumnsActivity = ({
    id,
    type,
    created,
    idQuestion
}) => {
    const { Question, ListActivitySelected, setQuestion } = useActivity()

    const [options, setOptions] = useState([])
    const [optionValueEdting, setOptionValueEdting] = useState('')

    const AddOptions = () => {
        setOptions([...options, {
            id: v4(),
            value: '',
            value2: '',
            created_at: new Date()
        }])
        Save()
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
        const onChangeImageContentQuestion = {
            type: type,
            id: id,
            index: 999,
            quest_id: idQuestion,
            content: {
                values: options,
            }
        }
        const newArr = Question.map(object => {
            if (object.activity_id === ListActivitySelected.id) {
                const getQuestion = object?.content.sort((a, b) => a.index - b.index).filter(e => e.id !== onChangeImageContentQuestion.id)
                return { ...object, content: [...getQuestion, onChangeImageContentQuestion] };
            }
            return object;
        });

        setQuestion(newArr)
    }

    useEffect(() => {
        Save()
    }, [])

    return (
        <Grid container xs={12}>
            <Grid
                mb={2}
                xs={12}
                bgcolor="#f4f4f4"
                container
                borderBottom="1px solid #707070"
                p={2}>
                <Typography className="dark" sx={{ fontStyle: 'italic', fontWeight: '400' }}>
                    Relacione corretamente as colunas:
                </Typography>
            </Grid>
            {
                options.map((a, i) => (
                    <Grid mt={2} xs={12} container alignItems="start-">
                        <Grid xs={6}>
                            <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>({i + 1})</Typography>
                            <TextField
                                onBlur={() => Save()}
                                multiline
                                onChange={e => {
                                    editOptions(a.id, 'value', e.target.value)
                                }}
                                value={a.value}
                                id="filled-size-small"
                                variant="standard"
                                placeholder="Opção..."
                                sx={{ width: '90%', marginLeft: '1%' }}
                            />
                        </Grid>
                        <Grid xs={6} container flexDirection="row">
                            <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>( )</Typography>
                            <TextField
                                onBlur={() => Save()}
                                multiline
                                onChange={e => {
                                    editOptions(a.id, 'value2', e.target.value)
                                }}
                                value={a.value2}
                                id="filled-size-small"
                                variant="standard"
                                placeholder="Opção..."
                                sx={{ width: '93%', marginLeft: '1%' }}
                            />
                        </Grid>
                    </Grid>
                ))
            }
            <Grid xs={12} mt={2} alignItems="center" container justifyContent="center">
                <Button onClick={AddOptions}>
                    <Typography className="dark" sx={{ fontStyle: 'italic', fontWeight: '400', color: '#808080' }}>
                        Adicionar opção...
                    </Typography>
                </Button>
            </Grid>

        </Grid>
    )
}

export default ColumnsActivity;