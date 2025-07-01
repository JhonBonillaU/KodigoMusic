import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../Firebase/appConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 60px);
    background-color: ${props => props.theme.primaryBg};
    padding: 40px 20px;
    box-sizing: border-box;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 30px 15px;
    }
`;

const FormBox = styled.div`
    background-color: ${props => props.theme.cardBg};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
    width: 100%;
    max-width: 600px;
    text-align: left;
    box-sizing: border-box;

    @media (max-width: 480px) {
        padding: 30px 20px;
    }
`;

const FormTitle = styled.h2`
    text-align: center;
    color: ${props => props.theme.spotifyGreen};
    margin-bottom: 30px;
    font-size: 2.2em;

    @media (max-width: 480px) {
        font-size: 1.9em;
    }
`;

const FormGroup = styled.div`
    margin-bottom: 25px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    color: ${props => props.theme.textMuted};
    font-weight: bold;
    font-size: 0.95em;
`;

const Input = styled.input`
    width: 100%;
    padding: 14px;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 6px;
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.textLight};
    font-size: 1em;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &::placeholder {
        color: ${props => props.theme.textMuted};
    }

    &:focus {
        outline: none;
        border-color: ${props => props.theme.spotifyGreen};
        box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3);
    }

    ${props => props.$hasError && `
        border-color: ${props.theme.errorRed};
    `}
`;

const Select = styled.select`
    width: 100%;
    padding: 14px;
    border: 1px solid ${props => props.theme.inputBorder};
    border-radius: 6px;
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.textLight};
    font-size: 1em;
    box-sizing: border-box;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20fill%3D%22%23b3b3b3%22%20d%3D%22M208%2096H48l80%2080z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 12px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${props => props.theme.spotifyGreen};
        box-shadow: 0 0 0 2px rgba(29, 185, 84, 0.3);
    }

    option {
        background-color: ${props => props.theme.inputBg};
        color: ${props => props.theme.textLight};
    }

    ${props => props.$hasError && `
        border-color: ${props.theme.errorRed};
    `}
`;

const ErrorText = styled.p`
    color: ${props => props.theme.errorRed};
    font-size: 0.8em;
    margin-top: 8px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: ${props => props.theme.spotifyGreen};
    color: ${props => props.theme.textLight};
    border: none;
    border-radius: 6px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${props => props.theme.spotifyGreenHover};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background-color: ${props => props.theme.textMuted};
        cursor: not-allowed;
        transform: none;
    }
`;

const StatusMessage = styled.p`
    padding: 12px;
    border-radius: 5px;
    margin-bottom: 25px;
    text-align: center;
    font-weight: bold;
    font-size: 0.9em;
    background-color: ${props => (props.$type === 'error' ? '#3b1c1c' : '#1c3b1c')};
    color: ${props => (props.$type === 'error' ? props.theme.errorRed : props.theme.spotifyGreen)};
    border: 1px solid ${props => (props.$type === 'error' ? props.theme.errorRed : props.theme.spotifyGreen)};
`;

function Form() {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
    });
    const [errors, setErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const genres = ['Pop', 'Rock', 'Electronic', 'Metal', 'Jazz', 'Classical', 'Hip Hop', 'R&B', 'Country', 'Folk'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.title.trim()) {
            newErrors.title = 'El título de la canción es obligatorio.';
            isValid = false;
        }
        if (!formData.artist.trim()) {
            newErrors.artist = 'El artista es obligatorio.';
            isValid = false;
        }
        if (!formData.genre) {
            newErrors.genre = 'Debes seleccionar un género.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSubmitMessage('');
        setMessageType('');

        console.log("Iniciando handleSubmit");
        console.log("Datos del formulario:", formData);

        if (!validateForm()) {
            console.log("Validación fallida. Errores:", errors);
            setSubmitMessage('Por favor, corrige los errores en el formulario.');
            setMessageType('error');
            return;
        }
        console.log("Validación exitosa.");

        setSubmitMessage('Guardando datos...');
        setMessageType('info');

        try {
            console.log("Intentando guardar en Firestore...");
            const docRef = await addDoc(collection(db, 'songs'), {
                ...formData,
                createdAt: serverTimestamp(),
            });
            console.log('Documento de canción escrito con ID:', docRef.id);

            setSubmitMessage('¡Datos guardados en Firebase exitosamente!');
            setMessageType('success');

            setFormData({ title: '', artist: '', album: '', genre: '' });

        } catch (error) {
            console.error('Error CATCH al enviar el formulario:', error);
            setSubmitMessage(`Error al guardar los datos: ${error.message}`);
            setMessageType('error');
        } finally {
            console.log("Finalizando handleSubmit.");
        }
    };

    return (
        <FormContainer>
            <FormBox>
                <FormTitle>Guardar Datos de Canción</FormTitle>
                <form onSubmit={handleSubmit}>
                    {submitMessage && (
                        <StatusMessage $type={messageType}>
                            {submitMessage}
                        </StatusMessage>
                    )}

                    <FormGroup>
                        <Label htmlFor="title">
                            Título de la Canción:
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Ej. Mi Gran Canción"
                            value={formData.title}
                            onChange={handleChange}
                            $hasError={!!errors.title}
                        />
                        {errors.title && <ErrorText>{errors.title}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="artist">
                            Artista:
                        </Label>
                        <Input
                            type="text"
                            id="artist"
                            name="artist"
                            placeholder="Ej. Nombre del Artista"
                            value={formData.artist}
                            onChange={handleChange}
                            $hasError={!!errors.artist}
                        />
                        {errors.artist && <ErrorText>{errors.artist}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="album">
                            Álbum (Opcional):
                        </Label>
                        <Input
                            type="text"
                            id="album"
                            name="album"
                            placeholder="Ej. Mi Álbum Debut"
                            value={formData.album}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="genre">
                            Género:
                        </Label>
                        <Select
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            $hasError={!!errors.genre}
                        >
                            <option value="">Selecciona un género</option>
                            {genres.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </Select>
                        {errors.genre && <ErrorText>{errors.genre}</ErrorText>}
                    </FormGroup>

                    <SubmitButton type="submit">
                        Guardar Canción
                    </SubmitButton>
                </form>
            </FormBox>
        </FormContainer>
    );
}

export default Form;