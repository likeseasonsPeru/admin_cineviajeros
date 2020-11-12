import React, {
  Fragment,
  useState
} from 'react';
import {
  createBanner
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
  CButton,
  CRow
} from '@coreui/react';

const Banner = ({
    match
  }) => {
    const [showInputs, setShowInputs] = useState(true)
    const user = useSelector(state => state.authentication);
    const [imageBanner, imageInputBanner] = useImageFieldForm({
      placeholder: 'Ingrese el banner',
      name: 'image',
      label: 'Imagen del Banner:',
      medida: 'Medida recomendada: 1600x450px'
    });
    const [titleBanner, titleInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título',
      name: 'title',
      label: 'Título:'
    });
    const [descriptionBanner, descriptionInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del banner',
      name: 'description',
      label: 'Descripción:'
    });
    const [urlTrailerBanner, urlTrailerInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url del trailer',
      name: 'url_trailer',
      label: 'URL del Trailer:'
    });
    const [urlCompraBanner, urlCompraInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url de compra',
      name: 'url_trailer',
      label: 'URL de Compra:'
    });
    let history = useHistory();
    const goBack = () => {
      history.push("/banners");
    }

    const sendBanner = async () => {
      if (titleBanner && imageBanner && descriptionBanner && urlTrailerBanner) {
        const data = {
          title: titleBanner,
          image: imageBanner,
          description: descriptionBanner,
          url_compra: urlCompraBanner,
          url_trailer: urlTrailerBanner
        }
        try {

          setShowInputs(false)
          const response = await createBanner(user.token, data)
          if (response.status === 'ok') {
            history.push('/banners')
          }

        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Completa todos los campos')
      }
    }


  return (
    <Fragment>
      {
        showInputs ? 
        <CRow>
          <div className="col-12 col-md-5 col-lg-4">
            {imageInputBanner}
          </div>
          <div className="col-12 col-md-7 col-lg-8">
           {titleInput}
           {descriptionInput}
           {urlTrailerInput}
           {urlCompraInput}
          </div>
          <div className="col-12 text-right">
            <CButton
              color="primary"
              onClick={() => sendBanner()}
              className="mb-3 mr-2"
              >
              Guardar cambios
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

export default Banner;