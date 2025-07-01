import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChillImg from '../img/Chill.jpg';
import AcoustingImg from '../img/Acousting.jpg';
import JazzImg from '../img/Jazz.jpg';
import PartyImg from '../img/Party.jpg';
import RoadTripImg from '../img/RoadTRip.jpg';
import CodeFocusImg from '../img/FocusCode.jpg';
import WorkoutHitsImg from '../img/WorkoutHits.jpg';
import StudyImg from '../img/Study.jpg';

const PlaylistsPageContainer = styled.div`
  padding: 40px 20px;
  background-color: ${props => props.theme.primaryBg};
  color: ${props => props.theme.textLight};
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.spotifyGreen};
  font-size: 2.5em;
  margin-bottom: 25px;
  text-align: center;
`;

const PageDescription = styled.p`
  color: ${props => props.theme.textMuted};
  font-size: 1.1em;
  margin-bottom: 40px;
  text-align: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.inputBorder};
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.textLight};
  font-size: 1em;
  flex-grow: 1;
  max-width: 300px;

  &::placeholder {
    color: ${props => props.theme.textMuted};
  }
`;

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.inputBorder};
  background-color: ${props => props.theme.inputBg};
  color: ${props => props.theme.textLight};
  font-size: 1em;
  cursor: pointer;
  min-width: 150px;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20fill%3D%22%23b3b3b3%22%20d%3D%22M208%2096H48l80%2080z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;

  option {
    background-color: ${props => props.theme.inputBg};
    color: ${props => props.theme.textLight};
  }
`;

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const PlaylistCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.hoverBg};
    transform: translateY(-5px);
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 15px;

    @media (max-width: 480px) {
      width: 120px;
      height: 120px;
    }
  }

  h3 {
    color: ${props => props.theme.textLight};
    font-size: 1.1em;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  p {
    color: ${props => props.theme.textMuted};
    font-size: 0.9em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
`;

function PlaylistsPage() {
  const initialPlaylists = [
    { id: 1, name: "Workout Hits", description: "Boost your energy!", genre: "Pop", cover: WorkoutHitsImg },
    { id: 2, name: "Chill Vibes", description: "Relaxing background music.", genre: "Lo-Fi", cover: ChillImg },
    { id: 3, name: "Code Focus", description: "Music for deep work sessions.", genre: "Electronic", cover: CodeFocusImg },
    { id: 4, name: "Road Trip Anthems", description: "Sing along on your journey.", genre: "Rock", cover: RoadTripImg },
    { id: 5, name: "Morning Jazz", description: "Smooth jazz to start your day.", genre: "Jazz", cover: JazzImg },
    { id: 6, name: "Study Beats", description: "Concentration and calm.", genre: "Classical", cover: StudyImg },
    { id: 7, name: "Party Mix", description: "Get the party started!", genre: "Pop", cover: PartyImg },
    { id: 8, name: "Acoustic", description: "Unplug and unwind.", genre: "Acoustic", cover: AcoustingImg },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const genres = ['All', ...new Set(initialPlaylists.map(p => p.genre))].sort();

  const filteredPlaylists = initialPlaylists.filter(playlist => {
    const matchesSearch = playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'All' || playlist.genre === filterGenre;
    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'genre') {
      return a.genre.localeCompare(b.genre);
    }
    return 0;
  });

  return (
    <PlaylistsPageContainer>
      <PageTitle>Mis Listas de Reproducción</PageTitle>
      <PageDescription>Explora y gestiona tus colecciones de música favoritas.</PageDescription>

      <ControlsContainer>
        <SearchInput
          type="text"
          placeholder="Buscar playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Select>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Ordenar por Nombre</option>
          <option value="genre">Ordenar por Género</option>
        </Select>
      </ControlsContainer>

      <PlaylistGrid>
        {filteredPlaylists.map(playlist => (
          <PlaylistCard key={playlist.id}>
            <img src={playlist.cover} alt={playlist.name} />
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
          </PlaylistCard>
        ))}
      </PlaylistGrid>
    </PlaylistsPageContainer>
  );
}

export default PlaylistsPage;