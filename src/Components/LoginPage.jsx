import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../Firebase/appConfig'; 
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px); 
    background-color: ${props => props.theme.primaryBg};
    padding: 20px;
    box-sizing: border-box;
`;

const AuthBox = styled.div`
    background-color: ${props => props.theme.cardBg};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-sizing: border-box;
`;

const AuthTitle = styled.h2`
    color: ${props => props.theme.spotifyGreen};
    margin-bottom: 25px;
    font-size: 2em;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.textMuted};
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 5px;
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.textLight};
    font-size: 1em;
    box-sizing: border-box;
    &:focus {
        outline: none;
        border-color: ${props => props.theme.spotifyGreen};
        box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3);
    }
`;

const AuthButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: ${props => props.theme.spotifyGreen};
    color: ${props => props.theme.textLight};
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 15px;

    &:hover {
        background-color: ${props => props.theme.spotifyGreenHover};
        transform: translateY(-1px);
    }
    &:disabled {
        background-color: ${props => props.theme.textMuted};
        cursor: not-allowed;
    }
`;

const ToggleModeText = styled.p`
    margin-top: 20px;
    color: ${props => props.theme.textMuted};
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.spotifyGreen};
    }
`;

const ErrorMessage = styled.p`
    color: ${props => props.theme.errorRed};
    margin-top: 15px;
    font-size: 0.9em;
`;

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('¡Registro exitoso! Ya puedes iniciar sesión.');
                setIsRegistering(false); 
            } else {
                await signInWithEmailAndPassword(auth, email, password);

            }

        } catch (err) {
            console.error('Error de autenticación:', err.message);
            if (err.code === 'auth/email-already-in-use') {
                setError('El correo electrónico ya está registrado.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Formato de correo electrónico no válido.');
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            } else {
                setError('Error al autenticarse. Intenta de nuevo.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthBox>
                <AuthTitle>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</AuthTitle>
                <form onSubmit={handleAuth}>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="tu@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Contraseña:</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <AuthButton type="submit" disabled={loading}>
                        {loading ? 'Cargando...' : (isRegistering ? 'Registrarme' : 'Entrar')}
                    </AuthButton>
                </form>
                <ToggleModeText onClick={() => setIsRegistering(prev => !prev)}>
                    {isRegistering ? '¿Ya tienes cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate aquí'}
                </ToggleModeText>
            </AuthBox>
        </AuthContainer>
    );
}

export default Login;