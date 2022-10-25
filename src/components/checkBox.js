import * as React from 'react';
import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
export default function OneCheckBox() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <CustomCheckbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}


const checkBoxStyles = theme => ({
    root: {
      '&$checked': {
        color: '#15133F',
      },
    },
    checked: {},
   })

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);