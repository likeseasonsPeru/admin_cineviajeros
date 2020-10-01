import React, { useState, Fragment, useContext } from 'react';
import Header from '../../components/header';
import {useSelector} from 'react-redux';


const Peliculas = () => {

  const user = useSelector(state => state.authentication);
  console.log(user);

  return (
    <Fragment>
      <p>
        El token almacenado es {user.token}
      </p>
      
    </Fragment>
  )

}

export default Peliculas;