import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';


import {
  Grid,
  IconButton,
  Typography,
  Button
} from "@mui/material"
import { styled } from '@mui/material/styles';
import FileText from "assets/images/icons/fileText.svg"
import FileEye from "assets/images/icons/fileEye.svg"
import Ordain from "assets/images/icons/ordain.svg"

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';

import { FiFileText, FaEyeSlash, FiSettings, FiUpload } from "react-icons/all"

export default function LabelBottomNavigation() {
  const [value, setValue] = useState('editar');



  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0
      }}
      elevation={3}>
      <Grid xs={12} bgcolor="#28256E">
        <Grid container justifyContent="space-between">
          <BtnIcon onClick={() => setValue("editar")}>
            <img src={FileText} width={17}
              style={value === "editar" ? filterStyle : {}}
            />
            <Text sx={{ mt: 1,color: value === 'editar' ? '#19E5E5' : '#fff' }}>Editar</Text>
          </BtnIcon >
          <BtnIcon onClick={() => setValue("visualizar")}>
            <img
              style={value === "visualizar" ? filterStyle : {}}
              src={FileEye} width={17} />
            <Text sx={{ mt: 1,color: value === 'visualizar' ? '#19E5E5' : '#fff' }}>Visualizar</Text>
          </BtnIcon >
          <BtnIcon onClick={() => setValue("ordernar")}>
            <img
              style={value === "ordernar" ? filterStyle : {}}
              src={Ordain} width={22} />
            <Text sx={{ mt: 1.5,color: value === 'ordernar' ? '#19E5E5' : '#fff' }}>Ordernar</Text>
          </BtnIcon >
          <BtnIcon onClick={() => setValue("exportar")}>
            <FiUpload
              size={20} color={value === 'exportar' ? '#19E5E5' : '#fff'} />
            <Text sx={{ mt: 1,color: value === 'exportar' ? '#19E5E5' : '#fff' }}>Exportar</Text>
          </BtnIcon >
          <BtnIcon onClick={() => setValue("settings")}>
            <FiSettings size={20} color={value === 'settings' ? '#19E5E5' : '#fff'} />
            <Text sx={{ mt: 1,color: value === 'settings' ? '#19E5E5' : '#fff' }}>Ajustes</Text>
          </BtnIcon >
        </Grid>
      </Grid>
    </Paper>
  );
}

const Text = styled(Typography)(({ theme }) => ({
  mt: 1
})
)

const BtnIcon = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
})
)

const filterStyle = {
  filter: 'invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(150%) contrast(80%)'

}