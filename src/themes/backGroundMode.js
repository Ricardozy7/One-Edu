import React, { useEffect } from "react"

import colors from 'assets/scss/_themes-vars.module.scss';

export const ColorBackground = () => {

    const themas = localStorage.getItem("@oneBackground")

    const Ligth = {
        paper: colors.paper,
        default: colors.backgroundDefault
    }
    const Dark = {
        paper: colors.darkPaper,
        default: colors.darkBackground,
        bg800:  colors?.darkBackground800
    }

    return  Dark
}