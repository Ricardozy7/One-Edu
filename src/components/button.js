import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const OneButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    width: 300,
    fontSize: 16,
    padding: '6px 12px',
    lineHeight: 1.5,
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
    }
});

export default function CustomizedButtons({
    children,
    color, 
    onClick,
    disabled,
    variant = 'contained',
    style
 }) {
    return (

        <OneButton 
        style={style && style}
        disabled={disabled && disabled}  
        color={color && color} 
        variant={variant}
        onClick={onClick && onClick}
        disableRipple
        >
            {children}
        </OneButton>
    );
}