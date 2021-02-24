import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import LoginScreen from './components/LoginScreen'
import UserScreen from './components/UserScreen'

const App = () => {
  const [user, setUser] = useState(null)
  console.log(user)
  return (
    <Switch>
      <Route path='/users/:id'>
        <UserScreen user={user} />
      </Route>
      <Route path='/'>
        {user
          ? <UserScreen user={user}/>
          : <LoginScreen login={setUser}/>
        }
      </Route>
    </Switch>
  )
}

export default App