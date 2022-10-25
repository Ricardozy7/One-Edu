import * as React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    BottomNavigation,
    BottomNavigationAction
} from "@mui/material"

import { Items } from "./items"

export default function LabelBottomNavigation() {

    const thema = useTheme()

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid
            className='mobile'
            container
            position="fixed"
            bottom={0}
            zIndex={3000}
        >
            <BottomNavigation
                showLabels={false}
                sx={{
                    width: '100%',
                    background: thema.palette.background.default + '30',
                    backdropFilter: 'blur( 13.5px )',
                    ' -webkit-backdrop-filter': 'blur( 13.5px )'
                }} value={value} onChange={handleChange}>
            {
                Items.map(e => (
                    <BottomNavigationAction
                        color='inherit'
                        key={e.id}
                        // label={e.title}
                        value={e.id}

                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        icon={<img src={e.icon} style={{ width: 30 }} />}
                    />
                ))
            }
        </BottomNavigation>
        </Grid >

    );
}