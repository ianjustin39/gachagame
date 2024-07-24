// src/PokerDeck.js
import React from 'react';
import './PokerDeck.css'; // 引入CSS檔案來控制樣式

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const PokerDeck = () => {
  const cards = suits.flatMap(suit =>
    values.map(value => ({
      suit,
      value,
      imageUrl: `https://example.com/cards/${value}_of_${suit}.png` // 替換成實際的卡片圖片URL
    }))
  );

  return (
    <div className="deck">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <img src={card.imageUrl} alt={`${card.value} of ${card.suit}`} />
        </div>
      ))}
    </div>
  );
};

export default PokerDeck;
