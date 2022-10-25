import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography } from '@mui/material';

import twobars from "assets/images/icons/two-bars.svg"

import { FiChevronsRight, FiChevronsLeft, FiCornerDownRight } from "react-icons/all"
import useActivity from "contexts/Activity";


const drawerWidth = 230;


export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { Question, setQuestion, ListActivity, setListActivity, cabecalho, } = useActivity()

  return (
    <>
      <Grid sx={{ width: 50 }} />
      <Box
        sx={{
          display: 'flex', marginTop: '75px', position: 'fixed', height: 'calc(100vh - 100px)', padding: 1, zIndex: 10
        }}
      >
        <Grid className="task-drawer" style={{
          width: open ? 240 : 55,
          marginRight: 10
        }}>
          <Grid container display="flex" justifyContent="flex-end">
            {
              open ?
                <Grid p={2} xs={12} container alignItems="center" justifyContent="space-between">
                  <Typography sx={{
                    fontSize: 18,
                    fontWeight: 600
                  }}>Ordenar</Typography>
                   <IconButton onClick={() => setOpen(!open)}>
                    <FiChevronsLeft color='white' />
                   </IconButton>
                </Grid> :
                <IconButton onClick={() => setOpen(!open)}>
                  <FiChevronsRight color='white' />
                </IconButton>
            }


          </Grid>
          <IconButton>
            {open ? <> </> :
                <FiCornerDownRight color='white' />
            }
            {
              open &&
              Question.map((e, i) => {
                return (
                  <Grid container gap={2} alignItems={"center"}>
                    <img src={twobars} width={11} />
                    <Typography sx={{
                      fontSize: 18,
                      fontWeight: 400
                    }}>{i + 1} Questão {i + 1}...</Typography>
                  </Grid>
                )
              })
            }
          </IconButton>
        </Grid>
      </Box>
    </>
  );
}
