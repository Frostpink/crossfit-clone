import React from 'react'
import { Container } from 'components/styled/Container'
import { Route, BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import AthleteList from 'components/athletes'
import Navbar from 'components/navbar'
import './App.css'

export default function App() {
  return (

    <Router>
      
      <Navbar />

      <Switch>
        <Container>

          <Route path='/' exact>Home</Route>

          <Route path='/athletes' exact component={AthleteList} />

        </Container>
      </Switch>

    </Router>
    
  )
}
