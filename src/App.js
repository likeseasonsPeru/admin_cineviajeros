import React, { useState, useContext, useEffect } from 'react';
import Inicio from './pages/inicio'
import UserProvider, { UserContext } from './utils/context';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from './components/header';
import peliculas from './pages/peliculas/index';
import combos from './pages/combos';
import promociones from './pages/promociones';


const Navigation = () => {
  const [loged, setLoged] = useState(false);
  const { token } = useContext(UserContext);
  return (

    <Switch>
      <Route exact path="/login" /* component={Inicio} */ >
        {loged ? (<Redirect to="/peliculas" />) : (<Inicio />)}
      </Route>
      <Route path="/peliculas" component={peliculas} />
      <Route path="/pelicula/:id" />
      <Route path="/combos" component={combos} />
      <Route path="/combo/:id" />
      <Route path="/promociones" component={promociones} />
      <Route path="/promocione/:id" />
      <Route path="/banners" />
      <Route path="/banner/:id" />
    </Switch>
  )
}


const App = () => {

  /* useEffect(() => {
    if (token) {
      setLoged(true);
    }
  }, [token]) */

  const verifyHome = () => {
    const currentLocation = window.location.pathname;
    return currentLocation === '/login';
  }

  return (
    <Router>
      <UserProvider>
        {!verifyHome() && <Header />}
        <Navigation />
      </UserProvider>
    </Router>

  );
}

export default App;
