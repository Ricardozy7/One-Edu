import React, { createContext, useContext, useEffect, useState } from "react";
import { palettes } from "./colors"


export const ThemasManager = createContext({});
const useThemas = () => useContext(ThemasManager);

export const ThemasProvider = ({ children }) => {

    const [themas, setThemas] = useState(null)
    const [background, setBackground] = useState(null)

    useEffect(() => {
       const color = localStorage.getItem("@oneColors")
       const ColorBackground = localStorage.getItem("@oneBackground")

        setThemas(color)
        setBackground(ColorBackground)
    },[themas, background])

    return (
        <ThemasManager.Provider value={{
            themas, 
            setThemas,
            background, 
            setBackground
        }}>
            {children}
        </ThemasManager.Provider>
    )
}

export default useThemas;