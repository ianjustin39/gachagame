import React from 'react';
import './Cards.css';  // 確保導入正確的 CSS 文件

const Cards = () => {
  const totalCards = 45;
  const cards = [];

  for (let i = 0; i < totalCards; i++) {
    const num = i * 15
    cards.push(
      <div className="card" style={{
        transform: `rotate(${(i) * 1 - totalCards/2.5 }deg) translateX(${(i - totalCards / 2) * 10 }px)`,
        // transform: `rotate(${(i) * 1 - totalCards/2 }deg) translateX(100px) translateY(${(Math.abs(i - totalCards / 2)) * 4 }px) `,
        position: 'absolute',
        left: '50%',
        transformOrigin: 'bottom center',
      }}>
        Card {i + 1}
      </div>
    );
  }

  return (
    <div className="cards-container">
      {cards}
    </div>
  );
};

export default Cards;
