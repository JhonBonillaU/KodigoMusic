import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { auth } from './Firebase/appConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import PlaylistsPage from './Components/PlayLists';
import SettingsPage from './Components/SettingsPage';
import Header from './Components/Header';
import Form from './Components/Form';

const colors = {
    primaryBg: '#121212',
    secondaryBg: '#1a1a1a',
    cardBg: '#282828',
    spotifyGreen: '#1DB954',
    textLight: '#ffffff',
    textMuted: '#b3b3b3',
    errorRed: '#ff4d4d',
    headerBg: '#000000',
    inputBg: '#333333',
    inputBorder: '#555555',
    hoverBg: '#303030',
    spotifyGreenHover: '#1ed760',
};

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: ${colors.primaryBg};
        color: ${colors.textLight};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
    }

    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: ${colors.primaryBg};
    }

    h1 {
        color: ${colors.spotifyGreen};
        font-size: 2.5em;
        margin-bottom: 15px;
    }

    p {
        color: ${colors.textMuted};
        font-size: 1.1em;
    }
`;

function App() {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    const loadingScreenStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: colors.primaryBg,
        color: colors.textLight,
        fontSize: '1.2em'
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    if (loadingAuth) {
        return (
            <ThemeProvider theme={colors}>
                <GlobalStyle />
                <div style={loadingScreenStyles}>
                    Cargando autenticación...
                </div>
            </ThemeProvider>
        );
    }

    return (
        <Router>
            <ThemeProvider theme={colors}>
                <GlobalStyle />
                {user ? (
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.primaryBg }}>
                        <Header />
                        <main style={{ flexGrow: 1, boxSizing: 'border-box' }}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/home" replace />} />
                                <Route path="/home" element={<HomePage />} />
                                <Route path="/playlists" element={<PlaylistsPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="/Form" element={<Form />} />
                                <Route path="*" element={<Navigate to="/home" />} />
                            </Routes>
                        </main>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.primaryBg }}>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    </div>
                )}
            </ThemeProvider>
        </Router>
    );
}

export default App;