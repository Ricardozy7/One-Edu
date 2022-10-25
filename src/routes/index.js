import { useRoutes } from 'react-router-dom';
import { lazy } from 'react';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';

import useAuth from "contexts/auth"

import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom'
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

const ExercicioPage = Loadable(lazy(() => import('views/pages/exercicios')));
const ExercicioPageMobile = Loadable(lazy(() => import('views/pages/mobile/exercicios')));
const ExercicioPageMobileCabecalho = Loadable(lazy(() => import('views/pages/mobile/exercicios/cabecalho/index')));


export default function ThemeRoutes() {

    const { user } = useAuth()

    return useRoutes(user ? CloseRoutes : [AuthenticationRoutes]);
}


const CloseRoutes = [
    {
        path: '/',
        element: <MainLayout/>,
        children: MainRoutes.children
    }, {
        path: '/t/',
        element: <MinimalLayout/>,
        children:[
            {
                path: '/novo-exercicio',
                element: <ExercicioPage />
            },
            {
                path: '/novo-exercicio-mobile',
                element: <ExercicioPageMobile />
            },
            {
                path: '/exercicio-cabecalho',
                element: <ExercicioPageMobileCabecalho />
            }
        ]
    }
]