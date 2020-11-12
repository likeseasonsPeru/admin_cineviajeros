import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import {
  getPromotion,
  editPromotion,
  deletePromotion
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

const Promocion = ({
    match
  }) => {
    const [promotionId] = useState(match.params.id || null)
    const [showInputs, setShowInputs] = useState(false)
    const user = useSelector(state => state.authentication);
    const [imagePromotion, imageInputPromotion, setImagePromotion] = useImageFieldForm({
      placeholder: 'Ingrese la imagen de promoción',
      name: 'image',
      label: 'Imagen de la promoción:',
      medida: 'Medida recomendada: 600x600px'
    });
    const [titlePromotion, titleInput, setTitlePromotion] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título de la promoción',
      name: 'title',
      label: 'Título:'
    });
    const [descriptionPromotion, descriptionInput, setDescriptionPromotion] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del promoción',
      name: 'description',
      label: 'Descripción:'
    });
    const [legalPromotion, legalInput, setLegalPromotion] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese el legal de la promoción',
      name: 'legal',
      label: 'Legal:'
    });
    const [urlCompraPromotion, urlCompraInput, setUrlCompraPromotion] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url de compra',
      name: 'url_trailer',
      label: 'URL de la promoción:'
    });

    let history = useHistory();
    const goBack = () => {
      history.push("/banners");
    }

    useEffect(() => {
      const getPromocion = async () => {
        const data = await getPromotion(promotionId);
        if (data.status === 'ok') {
          setShowInputs(true);
          const urlFromAPI = `${API_URL}${data.data.img}`;
          setImagePromotion(urlFromAPI)
          setTitlePromotion(data.data.title)
          // eslint-disable-next-line no-useless-escape
          var regex = /<br\s*[\/]?>/gi;
          setDescriptionPromotion(data.data.description.replace(regex, "\n"))
          setLegalPromotion(data.data.legal.replace(regex, "\n"))
          setUrlCompraPromotion(data.data.url)

        }
      }
      getPromocion();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [promotionId])

    const sendPromotion = async () => {
      setShowInputs(false)
      const data = {
        title: titlePromotion,
        image: imagePromotion,
        description: descriptionPromotion.replace(/(\r\n|\n)/g, "<br />"),
        url: urlCompraPromotion,
        precio: '0',
        legal: legalPromotion.replace(/(\r\n|\n)/g, "<br />")
      }
      try {
        const response = await editPromotion(user.token, promotionId, data)
        if (response.status === 'ok') {
          history.go(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deletePromocion = async () => {
      setShowInputs(false)
      try {
        const response = await deletePromotion(user.token, promotionId)
        if (response.status === 'ok') {
          history.push("/promociones");
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
            {imageInputPromotion}
          </div>
          <div className="col-12 col-md-7 col-lg-8">
           {titleInput}
           {descriptionInput}
           {legalInput}
           {urlCompraInput}
          </div>
          <div className="col-12 text-right">
            <CButton
              color="primary"
              onClick={() => sendPromotion()}
              className="mb-3 mr-2"
              >
              Guardar cambios
            </CButton>
            <CButton
              color="danger"
              onClick={() => deletePromocion()}
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

export default Promocion;