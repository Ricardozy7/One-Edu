import React, { createContext, useContext, useEffect, useState } from "react";


export const TasksManager = createContext({});
const useTasks = () => useContext(TasksManager);

export const TasksProvider = ({ children }) => {

    const [TaskSelected, setTaskSelected] = useState(null)
    const [TaskFonts, setTaskFonts] = useState('Poppins, Roboto,sans-serif')

    useEffect(() => {
        const GetItm = JSON.parse(localStorage.getItem("@projects-tasks"))
        if(GetItm){
            setTaskSelected(GetItm[0])
        }
    },[])


    let Tasks = JSON.parse(localStorage.getItem("@projects-tasks"))

    if(Tasks){
        Tasks = Tasks.filter(item => item?.id !== TaskSelected?.id)
    }

    return (
        <TasksManager.Provider value={{
            TaskSelected, 
            setTaskSelected,
            TaskFonts, 
            setTaskFonts,
            Tasks
        }}>
            {children}
        </TasksManager.Provider>
    )
}

export default useTasks;