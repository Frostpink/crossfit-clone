import React from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import AthleteList from 'components/athletes'
import Navbarr from 'components/navbar'
import AthleteInfo from 'components/athlete-info'

// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss'

export default function App() {
  return (

    <Router>
      
      <Navbarr />

      <Switch>

          <Route path='/' exact>Home</Route>

          <Route path='/athletes' exact component={AthleteList} />

          <Route path='/athletes/:id' exact component={AthleteInfo} />

      </Switch>

    </Router>
    
  )
}
