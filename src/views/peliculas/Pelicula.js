import React, { Fragment, useState, useEffect } from 'react';
import {getPelicula} from '../../endpoints'
import useInputForm from '../../components/useInputForm';
const Pelicula = ({match}) => {
  const [peliculaId] = useState(match.params.id || null)
  const [showInputs, setShowInputs] = useState(false)
  const [titlePelicula, titleInput, setTitleMovie] = useInputForm(
                                               { type: "text", 
                                                 placeholder: 'Ingrese el título', 
                                                 name:'title', 
                                                 label: 'Título' 
                                               });
  const [translatePelicula, translateInput, setTranslateMovie] = useInputForm(
                                               { type: "text", 
                                                 placeholder: 'Ingrese el título traducido', 
                                                 name:'translate', 
                                                 label: 'Título traducido' 
                                               });
  useEffect( () => {
    const getUser = async () => {
      const data = await getPelicula(peliculaId);
      if(data.status === 'ok'){
        setShowInputs(true)
        setTitleMovie(data.data.title)
        setTranslateMovie(data.data.translate)
      }
    }
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peliculaId])

  const sendPelicula = () => {
    const data = {
      title: titlePelicula,
      translate: translatePelicula
    }
    console.log('sendPelicula->data', data);
  }

  return (
    <Fragment>
      {showInputs ? titleInput : null}
      {showInputs ? translateInput : null}
      <button onClick={() => sendPelicula()}>
        sendPelicula
      </button>
    </Fragment>
  )

}

export default Pelicula;