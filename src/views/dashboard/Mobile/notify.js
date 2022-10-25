import React from "react"
import { Grid, Typography } from "@mui/material"
import Steps from "./step"

// import { Carousel, ScrollingCarousel } from '@trendyol-js/react-carousel';

import { BiCheckCircle } from "react-icons/all"

import Positivo from "assets/images/icons/positivo.svg"

import { useTheme } from '@mui/material/styles';


const MobileNotfy = () => {

    const theme = useTheme()

    return (
        <Grid mt={3} width={'100%'}>
            <Typography variant="h3" color="white" sx={{ mb: 2 }}>Lembretes e notificações</Typography>
            <Grid direction="row" mt={3} width={'100%'} container justifyContent={"space-around"} alignItems={"center"} height={100} style={{
                background: `linear-gradient(to right, ${theme.palette.success.main + '50'}, transparent)`,
                flexDirection: 'row'
            }} borderRadius={5}>
                {/* <BiCheckCircle /> */}
                <img src={Positivo} style={{}} width={50} />
                <Typography color="white" style={{ width: '70%', fontSize: 12 }} >
                    Exemplos de notificações positivas: "R$
                    20,00 de crédito adicionado ao seu saldo".
                    Até 3 linhas de descrição, se não couber...
                </Typography>
            </Grid>
        </Grid>
    )
}

export default MobileNotfy