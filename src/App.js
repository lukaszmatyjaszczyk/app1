import React from 'react';
import './css/App.css';
import Menu from './Menu/Menu';
import Home from './Home/Home';
import About from './About/About';
import NoMatchPage from './NoMatchPage/NoMatchPage';
import logo from './monogo_logo.png';
import {BrowserRouter,Route, Redirect, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <header className="top full">
          <div className="container">
            <img src={logo} alt="Logo" />
            <Menu className="topMenu"/>
          </div>
       </header>
      <section className="full contentSection">
        <div className="container">
           <Switch>
              <Route exact path="/" render={() => ( <Redirect to="/home/"/> )}/>
              <Route exact   path="/home/:page?" component={Home} />
              <Route exact path="/about-us/" component={About} />
              <Route path="/404" component={NoMatchPage} />
               <Redirect to="/404" /> 
            </Switch>
         </div>
       </section>
       </BrowserRouter>
     </div> 
  );
}

export default App;
