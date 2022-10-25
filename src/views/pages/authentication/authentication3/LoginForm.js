import React, { memo } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';

import { BiCheck } from "react-icons/all"

// import FacebookLogin from 'react-facebook-login';
import { RemoteServices } from "services"


const Form = ({ auth, setAuth, register, Loading }) => {


    return (
        <Grid mt={2} justifyContent="center" alignItems={"center"} container>
            <form className='form'>
                <Grid direction="column" container>
                    <input
                        value={auth.email}
                        onChange={e => setAuth({ ...auth, email: e.target.value })}
                        placeholder='email'
                        className='authForm'
                        type="email" />
                    <input
                        value={auth.password}
                        onChange={e => setAuth({ ...auth, password: e.target.value })}
                        placeholder='Senha'
                        className='authForm'
                        type="password" />
                    <Grid mt={3} container justifyContent="end">
                        <Button
                        className='authBtn'
                        onClick={register}
                            color="inherit"
                            sx={{
                                backgroundColor: `#44bea8${Loading ? '30' : ''}`,
                                color: '#fff',
                                ":hover": {
                                    ...(Loading && { cursor: 'inherit' }),
                                    backgroundColor:  `#44bea8${Loading ? '30' : ''}`,

                                }
                            }}
                            fullWidth
                            disable={Loading}
                            variant="contained"
                        >{ Loading ? <CircularProgress color="secondary" size={20}/> : 'Entrar'}</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}



export default memo(Form);