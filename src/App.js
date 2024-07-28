import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ResultCard from './ResultCard';
import Banner from './Banner';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

const App = () => {
  const totalCards = 45;
  const cardsData = [];
  const cardsTitle = ['1 最近看待事情的態度', '2 最近發生的困難點', '3 植物想告訴你的話'];
  const [currentPage, setCurrentPage] = useState('init'); // 'init', 'draw', 'result'


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
            setCurrentPage('result');
          }, 1000);
        }
      }, 1000); // 等待翻转动画完成后显示在空白卡片位置
    }
  };
  const shuffleCards = () => {
    setIsShuffling(true);
    // 首先将所有卡片移动到中间
    const newCards = cards.map(card => ({ ...card, flipped: false }));
    setCards(newCards.map(card => ({ ...card, shuffling: true })));
  
    setTimeout(() => {
      // 展示所有卡片在中间聚集的效果
      setCards(newCards.map(card => ({ ...card, transform: `translateX(${(window.innerWidth / 2) - (card.width / 2)}px)` })));
  
      setTimeout(() => {
        // 洗牌并将卡片展开到新位置
        const shuffledCards = shuffleArray(newCards);
        setCards(shuffledCards.map(card => ({ ...card, shuffling: false, transform: '' })));
        setSelectedCards([]);
        setViewResults(false);
        setShowBlankCards([false, false, false]);
        setIsShuffling(false);
      }, 600); // 洗牌后展开的延迟时间
    }, 600); // 聚集到中间的持续时间
  };
  
  

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // 假定768px以下为手机尺寸
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Banner />
      <Grid container spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}>
        {/* <Grid xs={12}>
          {viewResults ? (
            <Button variant="contained" onClick={shuffleCards}>重新抽卡</Button>
          ) : (
            <Button onClick={shuffleCards} disabled={isShuffling} variant="contained">洗牌</Button>
          )}
        </Grid> */}
      </Grid>
  
      {currentPage === 'init' && (
        <div className="init-page">
          <Typography sx={{ margin: 2 }}>
            精油抓周並非占卜，而是發現自我的一個方式之一。
          </Typography>
          <Typography  sx={{ margin: 2 }}>
            首先你需要先静下心来深呼吸，調整自己的心情與狀態，讓情緒處於平穩的狀態。
          </Typography>
          <Typography sx={{ marginBottom: 4 }}>
            若您覺得已經準備好的，就請點擊下方『開始』按鈕，開始探索...
          </Typography>
          <Button variant="contained" onClick={() => [setCurrentPage('draw'),shuffleCards() ]}>
            開始
          </Button>
        </div>
      )}

      {currentPage === 'draw' && (
        <div>
          <div className="blank-cards">
            {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`blank-card ${showBlankCards[index] ? 'fade-in' : ''}`}
                >
                  {showBlankCards[index] && (
                    <div className={`blank-single-card ${selectedCards[index]?.flipped ? 'flipped' : ''}`}>
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
          <Typography  sx={{ margin: 2 }}>
            這邊有 45 張精油卡，請您點擊洗牌後，使用您的非慣用手依序選擇三張卡。
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}>
            <Grid xs={12}>
              {viewResults ? (
                <Button variant="contained" onClick={shuffleCards}>重新抽卡</Button>
              ) : (
                <Button onClick={shuffleCards} disabled={isShuffling} variant="contained">洗牌</Button>
              )}
            </Grid>
          </Grid>
          <div className="cards">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${card.flipped ? 'flipped' : ''} ${card.shuffling ? 'shuffling' : ''} ${selectedCards.find(sc => sc.index === index) ? 'hidden' : ''}`}
                onClick={() => flipCard(index)}
                style={{
                    transform: card.shuffling ? (isMobile ? '' : `translateX(calc(${(index - 23) * 19}px))`) : '',
                    transition: card.shuffling ? (isMobile ? 'opacity 0.6s ease' : '') : '',
                    opacity:  card.shuffling ?(isMobile ? 0 : 1) : '',
                }}
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
      
      {currentPage === 'result' && (
        <div className="result-screen">
          <Typography variant='h5' sx={{ margin: 2 }}>
            您的精油卡
          </Typography>
          <div className="selected-cards">
            {selectedCards.map((card, index) => (
              <div key={index} className="selected-card">
                <ResultCard card={card} />
              </div>
            ))}
          </div>
        </div>
    )}  
    </div>
  );
};

export default App;
