import React, { useEffect, useState } from "react"
import { Grid, Typography, TextField, Button, InputBase } from "@mui/material"
import { v4 } from "uuid"
import useActivity from "contexts/Activity"
const Essay = ({
    idQuestion,
    index,
    id,
    type,
    created,
}) => {
    const { Question, ListActivitySelected, setQuestion } = useActivity()

    const [answer, setAnswer] = useState([])
    const [statement, setStatement] = useState("")
    const [lines, setLines] = useState(3)

    const Save = () => {
        const onChangeQuestionContentQuestion = {
            type: type,
            id: id,
            quest_id: idQuestion,
            index: index,
            content: {
                values: lines,
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
    },[lines])

    return (
        <Grid container xs={12}>

            {[...Array(lines ? parseInt(lines) : 0)].map((x, i) =>
                <>
                    {i === 0 && <Typography sx={{ mt: 4, fontStyle: 'italic', fontWeight: '400', color: '#808080' }}>Resposta...</Typography>}
                    <Grid mt={i === 0 ? 0 : 4} key={i} xs={12} border="1px solid #9B9B9B" bgcolor="black" />
                </>
            )}
            <Grid xs={12} mt={4} container justifyContent={"flex-end"} alignItems="center">
            <Typography sx={{ color: 'black', fontWeight: 'bold',mr: 2, mt: 1.5 }}>
                Quantidade de linhas
            </Typography>
            <TextField 
            value={lines}
                
            onChange={e => {
                
                const currentValue = e.target.value
                if((lines + currentValue) < 0){
                    return
                }
                setLines(currentValue)
            }}
            variant="standard" 
            type={"number"} 
            sx={{ width: 75 }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Grid>
        </Grid>
    )
}

export default Essay;