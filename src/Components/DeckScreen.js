import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";
import Navigation from "./Navigation";
import DeckButtons from "./DeckButtons";

function getCardId(deckId, abortController, card) {
  return readDeck(deckId, abortController.signal).then((res) =>
    res.cards.find(
      (eachCard) =>
        eachCard.front === card.front && eachCard.back === card.back
    )
  );
}

function DeckScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCard] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then((res) => {
      setDeck(res);
      setCard(res.cards);
    });
  }, [deckId]);

  if (Object.keys(deck).length === 0) {
    return "Loading...";
  }

  const handleDeleteCard = async (card) => {
    const confirmDelete = window.confirm(
      "Delete this card? \n \n You will not be able to recover it."
    );

    if (confirmDelete) {
      const abortController = new AbortController();
      const cardToDelete = await getCardId(deckId, abortController, card);

      // Call the deleteCard function with the card ID
      await deleteCard(cardToDelete.id, abortController.signal);

      // Update the deck state to reflect the deletion
      const updatedDeck = await readDeck(deckId, abortController.signal);
      setDeck(updatedDeck);
      setCard(updatedDeck.cards);

      // Redirect the user to the updated DeckScreen view
      history.push(`/`);
    }
  };

  return (
    <div>
      <Navigation>
        <div>
          <li>{deck.name}</li>
        </div>
      </Navigation>

      <div>
        <h5>{deck.name}</h5>
        <p>{deck.description}</p>

        <DeckButtons history={history} deckId={deckId} />

        <br />
        <h2>Cards</h2>
        {cards.map((card, index) => (
          <div key={index} className="decksList">
            <div>
              <p>{card.front}</p>
              <p>{card.back}</p>
            </div>
            <button
              onClick={() => {
                const abortController = new AbortController();
                getCardId(deckId, abortController, card).then((res) =>
                  history.push(`/decks/${deckId}/cards/${res.id}/edit`)
                );
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteCard(card)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckScreen;
