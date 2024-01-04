import { Route, Switch } from "react-router-dom";
import NotFound from "../Layout/NotFound";
import DeckStudy from "./DeckStudy";
import DeckForm from "./DeckForm";
import DeckScreen from "./DeckScreen";
import CardForm from "./CardForm";

function Decks({ setDecksList }) {
  return (
    <Switch>
      <Route exact path="/decks/new">
        <DeckForm setDecksList={setDecksList} />
      </Route>
      <Route path="/decks/:deckId">
        <Switch>
          <Route exact path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <DeckForm />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardForm />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <CardForm />
          </Route>
          <Route path="/decks/:deckId/study">
            <DeckStudy />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Decks;
