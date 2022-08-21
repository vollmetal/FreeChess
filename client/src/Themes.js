import { createTheme } from "@mui/material";



const mainTheme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1464d8',
            light: '#42a5f5',
            dark: '#1976d2',
        },
        secondary: {
            main: '#0d47a1',
            light: '#1e88e5',
            dark: '#0d47a1',
        },
        background: {
            default: '#e8eaf6',
            paper: '#8dccff',
        },
        warning: {
            main: '#ff7700',
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4527a0',
        },
        secondary: {
            main: '#d32f2f',
        },
        warning: {
            main: '#4e342e',
        },
    },
})


export const themeMap = { 'Basic': mainTheme, 'darkTheme': darkTheme }