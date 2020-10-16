import React from 'react';

const Peliculas = React.lazy(() => import('./views/peliculas'));
const Pelicula = React.lazy(() => import('./views/peliculas/Pelicula'));
const Banners = React.lazy(() => import('./views/banners'));
const Promociones = React.lazy(() => import('./views/promociones'));
const Combos = React.lazy(() => import('./views/combos'));
const routes = [
    { path: '/', exact: true, name: 'Inicio' },
    { path: '/peliculas', exact: true,  name: 'Peliculas', component: Peliculas },
    { path: '/peliculas/:id', exact: true, name: 'Pelicula Detalle', component: Pelicula },
    { path: '/banners', exact: true,  name: 'Banners', component: Banners },
    { path: '/promociones', exact: true,  name: 'Promociones', component: Promociones },
    { path: '/combos', exact: true,  name: 'Combos', component: Combos },
  ];
  
  export default routes;