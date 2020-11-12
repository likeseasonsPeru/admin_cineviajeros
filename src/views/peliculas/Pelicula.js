import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import {
  getPelicula,
  editPelicula,
  deletePelicula
} from '../../endpoints'
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
  API_URL,
  CATEGORIES_SELECT
} from '../../utils/config';
import {
  CButton,
  CRow
} from '@coreui/react';

const Pelicula = ({
    match
  }) => {
    const [peliculaId] = useState(match.params.id || null)
    const [horariosPelicula, setHorariosPelicula] = useState(null)
    const [showInputs, setShowInputs] = useState(false)
    const user = useSelector(state => state.authentication);
    let history = useHistory();
    const goBack = () => {
      history.push("/peliculas");
    }
    const [imagePelicula, imageInput, setImageMovie] = useImageFieldForm({
      placeholder: 'Ingrese la película',
      name: 'image',
      label: 'Imagen de la película:',
      medida: 'Medida recomendada: 220x330px'
    });
    const [titlePelicula, titleInput, setTitleMovie] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título',
      name: 'title',
      label: 'Título:'
    });
    const [translatePelicula, translateInput, setTranslateMovie] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el título traducido',
      name: 'translate',
      label: 'Título traducido:'
    });
    const [descriptionPelicula, descriptionInput, setDescriptionMovie] = useTextAreaForm({
      type: "text",
      placeholder: 'Ingrese la descripción de la película',
      name: 'description',
      label: 'Descripción:'
    });
    const [urlTrailerPelicula, urlTrailerInput, setUrlTrailerMovie] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la url del trailer',
      name: 'url_trailer',
      label: 'URL del Trailer:'
    });
    const [durationPelicula, durationInput, setDurationMovie] = useInputForm({
      type: "text",
      placeholder: 'Ingrese la duración de la película',
      name: 'duration',
      label: 'Duración de la Película:'
    });
    const [minPricePelicula, minPriceInput, setMinPriceMovie] = useInputForm({
      type: "text",
      placeholder: 'Ingrese el precio mínimo',
      name: 'precio_min',
      label: 'Precio mínimo (soles):'
    });
    const [categoryPelicula, categoryInput, setCategoryMovie] = useSelectForm({
      name: 'category',
      label: 'Categoría:',
      optionsSelect: CATEGORIES_SELECT,
      placeholder: 'Seleccione una categoría'
    });
    useEffect(() => {
      const getUser = async () => {
        const data = await getPelicula(peliculaId);
        if (data.status === 'ok') {
          setShowInputs(true)
          setTitleMovie(data.data.title)
          setTranslateMovie(data.data.translate)
          setDescriptionMovie(data.data.description)
          setUrlTrailerMovie(data.data.url_trailer)
          setDurationMovie(data.data.duration)
          setMinPriceMovie(data.data.precio_min)
          const urlFromAPI = `${API_URL}${data.data.img}`;
          setImageMovie(urlFromAPI)
          const categoryDefault = CATEGORIES_SELECT.filter(category => category.value === data.data.category)
          setCategoryMovie(categoryDefault[0])
          setHorariosPelicula(data.data.horario)
        }
      }
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [peliculaId])

    const sendPelicula = async () => {
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
        const response = await editPelicula(user.token, peliculaId, data)
        if (response.status === 'ok') {
          history.go(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteMovie = async () => {
      setShowInputs(false)
      try {
        const response = await deletePelicula(user.token, peliculaId)
        if (response.status === 'ok') {
          history.push("/peliculas");
        }
      } catch (error) {
        console.log(error)
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
        label: 'Acción'
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
                  peliculaId={peliculaId}
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
              Guardar cambios
            </CButton>
            <CButton
              color="danger"
              onClick={() => deleteMovie()}
              className="mb-3 mr-2"
              >
              Eliminar película
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
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      
    </Fragment>
  )

}

export default Pelicula;