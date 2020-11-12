import React from 'react';

const Peliculas = React.lazy(() => import('./views/peliculas'));
const Pelicula = React.lazy(() => import('./views/peliculas/Pelicula'));
const AddPelicula = React.lazy(() => import('./views/peliculas/AddPelicula'));
const Banners = React.lazy(() => import('./views/banners'));
const Banner = React.lazy(() => import('./views/banners/Banner'));
const AddBanner = React.lazy(() => import('./views/banners/AddBanner'));
const Promociones = React.lazy(() => import('./views/promociones'));
const Promocion = React.lazy(() => import('./views/promociones/Promocion'));
const AddPromocion = React.lazy(() => import('./views/promociones/AddPromocion'));
const Combos = React.lazy(() => import('./views/combos'));
const Combo = React.lazy(() => import('./views/combos/Combo'));
const AddCombo = React.lazy(() => import('./views/combos/AddCombo'));
const routes = [
    { path: '/', exact: true, name: 'Inicio' },
    { path: '/peliculas', exact: true,  name: 'Peliculas', component: Peliculas },
    { path: '/peliculas/add', exact: true,  name: 'Agregar Película', component: AddPelicula },
    { path: '/peliculas/:id', exact: true, name: 'Pelicula Detalle', component: Pelicula },
    { path: '/banners', exact: true,  name: 'Banners', component: Banners },
    { path: '/banners/add', exact: true,  name: 'Agregar Banner', component: AddBanner },
    { path: '/banners/:id', exact: true, name: 'Banner Detalle', component: Banner },
    { path: '/promociones', exact: true,  name: 'Promociones', component: Promociones },
    { path: '/promociones/add', exact: true,  name: 'Agregar Promoción', component: AddPromocion },
    { path: '/promociones/:id', exact: true, name: 'Promoción Detalle', component: Promocion },
    { path: '/combos', exact: true,  name: 'Combos', component: Combos },
    { path: '/combos/add', exact: true,  name: 'Agregar Combo', component: AddCombo },
    { path: '/combos/:id', exact: true, name: 'Combo Detalle', component: Combo },
  ];
  
  export default routes;