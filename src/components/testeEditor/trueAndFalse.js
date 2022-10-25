import React, { useEffect, useState } from "react"
import { Grid, Typography, TextField, Button } from "@mui/material"
import { v4 } from "uuid"
import useActivity from "contexts/Activity"

const TrueAndFalseQuestion = ({
    id,
    type,
    created,
    idQuestion
}) => {
    const { Question, ListActivitySelected, setQuestion } = useActivity()

    const [options, setOptions] = useState([])

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
        const onChangeImageContentQuestion = {
            type: type,
            quest_id: idQuestion,
            id: id,
            index: 999,
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
    },[options])


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
                    Marque (V) para Verdadeiro e (F) pra Falso:
                </Typography>
            </Grid>
            {
                options.map((a, i) => (
                    <Grid mt={2} container alignItems="center">
                        <Typography className="dark" component="span" sx={{ fontSize: 20, color: 'black' }}>( )</Typography>
                        <TextField

                            multiline
                            onChange={e => {
                                editOptions(a.id, 'value', e.target.value)
                            }}
                            value={a.value}
                            id="filled-size-small"
                            variant="standard"
                            placeholder="Opção..."
                            sx={{ width: '96%', marginLeft: '1%' }}
                        />
                    </Grid>
                ))
            }
            <Button onClick={AddOptions}>
                <Typography className="dark" sx={{ fontStyle: 'italic', fontWeight: '400', color: '#808080' }}>
                    Adicionar opção...
                </Typography>
            </Button>
        </Grid>
    )
}

export default TrueAndFalseQuestion;