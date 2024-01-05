import React from "react";
// import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckButtons({ history, deckId }) {
  const handleDeleteDeck = async () => {
    const confirmDelete = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );

    if (confirmDelete) {
      // Call the deleteDeck function with the deck ID
      await deleteDeck(deckId);

      // Redirect to the home page or another appropriate location
      history.push('/');
    }
  };

  return (
    <div className="deckScreenButtons">
      <button onClick={() => history.push(`/decks/${deckId}/edit`)}>
        Edit
      </button>
      <button onClick={() => history.push(`/decks/${deckId}/study`)}>
        Study
      </button>
      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
        Add Cards
      </button>
      <button onClick={handleDeleteDeck}>Delete</button>
    </div>
  );
}

export default DeckButtons;
