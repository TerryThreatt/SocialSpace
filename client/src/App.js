import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Menubar from './components/MenuBar'
import Login from '../src/components/pages/Login'
import Home from '../src/components/pages/Home'
import Register from '../src/components/pages/Register'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
      <Router>
        <Container>
          <Menubar/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/login' component={Login}/>
        </Container>
      </Router>
  );
}

export default App;
