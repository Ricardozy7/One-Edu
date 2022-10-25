import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';


const steps = [
    // {
    //     label: '09:00 Aula matematica na turma 5',
    // },
    // {
    //     label: 'Reunião com os pais',
    // },
    // {
    //     label: 'corregir provas 2 ano',
    // },
];




function ColorlibStepIcon(props) {
    return (
        <Grid sx={{ width: 15, height: 15, backgroundColor: '#548', borderRadius: 5 }}></Grid>
    );
}

export default function VerticalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);


    return (
        <Grid
            className="glass" sx={{
                p: 2,
                minWidth: '22%',
                borderRadius: 5
            }}>
            <Box sx={{ height: '45%' }}>
                <Typography variant="h3" color="white" sx={{ mb: 2 }}> Tarefas de hoje </Typography>
                <Stepper sx={{ mt: 5 }} activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                StepIconComponent={ColorlibStepIcon}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Grid>
                <Typography variant="h4" color="white"> Próximos eventos </Typography>
            </Grid>
        </Grid>
    );
}