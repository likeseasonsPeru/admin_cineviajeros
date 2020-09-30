import React, { useState, Fragment, useContext } from 'react';
import Header from '../../components/header';
import { UserContext } from '../../utils/context';

const Peliculas = () => {

  const {token} = useContext(UserContext);


  return (
    <Fragment>
      <Header />
      {token}
    </Fragment>
  )

}

export default Peliculas;