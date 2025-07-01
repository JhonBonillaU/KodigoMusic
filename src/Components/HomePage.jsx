import React from 'react';
import styled from 'styled-components';
import likeImg from '../img/Like.jpg';
import ChillImg from '../img/Chill.jpg';
import WorkoutImg from '../img/Workout.jpg';
import FocusImg from '../img/Focus.jpg';
import LateNightImg from '../img/Late.jpg';
import IndieImg from '../img/Indie.jpg';
import AcoustingImg from '../img/Acousting.jpg';
import TopthreeImg from '../img/Topthree.jpg';
import ThisIsWosImg from '../img/Wos.jpg';
import PopImg from '../img/Pop.jpg';
import WeekndImg from '../img/Weeknd.jpg';
import ThrowbackImg from '../img/Back.jpg';
import RockImg from '../img/Rock.jpg';
import DrivingImg from '../img/Driving.jpg';
import DailyMix1Img from '../img/Dailyone.jpg';
import DailyMix2Img from '../img/Dailytwo.jpg';  
import DailyMix3Img from '../img/Dailythree.jpg';
import ReleaseRadarImg from '../img/Release.jpg';
import DiscoverWeeklyImg from '../img/Weekly.jpg';
import OnRepeatImg from '../img/Repeat.jpg';
import SummerVibesImg from '../img/Summer.jpg';
import MorningImg from '../img/Coffe.jpg';

const HomePageContainer = styled.div`
  padding: 40px 20px;
  background-color: ${props => props.theme.primaryBg};
  color: ${props => props.theme.textLight};
  min-height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;



  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    color: ${props => props.theme.spotifyGreen};
    font-size: 2em;
    margin-bottom: 20px;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.8em;
    }
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;


  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`;

const BaseMusicCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: ${props => props.theme.hoverBg};
    transform: translateY(-3px);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    object-fit: cover;
  }

  h3 {
    color: ${props => props.theme.textLight};
    font-size: 1em;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: ${props => props.theme.textMuted};
    font-size: 0.85em;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const VerticalMusicCard = styled(BaseMusicCard)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  img {
    margin-bottom: 10px;
  }
`;

const HorizontalMusicCard = styled(BaseMusicCard)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 80px;

  img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    margin-bottom: 0;
    border-radius: 4px;
    flex-shrink: 0;
  }

  div {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  h3, p {
    text-align: left;
    margin-bottom: 0;
  }
`;


function HomePage() {
  const goodEveningItems = [
    { id: 1, name: "Liked Songs", description: "Your daily soundtrack.", cover: likeImg },
    { id: 2, name: "Chill Vibes", description: "Relaxing beats.", cover: ChillImg },
    { id: 3, name: "Workout Mix", description: "Energy boost.", cover: WorkoutImg },
    { id: 4, name: "Focus Flow", description: "Concentration music.", cover: FocusImg },
    { id: 5, name: "Late Night Beats", description: "Smooth sounds.", cover: LateNightImg },
    { id: 6, name: "Indie Gems", description: "Hidden indie tracks.", cover: IndieImg },
    { id: 7, name: "Acoustic", description: "Unwind with acoustic tunes.", cover: AcoustingImg },
];

const jumpBackInItems = [
    { id: 8, name: "Top Songs 2023", description: "The best of last year.", cover: TopthreeImg },
    { id: 9, name: "This Is Wos", description: "All about Wos.", cover: ThisIsWosImg },
    { id: 10, name: "Pop Hits", description: "Current pop chart toppers.", cover: PopImg },
    { id: 11, name: "The Weeknd", description: "The best of The Weeknd.", cover: WeekndImg },
    { id: 12, name: "Throwback Jams", description: "Nostalgic hits.", cover: ThrowbackImg }, 
    { id: 13, name: "Rock Anthems", description: "Classic rock bangers.", cover: RockImg }, 
    { id: 14, name: "Driving Mix", description: "Perfect for the road.", cover: DrivingImg },
];

const madeForYouItems = [
    { id: 15, name: "Daily Mix 1", description: "Your daily dose of music.", cover: DailyMix1Img },
    { id: 16, name: "Daily Mix 2", description: "More of what you love.", cover: DailyMix2Img },
    { id: 17, name: "Daily Mix 3", description: "New sounds for you.", cover:  DailyMix3Img },
    { id: 18, name: "Release Radar", description: "New music from artists you follow.", cover: ReleaseRadarImg },
    { id: 19, name: "Discover Weekly", description: "New tracks chosen for you.", cover: DiscoverWeeklyImg },
    { id: 20, name: "On Repeat", description: "Your most played tracks.", cover: OnRepeatImg },
    { id: 21, name: "Summer Vibes", description: "Soundtrack for sunny days.", cover: SummerVibesImg },
];

const recentlyPlayedItems = [
    { id: 22, name: "Liked Songs", description: "Your daily soundtrack.", cover: likeImg },
    { id: 23, name: "Chill Vibes", description: "Relaxing beats.", cover: ChillImg },
    { id: 24, name: "Workout Mix", description: "Energy boost.", cover: WorkoutImg },
    { id: 25, name: "Focus Flow", description: "Concentration music.", cover: FocusImg },
    { id: 26, name: "Late Night Beats", description: "Smooth sounds.", cover: LateNightImg },
    { id: 27, name: "Indie Gems", description: "Hidden indie tracks.", cover: IndieImg },
    { id: 28, name: "Morning Coffee", description: "Gentle start to your day.", cover: MorningImg },
];

  return (
    <HomePageContainer>
      <Section>
        <h2>Good evening</h2>
        <CardGrid>
          {goodEveningItems.map(item => (
            <HorizontalMusicCard key={item.id}>
              <img src={item.cover} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </HorizontalMusicCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <h2>Jump back in</h2>
        <CardGrid>
          {jumpBackInItems.map(item => (
            <VerticalMusicCard key={item.id}>
              <img src={item.cover} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </VerticalMusicCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <h2>Made For You</h2>
        <CardGrid>
          {madeForYouItems.map(item => (
            <VerticalMusicCard key={item.id}>
              <img src={item.cover} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </VerticalMusicCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <h2>Recently played</h2>
        <CardGrid>
          {recentlyPlayedItems.map(item => (
            <VerticalMusicCard key={item.id}>
              <img src={item.cover} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </VerticalMusicCard>
          ))}
        </CardGrid>
      </Section>
    </HomePageContainer>
  );
}

export default HomePage;