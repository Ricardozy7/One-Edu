import React from "react"

import { Grid, Typography } from "@mui/material"

import { useTheme } from '@mui/material/styles';


const Cabecalho = () => {
    const theme = useTheme()

    return (
        <Grid xs={8.8}>
            <Typography variant="h3" color="white">
                Cabeçalho
            </Typography>
            <Grid xs={12}>
                <Grid mt={2} xs={12} bgcolor="white" minHeight="20vh" p={2} borderRadius={2}>
                    <Grid conteiner xs={12} flexDirection="row" display="flex" height={"100%"}>
                        <Grid item width="15%" p={2} height={"100%"}>
                            <img width="100" src="https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png" />
                        </Grid>
                        <Grid width="85%" p={2} item height={"100%"}>
                            <Typography variant="h3">
                                Harvard University
                            </Typography>
                            <Grid width="100%">
                                <Grid width="100%" mt={1} display="flex" flexDirection="row" alignItems="flex-end" justifyContent="space-between">
                                    <Typography variant="h4">
                                        Nome:
                                    </Typography>
                                    <Grid borderBottom="solid 1px #000" />
                                    <Typography ml={1} variant="h4">
                                        Data: __/__/____
                                    </Typography>
                                </Grid>
                                <Grid width="100%" mt={1} display="flex" flexWrap="row" justifyContent="space-between">
                                    <Typography  variant="h4">
                                        Ano: ___
                                    </Typography>
                                    <Typography ml={1} variant="h4">
                                        Turma/Sala: ___
                                    </Typography>
                                    <Typography ml={1} variant="h4">
                                        Professor:  David Malan
                                    </Typography>
                                    <Typography ml={1} variant="h4">
                                        Diciplina:  Ciência da Computação
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid display="flex" mt={2} p={2} flexDirection="row" >
                        <Typography variant="h4">Intodução:</Typography>
                        <Typography ml={2}>
                            Bolo de chocolate é um bolo simples ou confeitado,
                            que leva chocolate derretido ou em pó, ou ainda cacau em pó em sua confecção.
                            Os ingredientes mais comuns são o ovo, o leite, a manteiga ou substituto, açúcar e fermento.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Cabecalho