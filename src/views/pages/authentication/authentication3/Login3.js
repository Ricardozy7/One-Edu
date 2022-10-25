import React, { useEffect, useState, memo } from "react"

import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Typography,
    useMediaQuery,
    TextField,
    ButtonMaterial,
} from '@mui/material';

import AuthWrapper1 from '../AuthWrapper1';

import { ValidateEmail } from "utils/validates"

import { GoogleLogin } from 'react-google-login';

import { RemoteServices } from "services"

import useAuth from "contexts/auth"

import { FaFacebook, FcGoogle } from "react-icons/all"
import LogoTipo from "assets/images/oneEducation.png"

import Wrapper from "./wrapper"
import Form from "./LoginForm"

import { toast, Slide } from "react-toastify"
import ToastContent from "components/toast"

import Button from "components/button"


const Login = () => {
    const theme = useTheme();

    const { makeLogin } = useAuth()

    const [loading, setLoading] = useState(false)

    const [Login, setLogin] = useState({
        name: "",
        email: "",
        password: ""
    })


    const responseGoogle = (response) => {
        setLoading(true)
        const r = response
        const data = {
            // username: r.Ju.tf,
            social: {
                type: "google",
                token: r.tokenId
            }
        }
        RemoteServices.Login.login(data)
            .then((e) => {
                if(e.error){
                    return
                }
                e && makeLogin('e.access_token')
            })
            .finally(() => setLoading(false))
    }

    const LoginAuth = () => {
        if(!ValidateEmail(Login.email)){
            return
        }
        if(Login.password.length === 0){
            toast.error(
                <ToastContent type={"error"} text={'O campo senha está em branco!'} />,
                { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
              )
              return
        }
        const data = {
            email: Login.email,
            password: Login.password,
        }
        setLoading(true)
        RemoteServices.Login.login(data)
            .then((e) => {
                if(e.error || !e?.access){
                    toast.error(
                        <ToastContent text={e.error === "Credenciais incorretas" ? 
                        'credenciais de login incorretas' : 
                        `Occoreu um erro inesperado!`
                    } 
                        role={'contate o suporte caso o problema persista!'} />,
                        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
                      )
                      return
                }
                e?.access && makeLogin(e?.access)
            })
            .catch((e) => {
                toast.error(
                    <ToastContent text={`Occoreu um erro inesperado!`} 
                    role={'contate o suporte caso o problema persista!'} />,
                    { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
                  )
            })
            .finally(() => setLoading(false))
    }


    return (
        <AuthWrapper1>
            <Wrapper />
            <Grid
                height={"100vh"}
                container
                zIndex={2000}
                justifyContent={"center"}
                alignContent="center"
                direction={"column"}
            >
                <Grid  sx={{ zIndex: 5000 }}mb={3} justifyContent="center" alignItems={"center"} container>
                    <img src={LogoTipo} style={{
                        opacity: 1
                    }} />
                </Grid>

                <Typography sx={{ zIndex: 5000 }} textAlign={"center"} variant='h1' color="#fff">Organize seu<br />
                    trabalho, controle<br />
                    sua vida
                </Typography>

                <Grid

                    conteiner textAlign={"center"} mt={2}>

                    <GoogleLogin
                        clientId="991878789804-fv60l410um4qlctpmdnqjsjf0oh6s1rq.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={() => {
                            toast.error(
                                <ToastContent text={e.error === 'Incorrect username or password' ? 
                                'credenciais de login incorretas' : 
                                `Occoreu um erro inesperado!`
                            } 
                                role={'contate o suporte caso o problema persista!'} />,
                                { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
                              )
                        }}
                        render={renderProps => (
                            <Button
                                color="inherit"
                                onClick={renderProps.onClick}
                                disabled={loading}
                                bg={'#fff'}
                                variant='contained'><FcGoogle />{'ㅤ'}Entrar com o google</Button>
                        )
                        }
                        cookiePolicy={'single_host_origin'}
                    />
                </Grid>
                <Grid mt={5} justifyContent="center" alignItems={"center"} container direction={"row"}>
                    <div
                        style={{
                            width: 125,
                            height: 1,
                            backgroundColor: '#fff',
                            marginRight: 15
                        }}
                    />
                    <Typography color="white">Ou</Typography>
                    <div
                        style={{
                            width: 125,
                            height: 1,
                            backgroundColor: '#fff',
                            marginLeft: 15
                        }}
                    />
                </Grid>
                <Form register={LoginAuth} Loading={loading} auth={Login} setAuth={e => setLogin(e)} />

            </Grid>
        </AuthWrapper1>
    );
};

export default memo(Login);
