import React, { useState } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';

import { BiCheck } from "react-icons/all"

// import FacebookLogin from 'react-facebook-login';
import { RemoteServices } from "services"


const Form = ({ auth, setAuth, register, confi, setConfirmPass, Loading, check, setCheck }) => {




    return (
        <Grid mt={2} justifyContent="center" alignItems={"center"} container>
            <form className='form'>
                <Grid direction="column" justifyContent={"center"} alignItems="center" container>
                    <input
                        value={auth.name}
                        onChange={e => setAuth({ ...auth, name: e.target.value })}
                        placeholder='Name'
                        className='authForm'
                        type="email" />
                    <input
                        value={auth.email}
                        onChange={e => setAuth({ ...auth, email: e.target.value })}
                        placeholder='Email'
                        className='authForm'
                        type="email" />
                    <input
                        value={auth.password}
                        onChange={e => setAuth({ ...auth, password: e.target.value })}
                        placeholder='Senha'
                        className='authForm'
                        type="password" />
                    <input 
                    value={confi}
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder='Confirmar senha' className='authForm' type="password" />

                    {/* <FacebookLogin
                        appId="703938294113726"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                    /> */}
                    <Grid
                        mt={2}
                        style={{ color: '#fff' }}
                        container
                        justifyContent={"center"}
                        alignItems={'center'}>
                        <div
                            onClick={() => setCheck(!check)}
                            className='formCheckBox'>
                            {check && <BiCheck color="#44bea8" />}

                        </div>
                        <Typography color="white" variant="h6">
                            Confirmo que li e aceito os <a>Termos de Uso e a lei de Privacidade</a>
                        </Typography>
                    </Grid>
                    <Grid mt={3} container justifyContent={"end"}>
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
                            variant="contained"
                        >{ Loading ? <CircularProgress color="secondary" size={20}/> : 'Cadastre-se'}</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}



export default Form;