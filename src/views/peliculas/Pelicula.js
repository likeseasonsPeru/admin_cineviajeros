import React, { Fragment } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deauthenticate } from '../../redux/actions/authActions';


const Pelicula = () => {

  const user = useSelector(state => state.authentication);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <p>
        El token almacenado es {user.token}
      </p>
      <button onClick={()=> dispatch(deauthenticate())}>
        Salir
      </button>
      
    </Fragment>
  )

}

export default Pelicula;