import React, { Fragment } from 'react';
import Inicio from './pages/inicio'

import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Header from './components/header';
import peliculas from './pages/peliculas/index';
import combos from './pages/combos';
import promociones from './pages/promociones';
import { Provider } from 'react-redux'
import configureStore from './redux/configStore';
import { useSelector, useDispatch } from 'react-redux';


const Navigation = () => {

  const user = useSelector(state => state.authentication);

  return (
    <Fragment>
      {user.auth && <Header />}
      <Switch>
        <Route exact path="/login" >
          {user.auth ? (<Redirect to="/peliculas" />) : (<Inicio />)}
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
    </Fragment>
  )
}


const App = () => {

  let store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <Navigation />
      </Router>
    </Provider>
    
  );
}

export default App;
