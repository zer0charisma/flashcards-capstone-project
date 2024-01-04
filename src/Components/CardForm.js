import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCard, readCard, updateCard } from "../utils/api";
import { getDeck } from "../Layout";
import Navigation from "./Navigation";

function CardForm() {
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    getDeck(setDeck, deckId);

    if (location.pathname.includes("edit")) {
      readCard(cardId, abortController.signal)
        .then((value) => setCard(value));
    }
  }, [deckId]);

  return (
    <div>
      <Navigation>
        {location.pathname === "/decks/new" ? (
          <li>Add Card</li>
        ) : (
          <div>
            <li> 
              <Link to={`/decks/${deckId}`}>{deck.name}</Link> 
            </li>
          </div>
        )}
      </Navigation>

      <h4>{`${deck.name}: Add Card`}</h4>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const abortController = new AbortController();
          if (location.pathname.includes("edit")) {
            updateCard(card, abortController.signal).then((res) => {
              setCard({ front: "", back: "" });
            });
          } else {
            createCard(deckId, card, abortController.signal).then((res) =>
              setCard({ front: "", back: "" })
            );
          }
        }}
      >
        <label htmlFor="front">Front</label>
        <br />

        <textarea
          onChange={(event) => {
            setCard({ ...card, front: event.target.value });
          }}
          rows={5}
          name="front"
          id="front"
          value={card.front || ""}
          placeholder="Front side of card"
        />
        <br />
        <label htmlFor="back">Back</label>
        <br />

        <textarea
          onChange={(event) => {
            setCard({ ...card, back: event.target.value });
          }}
          rows={5}
          name="back"
          id="back"
          value={card.back || ""}
          placeholder="Back side of card"
        />
        <br />

        <button type="submit">Add Card</button>
        <button onClick={() => history.push(`/decks/${deckId}`)}>Return to Deck</button>
      </form>
    </div>
  );
}

export default CardForm;
