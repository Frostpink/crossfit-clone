import React from 'react'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'

import Navbarr from 'components/navbar'
import Competition from 'components/competitions'
import Athlete from 'components/athletes'

import './App.scss'

export default function App() {
  return (

    <div className='h-screen flex flex-col'>
    <Router>
      
      <Navbarr />

      <Switch>

          <Route path='/' exact>Home</Route>

          <Route path='/athletes' exact component={Athlete.List} />
          <Route path='/competitions' exact component={Competition.List} />

          <Route path='/athletes/:id' exact component={Athlete.Info} />
          <Route path='/competitions/:id' exact component={Competition.Info} />

          <Route path='/athlete/new' exact component={Athlete.Create} />

      </Switch>

    </Router>
    </div>
    
  )
}
