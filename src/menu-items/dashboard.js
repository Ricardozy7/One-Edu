// assets
import { IconDashboard } from '@tabler/icons';

import { BiBook } from "react-icons/all"

// constant
const icons = { IconDashboard };

import Agenda from "assets/images/icons/agenda.svg"
import graduation from "assets/images/icons/graduation.svg"
import exercicios from "assets/images/icons/exercícios.svg"
import material from "assets/images/icons/material-de-apoio.svg"
import lembretes from "assets/images/icons/lembretes-programados.svg"
import lixeira from "assets/images/icons/lixeira.svg"






const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Agenda',
            type: 'item',
            url: '/Agenda',
            icon: Agenda,
            breadcrumbs: false
        },
        {
            id: 'turmas',
            title: 'Minhas turmas',
            type: 'item',
            url: '/Turmas',
            icon: graduation,
            breadcrumbs: false
        },
        {
            id: 'lista-exercicios',
            title: 'Lista de exercicios',
            type: 'item',
            url: '/Lista-exercicios',
            icon: exercicios,
            breadcrumbs: false
        },
        {
            id: 'Materiais',
            title: 'Materiais de apoio',
            type: 'item',
            url: '/Materiais',
            icon: material,
            breadcrumbs: false
        },
        {
            id: 'Lembretes',
            title: 'Lembretes programados',
            type: 'item',
            url: '/Lembretes',
            icon: lembretes,
            breadcrumbs: false
        },
        {
            id: 'Lixeira',
            title: 'Lixeira',
            type: 'item',
            url: '/Lixeira',
            icon: lixeira,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
