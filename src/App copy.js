import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import ResultCard from './ResultCard';
import Banner from './Banner';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';



const App = () => {

  // 生成 cardsData
  const totalCards = 45;
  const cardsData = [];
  const cardsTitle = ['1 最近看待事情的態度', '2 最近發生的困難點', '3 植物想告訴你的話'];

  for (let i = 1; i <= totalCards; i++) {
    cardsData.push({ imgSrc: `${process.env.PUBLIC_URL}/images/${i}.png` });
  }

  const [cards, setCards] = useState(cardsData);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false); // 用來控制洗牌的狀態
  const [selectedCards, setSelectedCards] = useState([]);
  const [viewResults, setViewResults] = useState(false); // 用於切換顯示結果頁面

  // const flipCard = (index) => {
  //   if (flippedCount < 3) {
  //     const newCards = [...cards];
  //     newCards[index].flipped = !newCards[index].flipped; // Toggle flip
  //     setCards(newCards);
  //     setFlippedCount(flippedCount + (newCards[index].flipped ? 1 : -1));
  //   }
  // };
  const flipCard = (index) => {
    const cardToFlip = cards[index];
    if (!viewResults && selectedCards.length < 3 && !cardToFlip.flipped) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
  
      // 給被選中的卡片添加標題
      const selectedCardWithTitle = {
        ...newCards[index],
        title: cardsTitle[selectedCards.length] // 根據已選卡片的數量決定標題
      };
      
  
      const newSelectedCards = [...selectedCards, selectedCardWithTitle];
      setSelectedCards(newSelectedCards);
      console.log(newSelectedCards)
  
      if (newSelectedCards.length === 3) {
        setIsShuffling(true); // 禁用洗牌按鈕
        setTimeout(() => {
          setViewResults(true); // 切換到結果畫面
        }, 1000); // 延遲一秒後執行
      }
    }
  };
  
  const shuffleCards = () => {
    // 設置狀態以標記需要翻回卡牌
    setIsShuffling(true);
    // 將所有卡牌翻回
    const newCards = cards.map(card => ({ ...card, flipped: false }));
    setCards(newCards);
    
    setSelectedCards([]);
    setViewResults(false); // 返回抽卡頁面
    setIsShuffling(false);
    // 等待動畫完成後再進行洗牌
    setTimeout(() => {
      setCards(shuffleArray(newCards));
      setFlippedCount(0); // 重置翻轉計數
      setIsShuffling(false); // 設置洗牌完成狀態
    }, 600); // 延遲時間應與翻轉動畫的持續時間一致
  };

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  // 在組件加載後立即洗牌
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Banner></Banner>
      <Grid container spacing={2} sx={{ marginTop: '20px', marginBottom: '20px' }}> 
        <Grid xs={12}>
        {viewResults ? (
          <Button variant="contained" onClick={shuffleCards}>重新抽卡</Button>
      ) : (
        <Button  onClick={shuffleCards} disabled={isShuffling} variant="contained">洗牌</Button>
      )}
        </Grid>
      </Grid>
      
      {viewResults ? (
        <div className="result-screen">
          
          <div className="selected-cards">
            {selectedCards.map((card, index) => (
              <div key={index} className="selected-card">
                {/* <img src={card.imgSrc} alt={`Selected Card ${index + 1}`} /> */}
                <ResultCard card={card}></ResultCard>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          
          <div className="cards">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${card.flipped ? 'flipped' : ''}`}
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
