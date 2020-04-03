import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Tasks from './components/Tasks'
import Data from './components/Data'
import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Tasks} />
      <Route path='/data' component={Data} />
    </Switch>
  )
}

export default App
