import * as React from 'react';
import {styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import BgNote from "assets/images/bg/notepade2.svg"

const CssTextField = styled(TextField)({
    width: '100%',
    border: 'solid 0px',
  '& label.Mui-focused': {
    // color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
});


export default function Notepad() {
  return (
    <Grid bgcolor="#fff" xs={12} borderRadius={5} p={3}>
            <Typography variant="h3" color="black" sx={{ mb: 2 }}>Bloco de notas</Typography>
      <CssTextField className='dotted' placeholder='Digite algo...' multiline rows={15}/>


    </Grid>
  );
}