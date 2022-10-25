import Agenda from "assets/images/icons/agenda.svg"
import graduation from "assets/images/icons/graduation.svg"
import exercicios from "assets/images/icons/exercícios.svg"
import material from "assets/images/icons/material-de-apoio.svg"
import lembretes from "assets/images/icons/lembretes-programados.svg"
import lixeira from "assets/images/icons/lixeira.svg"

export const Items = [{
    id: 'default',
    title: 'Agenda',
    url: '/Agenda',
    icon: Agenda,
    breadcrumbs: false
},

{
    id: 'Lembretes',
    title: 'Lembretes programados',
    url: '/Lembretes',
    icon: lembretes,
    breadcrumbs: false
},
{
    id: 'turmas',
    title: 'Minhas turmas',
    url: '/Turmas',
    icon: graduation,
    breadcrumbs: false
},
{
    id: 'Materiais',
    title: 'Materiais de apoio',
    url: '/Materiais',
    icon: material,
    breadcrumbs: false
},
{
    id: 'lista-exercicios',
    title: 'Lista de exercicios',
    url: '/Lista-exercicios',
    icon: exercicios,
    breadcrumbs: false
},
]