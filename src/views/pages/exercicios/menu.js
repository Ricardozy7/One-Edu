import React from "react"
import {
    Grid,
    Typography,
    TextField,
    InputBase,
    Button,
    Switch
} from "@mui/material"
import { FaTrash, FaPlus } from "react-icons/all"

import { alpha, styled } from '@mui/material/styles';


const MenuExercicios = ({
    logo,
    schoolName,
    studentName,
    yaer,
    turm,
    teacher,
    schoolSubjects,
    date,
    setLogo,
    setSchoolName,
    setStudentName,
    setYaer,
    setTurm,
    setTeacher,
    setSchoolSubjects,
    setDate,
}) => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <Grid minHeight={'85vh'} xs={3} className="glass" p={2} borderRadius={2}>
            <Typography variant="h3" color="white">Cabeçalho</Typography>
            <Grid mt={2}>
                <Grid container flexDirection="row">
                    <Button variant="contained" sx={{ ...styleButton }}>Novo</Button>
                    <Button variant="contained" sx={{ ...styleButton }}>Salvos</Button>
                    <Button variant="contained" sx={{ ...styleButton }}>Abrir</Button>
                </Grid>
            </Grid>
            <Grid p={2}>
                <Grid color="white" container justifyContent="space-between">
                    Logotipo
                    <Android12Switch
                        onChange={(e) => setLogo(!logo) }
                        {...label} checked={logo} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    Nome da escola
                    <Android12Switch
                        onChange={(e) => setSchoolName(!schoolName) }
                        {...label} checked={schoolName} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    Professor
                    <Android12Switch
                        onChange={(e) => setTeacher(!teacher) }
                        {...label} checked={teacher} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    Disciplina
                    <Android12Switch
                        onChange={(e) => setSchoolSubjects(!schoolSubjects) }
                        {...label} checked={schoolSubjects} />
                </Grid>
                {/* <Grid color="white" container justifyContent="space-between">
                    Instruções
                    <Android12Switch
                    onChange={(e) => setTurm(e.target.value) } 
                    {...label} checked={    turm}/>
                </Grid> */}
                <Grid color="white" container justifyContent="space-between">
                    Nome do aluno(a)
                    <Android12Switch
                        onChange={(e) => setStudentName(!studentName) }
                        {...label} checked={studentName} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    Ano
                    <Android12Switch
                        onChange={(e) => setYaer(!yaer) }
                        {...label} checked={yaer} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    Turma
                    <Android12Switch
                        onChange={(e) => setTurm(!turm) }
                        {...label} checked={turm} />
                </Grid>
                <Grid color="white" container justifyContent="space-between">
                    data
                    <Android12Switch
                        onChange={(e) => setDate(!date) }
                        {...label} checked={date} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MenuExercicios


const styleButton = {
    p: 1,
    m: 1,
    background: " #3f3d7d ",
    width: '28%',
    backdropFilter: 'blur( 13.5px )',
    ' -webkit-backdrop-filter': 'blur( 13.5px )',
    borderRadius: 2
}


const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            '#fff'
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));