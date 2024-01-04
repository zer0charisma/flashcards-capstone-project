import Deck from "../Components/Deck";
import React  from "react";
// import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
// import NotFound from "../Layout/NotFound";
import {deleteDeck} from "../utils/api";


function DeckList({ decksList, setDecksList}) { 
    const deleteDeckObj = (deckIndex, name, description) => {
        const abortController = new AbortController();
        const deckIdfromList = decksList.find((deck) => deck.name === name && deck.description === description).id
        deleteDeck(deckIdfromList, abortController.signal)
        .then(res => setDecksList((currentDeckList) => currentDeckList.filter((deck, index) => index !== deckIndex)))
    }
    if (decksList.length > 0) {
        return (
            <div>
                {decksList.map((deck, index) => <Deck
                    key={index}
                    index={index}
                    id={deck.id}
                    name={deck.name}
                    description={deck.description}
                    cardsLength={deck.cards.length}
                    deleteDeck={deleteDeckObj} 
                />)}
            </div>
        )
    }
    if (decksList.length === 0) {
        return <h4>No decks! Click Create Deck to make one!</h4>

    }
        return <p> Loading...</p>
    };

        export default DeckList;
