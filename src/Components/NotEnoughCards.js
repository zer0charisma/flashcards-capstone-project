import React from "react";
import { useHistory, Link } from "react-router-dom";

function NotEnoughCards({ totalCards, deckId, deckName }) {
  let cardCount = totalCards <= 1 ? `${totalCards} card` : `${totalCards} cards`;
  let history = useHistory();

  return (
    <div>
      <h2>Not Enough Cards.</h2>
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
