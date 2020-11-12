import React, {
  Fragment,
  useState
} from 'react';
import {
  createPromotion
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

const Promocion = () => {
    const [showInputs, setShowInputs] = useState(true)
    const user = useSelector(state => state.authentication);
    const [imagePromotion, imageInputPromotion] = useImageFieldForm({
      placeholder: 'Ingrese la imagen de promoción',
      name: 'image',
      label: 'Imagen de la promoción:',
      medida: 'Medida recomendada: 600x600px'
    });
    const [titlePromotion, titleInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título de la promoción',
      name: 'title',
      label: 'Título:'
    });
    const [descriptionPromotion, descriptionInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del promoción',
      name: 'description',
      label: 'Descripción:'
    });
    const [legalPromotion, legalInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese el legal de la promoción',
      name: 'legal',
      label: 'Legal:'
    });
    const [urlCompraPromotion, urlCompraInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url de compra',
      name: 'url',
      label: 'URL de la promoción:'
    });

    let history = useHistory();
    const goBack = () => {
      history.push("/promociones");
    }

    const sendPromotion = async () => {
      if (titlePromotion && imagePromotion && descriptionPromotion && urlCompraPromotion && legalPromotion) {
        setShowInputs(false)
        const data = {
          title: titlePromotion,
          image: imagePromotion,
          description: `${descriptionPromotion.replace(/(\r\n|\n)/g, "<br />")}`,
          url: urlCompraPromotion,
          precio: "0",
          legal: `${legalPromotion.replace(/(\r\n|\n)/g, "<br />")}`
        }
        try {

          const response = await createPromotion(user.token, data)
          if (response.status === 'ok') {
            history.push("/promociones");
          }

        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Complete todos los campos');
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
                Crear promoción
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