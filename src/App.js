import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home/';
import Movements from './pages/Movements';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path='/' exact component={Home}/>
        <Route path='/movement/:id' exact component={Movements}/>
      </div>
    </Router>
  );
}

export default App;
