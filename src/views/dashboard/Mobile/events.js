import React from "react"
import { Grid, Typography } from "@mui/material"
import Steps from "./step"

// import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';

import { FaCircle } from "react-icons/all"

import { useTheme } from '@mui/material/styles';


const Array = [
    {
        day: 'hoje',
        hour: '09:00',
        obs: 'Prova de matemåtica na turma 5',
        type: 'prova'
    },
    {
        day: 'amanhã',
        hour: '14:00',
        obs: 'Ativade de Física',
        type: 'atividade'
    },
    {
        day: '24 de março',
        hour: '10:00',
        obs: 'Prova de Filosofia',
        type: 'prova'
    }
]

const MobileEvents = () => {

    const theme = useTheme()

    return (
            <Grid mt={3} width={'100%'} >
                <Typography variant="h3" color="white" sx={{ mb: 2 }}>Minha agenda</Typography>

                {/* <ScrollingCarousel
                    leftIcon={() => { }}
                    rightIcon={() => { }}
                    show={2.3}
                    slide={2}
                    transition={0.5}
                    swiping={true}
                    leftArrow={() => { }}
                    rightArrow={() => { }}
                >
                    {Array.map(e => (
                        <Grid
                            sx={{
                                p: 2,
                                m: 1,
                                width: 190,
                                height: 150,
                                background: " rgba(255,255,255,0.07)",
                                backdropFilter: 'blur( 13.5px )',
                                ' -webkit-backdrop-filter': 'blur( 13.5px )',
                                borderRadius: 5
                            }}amanhã
                        >
                            <Grid container alignItems="center">
                                <FaCircle size={12} color={e.day === 'hoje' ? 
                                theme.palette.error.main : e.day === 'amanhã' ? theme.palette.success.main
                                : theme.palette.info.main} />
                                <Typography color="white" sx={{ ml: 1 }}>{e.day}</Typography>
                            </Grid>
                            <Typography sx={{ mt: 2, fontSize: 20 }} color="white">{e.hour}</Typography>
                            <p style={{ color: '#EAEAEA', fontSize: 13 }}>{e.obs}</p>

                        </Grid>
                    ))}

                </ScrollingCarousel> */}
            </Grid>
    )
}

export default MobileEvents