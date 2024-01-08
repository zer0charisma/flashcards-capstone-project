import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";
import { deleteDeck } from "../utils/api";

function DeckButtons({ history, deckId, cardsLength }) {
  const [decksList, setDecksList] = useState([]);

  const deleteDeckObj = async (deckIndex, name, description) => {
    const abortController = new AbortController();
    const deckIdfromList = decksList.find(
      (deck) => deck.name === name && deck.description === description
    ).id;
    try {
      await deleteDeck(deckIdfromList, abortController.signal);
      setDecksList((currentDeckList) =>
        currentDeckList.filter((deck, index) => index !== deckIndex)
      );
      // Refresh the current page after deleting a deck
      window.location.reload(false);
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };
  const handleStudyClick = () => {
    if (cardsLength <= 2) {
      // Render NotEnoughCards component if there are <= 2 cards
      return (
        <NotEnoughCards totalCards={cardsLength} deckId={deckId} />
      );
    } else {
      // Redirect to the study page
      history.push(`/decks/${deckId}/study`);
    }
  };

  const historyObj = useHistory(); // Rename to avoid naming conflict

  

  const handleDeleteDeck = async () => {
    const confirmDelete = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );

    if (confirmDelete) {
      // Call the deleteDeck function with the deck ID
      await deleteDeck(deckId);

      // Redirect to the home page or another appropriate location
      history.push(`/`);
      window.location.reload(false);
    }
  };

  return (
    <div className="deckScreenButtons">
      <button onClick={() => history.push(`/decks/${deckId}/edit`)}>
        Edit
      </button>
      <button onClick={handleStudyClick}>Study</button>
      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
        Add Cards
      </button>

      <button onClick={handleDeleteDeck} deleteDeck={deleteDeckObj}>
        Delete
      </button>
    </div>
  );
}

export default DeckButtons;
