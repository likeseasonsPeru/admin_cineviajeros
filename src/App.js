import React from 'react';
import Login from './pages/login'

import { Route, BrowserRouter as Router, Switch, Redirect,HashRouter } from "react-router-dom";
import { useSelector } from 'react-redux';

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const Navigation = () => {

  const user = useSelector(state => state.authentication);
  return (
    <HashRouter>
    <React.Suspense fallback={loading}>
      <Switch>
        <Route exact path="/login" name="Login" render={props => <Login {...props}/>}>
          {user.auth ? (<Redirect to="/peliculas" />) : (<Login />)}
        </Route>
        <Route path="/" name="Inicio" render={props => <TheLayout {...props}/>}>
          {!user.auth ? (<Login />) : null}
        </Route>
      </Switch>
    </React.Suspense>
  </HashRouter>
  )
}


const App = () => {
  return (
      <Router>
        <Navigation />
      </Router>    
  );
}

export default App;
