import React, {useState, Fragment, useContext} from 'react';
import {login} from '../endpoints/index';
import {useSelector, useDispatch} from 'react-redux';
import {authenticate} from '../redux/actions/authActions'

const Login = () => {

    const [datos, setDatos] = useState({
      email: '',
      password: ''
    })

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication);

    const handleInputChange = (event) => {
      setDatos({
        ...datos,
        [event.target.name] : event.target.value
      })
    }

    const enviarDatos = async (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.email + ' ' + datos.password)
        try {
          dispatch(authenticate(datos.email, datos.password));
          console.log(user);
        }catch (err) {
          console.log(err);
        }

    }

  return (
    <Fragment>
      <div className='container'>
      <form className="row forminicio" onSubmit={enviarDatos}>
        <div className="col-md-6">
          <input 
            type="text" 
            placeholder="Email" 
            className="form-control" 
            onChange={handleInputChange} 
            name="email" />
        </div>
        <div className="col-md-6">
          <input 
            type="text" 
            placeholder="Contraseña" 
            className="form-control" 
            onChange={handleInputChange} 
            name="password" />
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
      </div>
    </Fragment>  
  );
}

export default Login;