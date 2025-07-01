import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  background-color: ${props => props.theme.primaryBg};
  color: ${props => props.theme.textLight}; 
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: ${props => props.theme.headerBg};
  padding: 20px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-right: 1px solid ${props => props.theme.secondaryBg};

  @media (max-width: 768px) {
    width: 80px;
    padding: 10px;
    align-items: center;
    span { 
        display: none;
    }
    a {
        justify-content: center;
    }
  }
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  border-radius: 8px;
  text-decoration: none;
  color: ${props => (props.$active ? props.theme.textLight : props.theme.textMuted)}; 
  background-color: ${props => (props.$active ? props.theme.cardBg : 'transparent')};
  font-weight: ${props => (props.$active ? 'bold' : 'normal')};
  transition: background-color 0.2s ease, color 0.2s ease;

  span {
    font-size: 1.1em;
  }
  
  @media (max-width: 768px) {
    padding: 10px;
    span {
    
        display: none; 
    }

    & > *:not(span) { 
        margin-right: 0 !important;
    }
    justify-content: center; 
  }
`;

const SidebarIcon = styled.span`
  font-size: 1.5em;
  color: ${props => (props.$active ? props.theme.spotifyGreen : props.theme.textMuted)}; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 40px;
  overflow-y: auto;

  h1 {
    color: ${props => props.theme.textLight}; 
    font-size: 2.5em;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    h1 {
        font-size: 2em;
        margin-bottom: 30px;
    }
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 50px;

  h2 {
    color: ${props => props.theme.spotifyGreen}; 
    font-size: 1.5em;
    margin-bottom: 25px;
    border-bottom: 1px solid ${props => props.theme.secondaryBg};
    padding-bottom: 10px;
  }
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.secondaryBg};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.hoverBg};
  }
`;

const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  .icon {
    font-size: 1.3em;
    color: ${props => props.theme.spotifyGreen}; 
  }

  .label {
    font-size: 1em;
    color: ${props => props.theme.textLight}; 
  }
`;

const SettingRight = styled.div`
  font-size: 0.95em;
  color: ${props => props.theme.textMuted}; 
`;

function SettingsPage() {
  const location = useLocation();

  return (
    <PageContainer>
      <Sidebar>
        <SidebarLink to="/" $active={location.pathname === '/'}>
          <SidebarIcon $active={location.pathname === '/'}>🏠</SidebarIcon> <span>Inicio</span>
        </SidebarLink>
        
        <div style={{ flexGrow: 1 }}></div> 

        <SidebarLink to="/install-app" $active={location.pathname === '/install-app'}>
          <SidebarIcon $active={location.pathname === '/install-app'}>⬇️</SidebarIcon> <span>Instalar aplicación</span>
        </SidebarLink>
      </Sidebar>

      <MainContent>
        <h1>Configuración</h1>

        <SettingsSection>
          <h2>Cuenta</h2>
          <SettingItem>
            <SettingLeft>
              <span className="icon">👤</span> <span className="label">Usuario</span>
            </SettingLeft>
            <SettingRight>usuario123</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">✉️</span> <span className="label">Correo electrónico</span>
            </SettingLeft>
            <SettingRight>usuario123@email.com</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🔒</span> <span className="label">Contraseña</span>
            </SettingLeft>
            <SettingRight>Contraseña</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🌐</span> <span className="label">Idioma</span>
            </SettingLeft>
            <SettingRight>Español</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">📍</span> <span className="label">País</span>
            </SettingLeft>
            <SettingRight>España</SettingRight>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <h2>Reproducción</h2>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🎶</span> <span className="label">Calidad de audio</span>
            </SettingLeft>
            <SettingRight>Normal</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🔊</span> <span className="label">Normalización de volumen</span>
            </SettingLeft>
            <SettingRight>Desactivado</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🔀</span> <span className="label">Reproducción automática</span>
            </SettingLeft>
            <SettingRight>Desactivado</SettingRight>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <h2>Aplicación</h2>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🌙</span> <span className="label">Modo oscuro</span>
            </SettingLeft>
            <SettingRight>Activado</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">⚡</span> <span className="label">Aceleración de hardware</span>
            </SettingLeft>
            <SettingRight>Desactivado</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🔔</span> <span className="label">Mostrar notificaciones</span>
            </SettingLeft>
            <SettingRight>Desactivado</SettingRight>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <h2>Acerca de</h2>
          <SettingItem>
            <SettingLeft>
              <span className="icon">ℹ️</span> <span className="label">Versión</span>
            </SettingLeft>
            <SettingRight>1.2.3</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">📜</span> <span className="label">Términos y condiciones</span>
            </SettingLeft>
            <SettingRight>Términos y condiciones</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🛡️</span> <span className="label">Política de privacidad</span>
            </SettingLeft>
            <SettingRight>Política de privacidad</SettingRight>
          </SettingItem>
          <SettingItem>
            <SettingLeft>
              <span className="icon">🚪</span> <span className="label">Cerrar sesión</span>
            </SettingLeft>
            <SettingRight>Cerrar sesión</SettingRight>
          </SettingItem>
        </SettingsSection>
      </MainContent>
    </PageContainer>
  );
}

export default SettingsPage;