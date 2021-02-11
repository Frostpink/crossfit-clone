import React from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import AthleteList from 'components/athletes'
import CompetitionList from 'components/competitions'
import Navbarr from 'components/navbar'
import AthleteInfo from 'components/athlete-info'
import CompetitionInfo from 'components/competition-info'

// import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss'

export default function App() {
  return (

    <Router>
      
      <Navbarr />

      <Switch>

          <Route path='/' exact>Home</Route>

          <Route path='/athletes' exact component={AthleteList} />
          <Route path='/competitions' exact component={CompetitionList} />

          <Route path='/athletes/:id' exact component={AthleteInfo} />
          <Route path='/competitions/:id' exact component={CompetitionInfo} />

      </Switch>

    </Router>
    
  )
}
