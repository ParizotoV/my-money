import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './elements/Header';
import Home from './pages/Home/';
import Movements from './pages/Movimentacoes';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}/>
        <Route path='/movimentacoes/:id' exact component={Movements}/>
        <Route path='/login' exact component={Login}/>
      </div>
    </Router>
  );
}

export default App;
