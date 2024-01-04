import Navigation from "./Navigation";
import DeckButtons from "./DeckButtons";  // Import the DeckButtons component
import { readDeck, deleteCard } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function getCardId(deckId, abortController, card) {
  return readDeck(deckId, abortController.signal).then((res) =>
    res.cards.find(
      (eachCard) => eachCard.front === card.front && eachCard.back === card.back
    )
  );
}

function DeckScreen() {
  console.log("DeckScreen view has rendered");
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

  return (
    <div>
      <Navigation>
      <div>
            <li> 
              {deck.name}
            </li>
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
            <button
              onClick={() => {
                const answer = window.confirm(
                  "Delete this card? \n \n You will not be able to recover it."
                );
                if (answer === true) {
                  const abortController = new AbortController();
                  getCardId(deckId, abortController, card).then((r) => {
                    deleteCard(r.id, abortController.signal).then((r) =>
                      setCard(
                        cards.filter(
                          (eachCard) =>
                            eachCard.front !== card.front &&
                            eachCard.back !== card.back
                        )
                      )
                    );
                  });
                }
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeckScreen;
