import React from "react";
import { useHistory } from "react-router-dom";

import DeckButtons from "./DeckButtons";

function Deck({ id, name, description, cardsLength }) {
  console.log("Deck loaded");
  const history = useHistory();


  return (
    // Deck view shows the individual deck and the View button. Clicking View button loads DeckScreen
    <div className="decksList">
      <div>
        <h3>{name}</h3>
        <p>{cardsLength} cards</p>
      </div>
      <div>
      <button
          onClick={() => {
            history.push(`/decks/${id}`);
          }}
        >
          View
        </button>
      </div>
      <div>{description}</div>
      <div>
        <DeckButtons history={history} deckId={id} />
    </div>
    </div>
  );
}

export default Deck;

