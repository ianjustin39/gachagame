import React, { useState, useEffect } from 'react';
import './App.css';

// 生成 cardsData
const totalCards = 45;
const cardsData = [];

for (let i = 1; i <= totalCards; i++) {
  cardsData.push({ imgSrc: `${process.env.PUBLIC_URL}/images/${i}.jpg` });
}

const App = () => {
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

      const newSelectedCards = [...selectedCards, newCards[index]];
      setSelectedCards(newSelectedCards);

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
      {viewResults ? (
        <div className="result-screen">
          <h1>你的精油卡</h1>
          <button onClick={shuffleCards}>重新抽卡</button>
          <div className="selected-cards">
            {selectedCards.map((card, index) => (
              <div key={index} className="selected-card">
                <img src={card.imgSrc} alt={`Selected Card ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1>Aroma Around</h1>
            <h2>精油抓周</h2>
          </div>
          <button  onClick={shuffleCards} disabled={isShuffling}>洗牌</button>
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
