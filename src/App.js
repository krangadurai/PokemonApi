import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListingPage from './components/ListingPage';
import DetailsPage from './components/DetailsPage';
import BookmarksScreen from './components/BookmarksScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListingPage} />
        <Route path="/details/:pokemonId" component={DetailsPage} />
        <Route path="/bookmarks" component={BookmarksScreen} />
      </Switch>
    </Router>
  );
};

export default App;
