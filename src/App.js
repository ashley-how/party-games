import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Header from './components/header/header';
import Home from './pages/home/home';
import Admin from './pages/admin/admin';
import DontDoItGame from './pages/dontDoItGame/dontDoItGame';
import GuessMeGame from './pages/guessMeGame/guessMeGame';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dontDoItGame' component={DontDoItGame} />
            <Route path='/guessMeGame' component={GuessMeGame} />
            <Route path='/admin' component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
