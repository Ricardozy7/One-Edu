// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://oneci.com.br/" target="_blank" underline="hover">
            
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://oneci.com.br/" target="_blank" underline="hover">
            &copy; Copyright © One Ci 2022, Inc. All rights reserved.
        </Typography>
    </Stack>
);

export default AuthFooter;
