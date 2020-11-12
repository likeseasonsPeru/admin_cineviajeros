import React, {
  Fragment,
  useState
} from 'react';
import useInputForm from '../../components/useInputForm';
import HorariosMovies from '../../components/HorariosMovie';
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
  CATEGORIES_SELECT
} from '../../utils/config';
import {
  CButton,
  CRow
} from '@coreui/react';
import {
  createPelicula
} from '../../endpoints'

const AddPelicula = ({
    match
  }) => {
    const [horariosPelicula] = useState({})
    const [showInputs, setShowInputs] = useState(true)
    const user = useSelector(state => state.authentication);
    let history = useHistory();
    const goBack = () => {
      history.push("/peliculas");
    }
    const [imagePelicula, imageInput] = useImageFieldForm({
      placeholder: 'Ingrese la película',
      name: 'image',
      label: 'Imagen de la película:',
      medida: 'Medida recomendada: 220x330px'
    });
    const [titlePelicula, titleInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título',
      name: 'title',
      label: 'Título:'
    });
    const [translatePelicula, translateInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título traducido',
      name: 'translate',
      label: 'Título traducido:'
    });
    const [descriptionPelicula, descriptionInput] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción de la película',
      name: 'description',
      label: 'Descripción:'
    });
    const [urlTrailerPelicula, urlTrailerInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url del trailer',
      name: 'url_trailer',
      label: 'URL del Trailer:'
    });
    const [durationPelicula, durationInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la duración de la película',
      name: 'duration',
      label: 'Duración de la Película:'
    });
    const [minPricePelicula, minPriceInput] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el precio mínimo',
      name: 'precio_min',
      label: 'Precio mínimo (soles):'
    });
    const [categoryPelicula, categoryInput] = useSelectForm({
      name: 'category',
      label: 'Categoría:',
      optionsSelect: CATEGORIES_SELECT,
      placeholder: 'Seleccione una categoría'
    });

    const sendPelicula = async () => {

      if (titlePelicula && translatePelicula && descriptionPelicula && urlTrailerPelicula && durationPelicula &&
        minPricePelicula && imagePelicula && categoryPelicula) {
        setShowInputs(false)
        const data = {
          title: titlePelicula,
          translate: translatePelicula,
          description: descriptionPelicula,
          url_trailer: urlTrailerPelicula,
          duration: durationPelicula,
          precio_min: minPricePelicula,
          image: imagePelicula,
          category: categoryPelicula.value,
        }
        try {
          const response = await createPelicula(user.token, data)
          if (response.status === 'ok') {
            history.push("/peliculas");
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        alert('Complete todos los campos')
      }
    }

    const HorariosTitles = [{
        label: 'ID'
      },
      {
        label: 'Fecha'
      },
      {
        label: 'Día de la semana'
      },
      {
        label: 'Hora'
      },
      {
        label: 'Idioma'
      },
      {
        label: 'Precio (en soles)'
      },
      {
        label: 'Fecha de Creación'
      }
    ]

  return (
    <Fragment>
      {
        showInputs ? 
        <CRow>
          <div className="col-12 col-md-5 col-lg-4">
            {imageInput}
          </div>
          <div className="col-12 col-md-7 col-lg-8">
            {titleInput}
            {translateInput}
            {descriptionInput}
            {urlTrailerInput}
            {durationInput}
            {minPriceInput}
            {categoryInput}
            <div className="col-12 np">
              <h3>
                Horarios:
              </h3>
                {
                  horariosPelicula  ? 
                  <HorariosMovies 
                  titles={HorariosTitles}
                  horarios={horariosPelicula}
                /> : 
                 <div className='col text-center'>
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
            </div>
          </div>
          <div className="col-12 text-right">
            <CButton
              color="primary"
              onClick={() => sendPelicula()}
              className="mb-3 mr-2"
              >
              Guardar
            </CButton>
            <CButton
              color="danger"
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
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      
    </Fragment>
  )

}

export default AddPelicula;