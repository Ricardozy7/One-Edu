import colors from 'assets/scss/_themes-vars.module.scss';

export const palettes = () => {

    const primary = {
            light: colors?.primaryLight,
            main: colors?.primaryMain,
            dark: colors?.primaryDark,
            200: colors?.primary200,
            800: colors?.primary800
    }

   const secondary = {
        light: colors?.secondaryLight,
        main: colors?.secondaryMain,
        dark: colors?.secondaryDark,
        200: colors?.secondary200,
        800: colors?.secondary800
    }
    const third = {
        light: colors?.thirdLight,
        main: colors?.thirdMain,
        dark: colors?.thirdDark,
        200: colors?.third200,
        800: colors?.third800
    }

    const fourth = {
        light: colors?.fourthLight,
        main: colors?.fourthMain,
        dark: colors?.fourthDark,
        200: colors?.fourth200,
        800: colors?.fourth800
    }

    return { primary, secondary, third, fourth }
}