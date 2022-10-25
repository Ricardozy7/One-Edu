import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider, Grid } from '@mui/material';

import { ThemasProvider } from "contexts/themes"

import Routes from 'routes';

import themes from 'themes';

import NavigationScroll from 'layout/NavigationScroll';

import { AuthProvider } from "contexts/auth"
import { TasksProvider } from "contexts/task"
import { ActivityProvider } from "contexts/Activity"

import { ToastContainer } from "react-toastify"

import "./assets/css/Global.css"
import "./assets/css/bg.css"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const customization = useSelector((state) => state.customization);


    return (
        <AuthProvider>
            <TasksProvider>
                <ActivityProvider>
                    <ThemasProvider>
                        <StyledEngineProvider injectFirst>
                            <ThemeProvider theme={themes(customization)}>
                                <CssBaseline />
                                <NavigationScroll>
                                    <Routes />
                                    <ToastContainer newestOnTop />
                                </NavigationScroll>
                            </ThemeProvider>
                        </StyledEngineProvider>
                    </ThemasProvider>
                </ActivityProvider>
            </TasksProvider>
        </AuthProvider>
    );
};

export default App;
