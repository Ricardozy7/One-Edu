import { lazy } from 'react';

import { Navigate } from "react-router"


// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ExercicioPage = Loadable(lazy(() => import('views/pages/exercicios')));


const MainRoutes = {
    // path: '/',
    // element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/login',
            element: <Navigate to={'/Agenda'}/>
        },
        {
            path: '/register',
            element: <Navigate to={'/Agenda'}/>
        },
        {
            path: '/Agenda',
            element: <DashboardDefault />
        },
        {
            path: '/Turmas',
            element: <DashboardDefault />
        },
        {
            path: '/Lista-exercicios',
            element: <DashboardDefault />
        },
        {
            path: '/Materiais',
            element: <DashboardDefault />
        },
        {
            path: '/Lembretes',
            element: <DashboardDefault />
        },
        {
            path: '/Lixeira',
            element: <DashboardDefault />
        },
        // {
        //     path: '/novo-exercicio',
        //     element: <ExercicioPage />
        // }
    ]
};

export default MainRoutes;
