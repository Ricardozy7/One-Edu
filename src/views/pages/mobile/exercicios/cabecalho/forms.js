import React, { useEffect, useState, memo, useRef } from "react"

import {
    Grid,
    Typography,
    TextField,
    InputAdornment,
    FormLabel,
    IconButton
} from "@mui/material"

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import add_photo_alternate from "assets/images/icons/add_photo_alternate.svg"

const FormsCabecalhoMobile = ({
}) => {

    const [values, setValues] = React.useState({
        Escola: '',
        Aluno: '',
        Data: '',
        Turma: '',
        Ano: '',
        Disciplina: '',
        Professor: '',
        Instrucoes: '',
        Frase: ''
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    

    return (
        <Grid gap={3} container>
            <InputTextOne label="Nome da Escola" value={values.Escola} placeHolder="Escola..."  onChange={handleChange('Escola')}/>
            <InputTextOne label="Nome do aluno (a)" value={values.Aluno} placeHolder="Aluno (a)..." onChange={handleChange('Aluno')}/>
            <InputTextOne label="Data" placeHolder="Data..." value={values.Data} onChange={handleChange('Data')}/>
            <InputTextOne label="Disciplina" value={values.Disciplina} onChange={handleChange('Disciplina')}/>
            <InputTextOne label="Turma" value={values.Turma} onChange={handleChange('Turma')}/>
            <InputTextOne label="Ano" value={values.Ano} onChange={handleChange('Ano')}/>
            <InputTextOne label="Professor (a)... " value={values.Professor} onChange={handleChange('Professor')}/>
            <InputTextOne label="Instruções" value={values.Instrucoes} onChange={handleChange('Instrucoes')}/>
            <InputTextOne label="Frase" value={values.Frase} placeHolder="Ex.: Boa prova!..." onChange={handleChange('Frase')}/>
        </Grid>

    )
}

export default memo(FormsCabecalhoMobile)


const InputTextOne = ({
    label,
    value,
    onChange,
    placeHolder
}) => {
    return (
        <>
        <FormLabel sx={{
            color: 'white'
        }}>{label}:</FormLabel>
        <TextField
            // label={label}
            value={value}
            onChange={onChange}
            endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <Visibility />
                  </IconButton>
                </InputAdornment>
              }
            placeholder={placeHolder ? placeHolder : label + '...'}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                borderRadius: '5px',
                width: 'calc(100% - 24px)',
                mt: -2.5,
                justifyContent: 'center',
                display: 'flex',
                '::placeholder':{
                    color: 'red',
                    opacity: 1
                }
            }}
            className="dark"
            id="filled-basic" variant="filled" />
    </>

    )
}