
import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {listDecks, readDeck} from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Components/Decks";
import DeckList from "../Components/DeckList";

// function to set and fetch deck data
export function getDeck(setDeck, deckId) {
  const abortController = new AbortController();
    async function getDeck() {
      const response = await readDeck(deckId, abortController.signal)
      setDeck(response)
    }
    getDeck();
  }

// function Layout: includes the Create Deck Button, DecksList, and Decks
function Layout() {
  const history = useHistory();
  const  [decksList, setDecksList] = useState([]);

  useEffect(() => { 
    const abortController = new AbortController();
    listDecks(abortController.signal)
    .then((data) => setDecksList(data))
  }, [])

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <button onClick={() => {history.push("/decks/new")
            }}>Create Deck
            </button>
            <DeckList decksList={decksList} setDecksList={setDecksList} /> 
            </Route>
            <Route path="/decks">
            <Decks setDecksList={setDecksList} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
