import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import {
  getBanner,
  editBanner,
  deleteBanner
} from '../../endpoints'

import useInputForm from '../../components/useInputForm';
import useTextAreaForm from '../../components/useTextAreaForm';
import useImageFieldForm from '../../components/useImageFieldForm';
import useSelectForm from '../../components/useSelectForm';

import {
  useHistory
} from 'react-router-dom';
import {
  useSelector
} from 'react-redux'
import {
  API_URL,
  STATE_BANNER
} from '../../utils/config';
import {
  CButton,
  CRow
} from '@coreui/react';

const Banner = ({
    match
  }) => {
    const [bannerId] = useState(match.params.id || null)
    const [showInputs, setShowInputs] = useState(false)
    const user = useSelector(state => state.authentication);
    const [imageBanner, imageInputBanner, setImageBanner] = useImageFieldForm({
      placeholder: 'Ingrese el banner',
      name: 'image',
      label: 'Imagen del Banner:',
      medida: 'Medida recomendada: 1600x450px'
    });
    const [titleBanner, titleInput, setTitleBanner] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título',
      name: 'title',
      label: 'Título:'
    });
    const [descriptionBanner, descriptionInput, setDescriptionBanner] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del banner',
      name: 'description',
      label: 'Descripción:'
    });
    const [urlImgBanner, urlImgInput, setUrlImgBanner] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url del imágen',
      name: 'url_imagen',
      label: 'URL del Imágen:'
    });
    const [urlTrailerBanner, urlTrailerInput, setUrlTrailerBanner] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url del trailer',
      name: 'url_trailer',
      label: 'URL del Trailer:'
    });
    const [urlCompraBanner, urlCompraInput, setUrlCompraBanner] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url de compra',
      name: 'url_trailer',
      label: 'URL de Compra:'
    });
    const [stateBanner, stateInput, setStateBanner] = useSelectForm({
      name: 'actived',
      label: 'Estado:',
      optionsSelect: STATE_BANNER,
      placeholder: 'Seleccione una categoría'
    });
    let history = useHistory();
    const goBack = () => {
      history.push("/banners");
    }

    useEffect(() => {
      const getPoster = async () => {
        const data = await getBanner(bannerId);
        if (data.status === 'ok') {
          setShowInputs(true);
          const urlFromAPI = `${API_URL}${data.data.img}`;
          setImageBanner(urlFromAPI)
          setTitleBanner(data.data.title)
          setDescriptionBanner(data.data.description)
          setUrlImgBanner(data.data.url_imagen)
          setUrlTrailerBanner(data.data.url_trailer)
          setUrlCompraBanner(data.data.url_compra)
          const estadoDefault = STATE_BANNER.filter(estado => estado.value === data.data.actived)
          setStateBanner(estadoDefault[0])
        }
      }
      getPoster();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bannerId])

    const sendBanner = async () => {
      setShowInputs(false)
      const data = {
        title: titleBanner,
        image: imageBanner,
        description: descriptionBanner,
        url_imagen: urlImgBanner,
        url_compra: urlCompraBanner,
        url_trailer: urlTrailerBanner,
        actived: stateBanner.value
      }
      try {
        const response = await editBanner(user.token, bannerId, data)
        if (response.status === 'ok') {
          history.go(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deletePoster = async () => {
      setShowInputs(false)
      try {
        const response = await deleteBanner(user.token, bannerId)
        if (response.status === 'ok') {
          history.push("/banners");
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
            {imageInputBanner}
          </div>
          <div className="col-12 col-md-7 col-lg-8">
           {titleInput}
           {descriptionInput}
           {urlImgInput}
           {urlTrailerInput}
           {urlCompraInput}
           {stateInput}
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
              color="danger"
              onClick={() => deletePoster()}
              className="mb-3 mr-2"
              >
              Eliminar banner
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