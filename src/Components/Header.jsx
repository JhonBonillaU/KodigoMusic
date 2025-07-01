import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AppHeader = styled.header`
    background-color: ${props => props.theme.headerBg};
    color: ${props => props.theme.spotifyGreen};
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    position: sticky;
    top: 0;
    z-index: 1000;
    min-height: 60px;

    @media (max-width: 768px) {
        padding: 10px 15px;
    }
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    .logo {
        color: ${props => props.theme.textLight};
        font-weight: bold;
        font-size: 1.5em;
        text-decoration: none;
        @media (max-width: 480px) {
            font-size: 1.3em;
        }
    }

    nav {
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 15px;

            li a {
                color: ${props => props.theme.textMuted};
                text-decoration: none;
                font-size: 0.95em;
                transition: color 0.3s ease;

                &:hover {
                    color: ${props => props.theme.textLight};
                }
            }

            @media (max-width: 768px) {
                display: none;
            }
        }
    }
`;

const MobileMenuIcon = styled.div`
    display: none;
    font-size: 1.8em;
    color: ${props => props.theme.textLight};
    cursor: pointer;
    z-index: 1001;

    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileNavOverlay = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.headerBg};
    z-index: 999;
    padding-top: 80px;
    transition: transform 0.3s ease-in-out;
    transform: ${props => (props.$isOpen ? 'translateX(0)' : 'translateX(-100%)')};

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;

        li a {
            color: ${props => props.theme.textLight};
            text-decoration: none;
            font-size: 1.5em;
            font-weight: bold;
            &:hover {
                color: ${props => props.theme.spotifyGreen};
            }
        }
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 480px) {
        gap: 10px;
    }
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        // Puedes cambiar esto a 'none' si quieres ocultar la barra de búsqueda en móvil
        display: flex;
    }
`;

const SearchInput = styled.input`
    padding: 8px 12px 8px 35px;
    border: none;
    border-radius: 50px;
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.spotifyGreen};
    font-size: 0.95em;
    outline: none;
    width: 180px;
    transition: width 0.3s ease;

    &::placeholder {
        color: ${props => props.theme.textMuted};
    }

    &:focus {
        width: 220px;
    }

    @media (max-width: 768px) {
        width: 140px;
        &:focus {
            width: 180px;
        }
    }

    @media (max-width: 480px) {
        width: 100px;
        padding: 8px 10px 8px 30px;
        font-size: 0.85em;
        &:focus {
            width: 130px;
        }
    }
`;

const SearchIcon = styled.span`
    position: absolute;
    left: 12px;
    color: ${props => props.theme.textMuted};
    font-size: 1.1em;
    &::before {
        content: '🔍';
    }

    @media (max-width: 480px) {
        left: 10px;
        font-size: 1em;
    }
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.theme.textLight};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: ${props => props.theme.headerBg};
    cursor: pointer;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 480px) {
        width: 35px;
        height: 35px;
        font-size: 0.9em;
    }
`;

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <AppHeader>
            <LeftSection>
                <h1 className="logo">KodigoMusic</h1>
                <nav>
                    <ul>
                        <li><Link to="/home">Inicio</Link></li>
                        <li><Link to="/playlists">Mis Playlists</Link></li>
                        <li><Link to="/settings">Configuración</Link></li>
                        <li><Link to="/Form">Registro</Link></li>
                    </ul>
                </nav>
            </LeftSection>

            <RightSection>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput type="text" placeholder="Search" />
                </SearchContainer>
                <UserAvatar>
                    <span>👤</span>
                </UserAvatar>
                <MobileMenuIcon onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? '✕' : '☰'}
                </MobileMenuIcon>
            </RightSection>

            <MobileNavOverlay $isOpen={isMobileMenuOpen}>
                <ul>
                    <li><Link to="/home" onClick={toggleMobileMenu}>Inicio</Link></li>
                    <li><Link to="/playlists" onClick={toggleMobileMenu}>Mis Playlists</Link></li>
                    <li><Link to="/settings" onClick={toggleMobileMenu}>Configuración</Link></li>
                    <li><Link to="/Form" onClick={toggleMobileMenu}>Registro</Link></li>
                </ul>
            </MobileNavOverlay>
        </AppHeader>
    );
}

export default Header;