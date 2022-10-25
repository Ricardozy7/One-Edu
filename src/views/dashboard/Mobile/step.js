import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function TabsWrappedLabel() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid width="100%"container justifyContent={"start"} alignItems="start">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        indicatorColor='transparent'
        textColor='inherit'
      >
        <Tab value="recentes" sx={{ color: '#fff' }}  label="Recentes" />
        <Tab value="lembretes" sx={{ color: '#fff' }} label="Lembretes" />
      </Tabs>
    </Grid>
  );
}