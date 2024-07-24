import React, { useState } from 'react';
import './App.css';

// 生成 cardsData
const totalCards = 45;
const cardsData = [];

for (let i = 1; i <= totalCards; i++) {
  cardsData.push({ imgSrc: `images/${i}.jpg` });
}

const App = () => {
  const [cards, setCards] = useState(cardsData);
  const [flippedCount, setFlippedCount] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false); // 用來控制洗牌的狀態


  const flipCard = (index) => {
    if (flippedCount < 3) {
      const newCards = [...cards];
      newCards[index].flipped = !newCards[index].flipped; // Toggle flip
      setCards(newCards);
      setFlippedCount(flippedCount + (newCards[index].flipped ? 1 : -1));
    }
  };

  const shuffleCards = () => {
    // 設置狀態以標記需要翻回卡牌
    setIsShuffling(true);
    // 將所有卡牌翻回
    const newCards = cards.map(card => ({ ...card, flipped: false }));
    setCards(newCards);
    
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

  return (
    <div className="App">
      <div>
        <h1>Aroma Around</h1>
        <h2>精油抓周</h2>
        <h5>請先點選洗牌再抽！</h5>
      </div>
      <button onClick={shuffleCards}>洗牌</button>
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
  );
};

export default App;
