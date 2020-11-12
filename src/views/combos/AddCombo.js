import React, {
  Fragment,
  useState
} from 'react';
import {
  createCombo
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

const AddCombo = () => {
    const [showInputs, setShowInputs] = useState(true)
    const user = useSelector(state => state.authentication);
    const [imageCombo, imageInputCombo] = useImageFieldForm({
      placeholder: 'Ingrese la imagen del combo',
      name: 'image',
      label: 'Imagen del combo:',
      medida: 'Medida recomendada: 600x600px'
    });
    const [titleCombo, titleInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el nombre del combo',
      name: 'title',
      label: 'Nombre del Combo:'
    });
    const [precioCombo, precioInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el precio del combo',
      name: 'precio',
      label: 'Precio(en soles):'
    });
    const [descriptionCombo, descriptionInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción del combo',
      name: 'description',
      label: 'Descripción:'
    });
    const [legalCombo, legalInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese el legal del combo',
      name: 'legal',
      label: 'Legal:'
    });

    let history = useHistory();
    const goBack = () => {
      history.push("/combos");
    }

    const sendCombo = async () => {
      if (titleCombo && imageCombo && descriptionCombo && legalCombo && precioCombo) {
        setShowInputs(false)
        const data = {
          title: titleCombo,
          image: imageCombo,
          description: `${descriptionCombo.replace(/(\r\n|\n)/g, "<br />")}`,
          precio: precioCombo,
          comision: '0',
          legal: `${legalCombo.replace(/(\r\n|\n)/g, "<br />")}`
        }
        try {

          const response = await createCombo(user.token, data)
          if (response.status === 'ok') {
            history.push("/combos");
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
                Crear combo
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

export default AddCombo;