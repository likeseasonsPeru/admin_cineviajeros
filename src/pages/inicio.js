import React, {useState, Fragment, useContext} from 'react';
import {login} from '../endpoints/index';
import {UserContext} from '../utils/context';

const Login = () => {
  
  const {token, setToken} = useContext(UserContext); 

    const [datos, setDatos] = useState({
      email: '',
      password: ''
    })

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
          const res =  await login(datos.email, datos.password);
          if (res.token){
            setToken(res.token);
            window.location.href = '/peliculas';
          } else {
            // Contraseña o email erroneos
            console.log('Crendenciales incorrectas')
          }
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