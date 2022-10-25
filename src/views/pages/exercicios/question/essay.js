import React, { useState } from "react"
import { Grid, Typography, TextField, Button, InputBase } from "@mui/material"
import { v4 } from "uuid"

const Essay = () => {

    const [answer, setAnswer] = useState([])
    const [statement, setStatement] = useState("")
    const [lines, setLines] = useState(3)



    return (
        <Grid container xs={12}>
            {/* <Grid
                mb={2}
                xs={12}
                bgcolor="#f4f4f4"
                container
                borderBottom="1px solid #707070"
                p={2}>
                <InputBase
                    value={statement}
                    onChange={e => setStatement(e.target.value)}
                    id="standard-basic"
                    placeholder="Enunciado..."
                    variant="standard"
                    sx={{
                        width: '100%',
                    }}
                />
            </Grid> */}

            {[...Array(lines ? parseInt(lines) : 0)].map((x, i) =>
                <>
                    {i === 0 && <Typography sx={{ mt: 4, fontStyle: 'italic', fontWeight: '400', color: '#808080' }}>Resposta...</Typography>}
                    <Grid mt={i === 0 ? 0 : 4} key={i} xs={12} border="1px solid #DADADA" bgcolor="black" />
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