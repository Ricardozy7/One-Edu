import * as React from 'react';
import { styled } from '@mui/material/styles';
import { MenuItem, Select, InputBase, IconButton, Grid, FormControl, InputLabel } from '@mui/material';

import { FiX } from "react-icons/all"

import IconSelect from "@mui/icons-material/KeyboardArrowDown"
export default function CustomizedSelect({
    value,
    items,
    onChange,
    defaultValue,
    selectItemStyles,
    selectStyles
}) {
    return (
        <Select
            IconComponent={() => <IconSelect sx={{ color: '#fff' }} />}
            MenuProps={{
                PaperProps: {
                    style: {
                        backgroundColor: 'rgba(38, 47, 105, 0.95)'
                    },
                },
                color: '#fff'
            }}
            {...(!value || defaultValue && {
                defaultValue: defaultValue ? defaultValue : 0
            })}
            style={selectStyles ? selectStyles : {}}
            value={value}
            onChange={onChange}
            input={<OneInput />}
            SelectDisplayProps={e => <div>teste</div>}
            label="testre"
        >
            {
                items.map((e, i) => (
                        <SelectItem 
                        sx={selectItemStyles ? selectItemStyles : {}}
                        key={`${e?.title}-${i}`} value={e?.value}>{e?.title}</SelectItem>
                ))
            }
        </Select>
    );
}

const SelectItem = styled(MenuItem)(({ theme }) => ({
    color: 'white',
    fontFamily: 'Poppins, sans serif',
    fontSize: '12px',
    fontWeight: '700',
    background: 'transparent',
    ':hover': {
        color: '#00F0FF'
    },
})
)


const OneInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 2,
        position: 'relative',
        backgroundColor: "transparent",
        fontSize: 12,
        // width: 125,
        color: '#fff',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            'Poppins',
            'BlinkMacSystemFont',
            'Roboto',
            'sans-serif',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
        },
        '& .MuiSelect-icon': {
            color: '#fff'
        }
    },
}));