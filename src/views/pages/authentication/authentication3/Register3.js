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

import { ValidateEmail, PassValidate } from "utils/validates"

import { GoogleLogin } from 'react-google-login';

import { RemoteServices } from "services"

import useAuth from "contexts/auth"

import { FaFacebook, FcGoogle } from "react-icons/all"
import LogoTipo from "assets/images/oneEducation.png"

import Wrapper from "./wrapper"
import Form from "./Registerform"

import { toast, Slide } from "react-toastify"
import ToastContent from "components/toast"

import Button from "components/button"




const Login = () => {
    const theme = useTheme();

    const { makeLogin } = useAuth()

    const [Login, setLogin] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [confirmPass, setConfirmPass] = useState("")

    const [check, setCheck] = useState(false)



    const [loading, setLoading] = useState(false)

    const responseGoogle = (response) => {
        const r = response
        const data = {
            social: {
                type: "google",
                token: r.tokenId
            }
        }
        RemoteServices.Login.Register(data)
            .then((e) => {
                if(e.error){
                    toast.error(
                        <ToastContent type={"error"} text={'Ops! algo deu errado.'} />,
                        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
                      )
                }
                e && makeLogin(e.access)
            })
    }

    const register = () => {
        if(Login.name.length === 0){
            toast.error(
                <ToastContent type={"error"} text={'O campo nome está em branco!'} />,
                { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
              )
              
              return
        }
        if(!ValidateEmail(Login.email)){
            return
        }
        if(!PassValidate(Login.password, confirmPass)){
            return
        }
        if(Login.password.length === 0){
            toast.error(
                <ToastContent type={"error"} text={'O campo senha está em branco!'} />,
                { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
              )
              return
        }
        if(!check){
            toast.error(
                <ToastContent type={"error"} text={
                'é necessário confirmar que leu nossas politicas de privacidade para continuar'
            } />,
                { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
              )
              
              return
        }
        const dataLogin = {
            name: Login.name,
            email: Login.email,
            password: Login.password,
        }
        setLoading(true)
        RemoteServices.Login.Register(dataLogin)
            .then((e) => {
                if(e.error){
                    toast.error(
                        <ToastContent text={e.error} 
                        role={'contate o suporte caso o problema persista!'} />,
                        { icon: false, transition: Slide, hideProgressBar: false, autoClose: 4000 }
                      )
                }
                e && makeLogin(e.access)
            })
            .finally(() => setLoading(false))
    }


    return (
        <AuthWrapper1>
            <Wrapper />
            <Grid
                height={"100vh"}
                container
                justifyContent={"center"}
                alignContent="center"
                direction={"column"}
            >
                <Grid mb={3} justifyContent="center" alignItems={"center"} container>
                    <img src={LogoTipo} style={{
                        opacity: 1
                    }} />
                </Grid>

                <Typography textAlign={"center"} variant='h1' color="#fff">Organize seu<br />
                    trabalho, controle<br />
                    sua vida
                </Typography>
                <Grid

                    conteiner textAlign={"center"} mt={2}>

                    <GoogleLogin
                        clientId="991878789804-fv60l410um4qlctpmdnqjsjf0oh6s1rq.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        render={renderProps => (
                            <Button
                                color="inherit"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                bg={'#fff'}
                                variant='contained'><FcGoogle />{'ㅤ'}Cadastre-se com o google</Button>
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
                <Form Loading={loading} 
                register={register} 
                confi={confirmPass} 
                setConfirmPass={setConfirmPass} 
                check={check} 
                setCheck={setCheck}
                auth={Login} 
                setAuth={e => setLogin(e)} />

            </Grid>
            {/* <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>


                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid> */}
        </AuthWrapper1>
    );
};

export default Login;
