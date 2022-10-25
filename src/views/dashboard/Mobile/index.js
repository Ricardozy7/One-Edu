import React, { useState } from "react"
import { Grid, TextField, Typography } from "@mui/material"
import Steps from "./step"

import { useTheme } from '@mui/material/styles';

import Events from "./events"

import Shortcuts from "./shortcuts"

import Notify from "./notify"

const init = `
Este é um pequeno bloco de notas onde o
professor pode anotar pequenas informações que
não sejam tão importantes a ponto de estarem na
agenda. Pode colocar uma frase motivacional aqui
também :) O limite de caracteres desse bloco de
notas deve ser 350 caracteres. Não é para se
colocar um parágrafo aqui, então não tem
necessidades de muito espaço.
`

const MobileMain = () => {

    const theme = useTheme()
    const [notepad, setNotepad] = useState(init)




    return (
        <Grid width={"100%"} height="90%" overflowY={"scroll"} className="mobile" >
            {/* <Steps /> */}
            <Events />
            <Grid   >
                <Grid className="wrapperMobile" >
                    <Shortcuts />
                </Grid>
                <Grid className="wrapperMobile" >
                    <Grid mt={2} xs={12} >
                        <Typography variant="h3" color="white" sx={{ mb: 2 }}>Bloco de notas</Typography>
                        <textarea
                            value={notepad}
                            onChange={e => setNotepad(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                padding: 10,
                                fontSize: 12,
                                fontWeight: 'bold',
                                fontFamily: 'sans-serif'
                            }}
                            rows="8"></textarea>
                    </Grid>
                </Grid>
            </Grid>
            <Notify />
        </Grid>
    )
}


export default MobileMain