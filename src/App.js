import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Admin from './pages/admin/admin';
import DontDoItGame from './pages/dontDoItGame/dontDoItGame';
import WhoAmIGame from './pages/whoAmIGame/whoAmIGame';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/dontDoItGame' component={DontDoItGame} />
            <Route path='/whoAmIGame' component={WhoAmIGame} />
            <Route path='/admin' component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
