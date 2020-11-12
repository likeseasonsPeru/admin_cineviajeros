import React, { Fragment, useState, useEffect } from 'react';
import {getPeliculas} from '../../endpoints'
import TableData from '../../components/TableData';
import {CButton} from '@coreui/react'
import {useHistory} from 'react-router-dom'
const Peliculas = () => {
  const [peliculas, setPeliculas] = useState(null)
  const settingPeliculas = async () => {
    const data = await getPeliculas();
    if(data){
      data.forEach(pelicula => {
        if(pelicula.category === 'proxima'){
          pelicula.category = 'Próxima Película'
        }else if(pelicula.category === 'inactive'){
          pelicula.category = 'Película Inactiva'
        }else if(pelicula.category === 'semanal'){
          pelicula.category = 'Película Semanal'
        }
      })
      setPeliculas(data)
    }
  }
  const getBadge = category => {
    switch (category) {
      case 'Próxima Película': return 'primary'
      case 'Película Inactiva': return 'danger'
      case 'Película Semanal': return 'secondary'
      default: return 'primary'
    }
  }
  const history = useHistory();
  const goTo = () => {
    history.push("/peliculas/add");
  }

  useEffect(() => {
    settingPeliculas();
  }, [])
  return (
    <Fragment>
     {
       peliculas ? (
         <Fragment>
          <div className="col-12 text-right">
            <CButton 
              color="success" 
              className="mb-3"
              onClick={() => goTo()}
            >
              + Agregar una película
            </CButton>
          </div>
          <TableData
            titleTable='Películas'
            items={peliculas}
            fields={
              [
                { key: 'title', _classes: 'font-weight-bold text-center', label: 'Título' },
                {key:'duration', _classes: 'text-center', label : 'Duración'}, 
                {key:'precio_min', _classes: 'text-center', label: 'Precio Mínimo'},
                {key:'category', _classes: 'text-center', label: 'Categoría'}
              ]
            }
            itemsPerPage={10}
            scopedSlots={
              {
                'category':
                  (item)=>(
                    <td style={{textAlign: 'center'}}>
                      <CButton 
                      color={getBadge(item.category)}
                      size={'sm'}
                      >
                        {item.category}
                      </CButton>
                    </td>
                  )
              }
            }
            linkPage={'peliculas'}
          />
         </Fragment>
       ) : null
     }
    </Fragment>
  )

}

export default Peliculas;