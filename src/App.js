import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        Hey bro
      </Route>
      <Route exact path="/about">
        Hello ABOUT
      </Route>
      <Route>404 ERROR Page</Route>
    </Switch>
  );
}

export default App;
