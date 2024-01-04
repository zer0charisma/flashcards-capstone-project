import React from "react";

function DeckButtons({ history, deckId }) {

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
        <button>Delete</button>
      </div>
    );
  }


export default DeckButtons;
