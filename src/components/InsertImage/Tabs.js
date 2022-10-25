import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImgsSaves from './imgsSaves';
import UrlImage from './urlImage';
import PostingImg from './postingImg';




function TabPanel(props) {
  const { children, value, index,...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
    AddImgQuestion,
    AddImgQuestionLink,
    setOpen,
    questionId 
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="IMAGENS SALVAS" {...a11yProps(0)} />
          <Tab label="URL DA IMAGEN" {...a11yProps(1)} />
          <Tab label="REALIZAR UPLOAD" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ImgsSaves />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UrlImage AddImgQuestionLink={AddImgQuestionLink} setOpen={setOpen} questionId={questionId}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <PostingImg AddImgQuestion={AddImgQuestion} setOpen={setOpen}/>
      </TabPanel>
    </Box>
  );
}