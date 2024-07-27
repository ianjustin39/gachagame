import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ResultCard from './ResultCard';
import Banner from './Banner';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

const App = () => {
  const totalCards = 45;
  const cardsData = [];
  const cardsTitle = ['1 最近看待事情的態度', '2 最近發生的困難點', '3 植物想告訴你的話'];

  for (let i = 1; i <= totalCards; i++) {
    cardsData.push({ imgSrc: `${process.env.PUBLIC_URL}/images/${i}.png` });
  }

  const [cards, setCards] = useState(cardsData);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [viewResults, setViewResults] = useState(false);
  const [showBlankCards, setShowBlankCards] = useState([false, false, false]);

  const flipCard = (index) => {
    const cardToFlip = cards[index];
    if (!viewResults && selectedCards.length < 3 && !cardToFlip.flipped) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);

      const selectedCardWithTitle = {
        ...newCards[index],
        title: cardsTitle[selectedCards.length],
        index: index
      };

      setTimeout(() => {
        const newSelectedCards = [...selectedCards, selectedCardWithTitle];
        setSelectedCards(newSelectedCards);
        const newShowBlankCards = [...showBlankCards];
        newShowBlankCards[selectedCards.length] = true;
        setShowBlankCards(newShowBlankCards);

        console.log(newSelectedCards);

        if (newSelectedCards.length === 3) {
          setIsShuffling(true);
          setTimeout(() => {
            setViewResults(true);
          }, 1000);
        }
      }, 600); // 等待翻转动画完成后显示在空白卡片位置
    }
  };

  const shuffleCards = () => {
    setIsShuffling(true);
    const newCards = cards.map(card => ({ ...card, flipped: false }));
    setCards(newCards);
    setSelectedCards([]);
    setViewResults(false);
    setShowBlankCards([false, false, false]);
    setIsShuffling(false);
    setTimeout(() => {
      setCards(shuffleArray(newCards));
      setFlippedCount(0);
      setIsShuffling(false);
    }, 600);
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Banner />
      <Grid container spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}>
        <Grid xs={12}>
          {viewResults ? (
            <Button variant="contained" onClick={shuffleCards}>重新抽卡</Button>
          ) : (
            <Button onClick={shuffleCards} disabled={isShuffling} variant="contained">洗牌</Button>
          )}
        </Grid>
      </Grid>

      {viewResults ? (
        <div className="result-screen">
          <div className="selected-cards">
            {selectedCards.map((card, index) => (
              <div key={index} className="selected-card">
                <ResultCard card={card} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="blank-cards">
            {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`blank-card ${showBlankCards[index] ? 'fade-in' : ''}`}
                >
                  {showBlankCards[index] && (
                    <div className={`card ${selectedCards[index]?.flipped ? 'flipped' : ''}`}>
                      <div className="card-inner">
                        <div className="card-front"></div>
                        <div className="card-back">
                          <img src={selectedCards[index]?.imgSrc} alt={`Card ${index + 1}`} />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
          <div className="cards">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${card.flipped ? 'flipped' : ''} ${selectedCards.find(sc => sc.index === index) ? 'hidden' : ''}`}
                onClick={() => flipCard(index)}
              >
                <div className="card-inner">
                  <div className="card-front"></div>
                  <div className="card-back">
                    <img src={card.imgSrc} alt={`Card ${index + 1}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
