import React, { useEffect } from "react";
import Deck from "../Components/Deck";
import { deleteDeck } from "../utils/api";

function DeckList({ decksList, setDecksList }) {
  useEffect(() => {
    console.log("Decklist loaded");
  }, [decksList]);

  const deleteDeckObj = async (deckIndex, name, description) => {
    const abortController = new AbortController();
    const deckIdfromList = decksList.find(
      (deck) =>
        deck.name === name && deck.description === description
    ).id;
    try {
      await deleteDeck(deckIdfromList, abortController.signal);
      setDecksList((currentDeckList) =>
        currentDeckList.filter((deck, index) => index !== deckIndex)
      );
      // Reload the page after deleting a deck
      window.location.reload();
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  if (decksList.length > 0) {
    // return the deckList if the user returns home from the Nav bar. 
    // TODO: Refactor this and DeckScreen later to  eliminate redundant code
    return (
      <div>
        {decksList.map((deck, index) => (
          <Deck
            key={index}
            index={index}
            id={deck.id}
            name={deck.name}
            description={deck.description}
            cardsLength={deck.cards.length}
            deleteDeck={deleteDeckObj}
          />
        ))}
      </div>
    );
  }

  if (decksList.length === 0) {
    return <h4>No decks! Click Create Deck to make one!</h4>;
  }

  return <p>Loading...</p>;
}

export default DeckList;
