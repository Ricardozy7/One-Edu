import React from "react"

import { toast } from 'react-toastify';
import { RemoteServices } from "services";


export const saveActivite = ({key, value, reload, ListActivitySelected}) => {
    const id = toast.loading("Salvando...", {
        position: "bottom-center",
    })
     RemoteServices.Teachers.UpdateActivityList({
        idActivity: ListActivitySelected.id,
        data: {
            [key]: value
        }
    })
    .then((response) => {
        if(response.success){
            toast.update(id, 
                { 
                    render: "Salvo com sucsso!", 
                    type: "success", 
                    isLoading: false,
                    position: "bottom-center",
                    autoClose: 2000,
                    bodyClassName: 'toastBody'
                });
                reload && reload()
                return { response: response }
        }else{
            toast.update(id, 
                { 
                    render: "Erro ao salvar alterações!", 
                    type: "error", 
                    isLoading: false,
                    position: "bottom-center",
                    autoClose: 2000

                });
                return { error: true }
        }
    })
}