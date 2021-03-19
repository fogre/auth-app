import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AppState } from './utils/StateProvider'
import LoginScreen from './components/LoginScreen'
import GeneralError from './components/GeneralError'
import GithubLogin from './components/GithubLogin'
import NavBar from './components/NavBar'
import UserScreen from './components/UserScreen'

const App = () => {
  const { user } = useContext(AppState)

  return (
    <React.Fragment>
      {user
        ? <NavBar user={user}/>
        : null
      }
      <GeneralError />
      <Switch>
        <Route path='/users/:id'>
          <UserScreen user={user} edit={false} />
        </Route>
        <Route path='/edit'>
          {user
            ? <UserScreen user={user} edit={true} />
            : <LoginScreen register={false} />
          }
        </Route>
        <Route path='/login'>
          <LoginScreen />
        </Route>
        <Route path='/github'>
          <GithubLogin />
        </Route>
        <Route path='/register'>
          <LoginScreen register={true} />
        </Route>
        <Route path='/'>
          {user
            ? <UserScreen user={user} edit={false} />
            : <LoginScreen register={false}/>
          }
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App