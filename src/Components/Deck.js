import React from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";

function Deck({ index, id, name, description, cardsLength, deleteDeck }) {
  const history = useHistory();

  const handleStudyClick = () => {
    if (cardsLength <= 2) {
      // Render NotEnoughCards component if there are <= 2 cards
      return (
        <NotEnoughCards totalCards={cardsLength} deckId={id} />
      );
    } else {
      // Redirect to the study page
      history.push(`/decks/${id}/study`);
    }
  };

  return (
    <div className="decksList">
      <div>
        <h3>{name}</h3>
        <p>{cardsLength} cards</p>
      </div>
      <div>{description}</div>
      <div>
        <button
          onClick={() => {
            history.push(`/decks/${id}`);
          }}
        >
          View
        </button>
        <button onClick={handleStudyClick}>
          Study
        </button>
      </div>
      <button
        onClick={() => {
          const popup = window.confirm(
            "Delete this deck? \n \n You will not be able to recover it."
          );
          popup && deleteDeck(index, name, description);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Deck;
