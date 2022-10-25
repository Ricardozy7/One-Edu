import React, { useState } from "react"

import {
    Grid,
    IconButton,
    Input,
    Typography,
    Tooltip,
    Box,
    Button,
    Modal,
    TextField,
    InputBase,
    MenuItem,
    Fade,
    Grow
} from "@mui/material"

import { useTheme } from '@mui/material/styles';

import { FaPlus, FiEdit2, FiHelpCircle, FiChevronRight, FiX, FiCheck } from "react-icons/all"

import { Helps } from "utils/helps";

import IconSelect from "@mui/icons-material/KeyboardArrowDown"
import { styled } from '@mui/material/styles';

import Select from "components/select"

import Margemlarg from "assets/images/borders/Margem larga 1.svg"
import Margemnormal from "assets/images/borders/Margem normal 1.svg"
import Margemestreita from "assets/images/borders/Margem estreita 1.svg"

import ModalComponent from "components/Modal";
import Labels from "../labels";
const fonSize = 18

const Config = ({ open, setOpen }) => {
    const theme = useTheme()

    const handleClose = () => setOpen(false);

    const [LabelsShow, setLabelsShow] = useState(false)

    const [WhoCanSee, setWhoCanSee] = useState('members')
    const [WhoCanAnswer, setWhoCanAnswer] = useState('members')

    const [margin, SetMargin] = useState('estreita')


    return (
        <ModalComponent
            open={open}
            setOpen={setOpen}
        >
            
                {
                    LabelsShow ? <Labels setLabelsShow={setLabelsShow}/> :
                        <>
                            <Typography component="h2" sx={{
                                fontSize: 27
                            }}>Ajustes</Typography>
                            <Box sx={{ marginTop: 2 }}>
                                <Grid xs={12} container>
                                    <Button fullWidth sx={{
                                        display: 'flex',
                                        justifyContent: "space-between",
                                        color: 'white',
                                        fontSize: fonSize + 2
                                    }}>
                                        <Typography>Membros</Typography>
                                        <FiChevronRight />
                                    </Button>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography sx={{
                                        fontSize: fonSize,
                                        my: 3,
                                    }}>Largura da margem</Typography>
                                    <Grid container gap={2} xs={12}>
                                        <Grid
                                            onClick={() => SetMargin('larg')}
                                            bgcolor={margin === 'larg' ? theme.palette.primary.main + 30 : 'transparent'}
                                            border={`solid 1px ${margin === 'larg' ? theme.palette.primary.main : 'white'} `}
                                            component={MarginComponentButton} xs={3} >
                                            {margin === 'larg' && <FiCheck style={{ position: 'absolute', top: 3, right: 3 }} />}

                                            <img src={Margemlarg} />
                                        </Grid>
                                        <Grid
                                            onClick={() => SetMargin('normal')}
                                            bgcolor={margin === 'normal' ? theme.palette.primary.main + 30 : 'transparent'}
                                            border={`solid 1px ${margin === 'normal' ? theme.palette.primary.main : 'white'} `}
                                            component={MarginComponentButton} xs={3}>
                                            {margin === 'normal' && <FiCheck style={{ position: 'absolute', top: 3, right: 3 }} />}
                                            <img src={Margemnormal} />

                                        </Grid>
                                        <Grid
                                            bgcolor={margin === 'estreita' ? theme.palette.primary.main + 30 : 'transparent'}
                                            onClick={() => SetMargin('estreita')}
                                            border={`solid 1px ${margin === 'estreita' ? theme.palette.primary.main : 'white'} `}
                                            component={MarginComponentButton} xs={3}>
                                            {margin === 'estreita' && <FiCheck style={{ position: 'absolute', top: 3, right: 3 }} />}

                                            <img src={Margemestreita} />

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} container>
                                    <Typography sx={{
                                        fontSize: fonSize,
                                        my: 3
                                    }}>Privacidade</Typography>
                                    <Grid xs={12} container justifyContent={"space-between"} alignItems="center">
                                        <Typography>Quem pode ver</Typography>
                                        <Select
                                            selectStyles={{
                                                backgroundColor: '#D9D9D910',
                                                borderRadius: 5,
                                                width: 175
                                            }}
                                            value={WhoCanSee}
                                            onChange={(e) => setWhoCanSee(e.target.value)}
                                            defaultValue={"members"}
                                            items={[
                                                { title: 'Apenas Membros', value: 'members' },
                                                { title: 'Todos com Link', value: 'Allwithlink' },
                                            ]}
                                        />
                                    </Grid>
                                    <Grid xs={12} mt={1} container justifyContent={"space-between"} alignItems="center">
                                        <Typography>Quem pode responder</Typography>
                                        <Select
                                            selectStyles={{
                                                backgroundColor: '#D9D9D910',
                                                borderRadius: 5,
                                                width: 175
                                            }}
                                            value={WhoCanAnswer}
                                            onChange={(e) => setWhoCanAnswer(e.target.value)}
                                            defaultValue={"members"}
                                            items={[
                                                { title: 'Apenas Membros', value: 'members' },
                                                { title: 'Todos com Link', value: 'Allwithlink' },
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                }
        </ModalComponent>
    )
}

export default Config


const MarginComponentButton = styled(Button)(({ theme }) => ({
    padding: 15,
    minHeight: 175
}));