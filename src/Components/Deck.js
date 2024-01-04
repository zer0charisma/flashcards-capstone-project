import { useHistory } from "react-router-dom";

function Deck({ index, id, name, description, cardsLength, deleteDeck }) {
  const history = useHistory();

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
        <button
          onClick={() => {
            history.push(`/decks/${id}/study`);
          }}
        >
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
