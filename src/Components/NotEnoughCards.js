import React from "react";
import { useHistory } from "react-router-dom";

function NotEnoughCards({ totalCards, deckId }) {
  const history = useHistory();
  let cardCount = "2 cards";
  cardCount = !totalCards ? "0 cards" : "1 card";
  
  return (
    <div>
      <h2> Not Enough Cards.</h2>
      <h4>
        You need at least 3 cards to study. There are only {cardCount} in this deck.
      </h4>
      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
        Add Cards
      </button>
    </div>
  );
}

export default NotEnoughCards;
