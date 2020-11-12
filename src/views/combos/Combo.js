import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import {
  getCombo,
  deleteCombo,
  editCombo
} from '../../endpoints'

import useInputForm from '../../components/useInputForm';
import useTextAreaForm from '../../components/useTextAreaForm';
import useImageFieldForm from '../../components/useImageFieldForm';

import {
  useHistory
} from 'react-router-dom';
import {
  useSelector
} from 'react-redux'
import {
  API_URL
} from '../../utils/config';
import {
  CButton,
  CRow
} from '@coreui/react';

const Combo = ({
    match
  }) => {
    const [comboId] = useState(match.params.id || null)
    const [showInputs, setShowInputs] = useState(false)
    const user = useSelector(state => state.authentication);
    const [imageCombo, imageInputCombo, setImageCombo] = useImageFieldForm({
      placeholder: 'Ingrese la imagen del combo',
      name: 'image',
      label: 'Imagen del combo:',
      medida: 'Medida recomendada: 600x600px'
    });
    const [titleCombo, titleInput, setTitleCombo] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el nombre del combo',
      name: 'title',
      label: 'Nombre del Combo:'
    });
    const [precioCombo, precioInput, setPrecioCombo] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el precio del combo',
      name: 'precio',
      label: 'Precio(en soles):'
    });
    const [descriptionCombo, descriptionInput, setDescriptionCombo] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del combo',
      name: 'description',
      label: 'Descripción:'
    });
    const [legalCombo, legalInput, setLegalCombo] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese el legal del combo',
      name: 'legal',
      label: 'Legal:'
    });

    let history = useHistory();
    const goBack = () => {
      history.push("/combos");
    }

    useEffect(() => {
      const getComboMovies = async () => {
        const data = await getCombo(comboId);
        if (data.status === 'ok') {
          setShowInputs(true);
          const urlFromAPI = `${API_URL}${data.data.img}`;
          setImageCombo(urlFromAPI)
          setTitleCombo(data.data.title)
          setPrecioCombo(data.data.precio)
          // eslint-disable-next-line no-useless-escape
          var regex = /<br\s*[\/]?>/gi;
          setDescriptionCombo(data.data.description.replace(regex, "\n"))
          setLegalCombo(data.data.legal.replace(regex, "\n"))

        }
      }
      getComboMovies();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comboId])

    const sendCombo = async () => {
      setShowInputs(false)
      const data = {
        title: titleCombo,
        image: imageCombo,
        description: descriptionCombo.replace(/(\r\n|\n)/g, "<br />"),
        precio: precioCombo,
        comosion: '0',
        legal: legalCombo.replace(/(\r\n|\n)/g, "<br />")
      }
      try {
        const response = await editCombo(user.token, comboId, data)
        if (response.status === 'ok') {
          history.go(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteComboMovies = async () => {
      setShowInputs(false)
      try {
        const response = await deleteCombo(user.token, comboId)
        if (response.status === 'ok') {
          history.push("/combos");
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Fragment>
      {
        showInputs ? 
        <CRow>
          <div className="col-12 col-md-5 col-lg-4">
            {imageInputCombo}
          </div>
          <div className="col-12 col-md-7 col-lg-8">
           {titleInput}
           {precioInput}
           {descriptionInput}
           {legalInput}
           
          </div>
          <div className="col-12 text-right">
            <CButton
              color="primary"
              onClick={() => sendCombo()}
              className="mb-3 mr-2"
              >
              Guardar cambios
            </CButton>
            <CButton
              color="danger"
              onClick={() => deleteComboMovies()}
              className="mb-3 mr-2"
              >
              Eliminar promoción
            </CButton>
            <CButton
              color="dark"
              onClick={() => goBack()}
              className="mb-3 mr-2"
              >
              Volver
            </CButton>
          </div>
        </CRow> 
        : 
        <div className='col text-center'>
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      }
      
    </Fragment>
  )

}

export default Combo;