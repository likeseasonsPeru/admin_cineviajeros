import React, { Fragment, useEffect, useState } from 'react';
import {getPromotions} from '../../endpoints'
import TableData from '../../components/TableData';
import {CImg,CButton} from '@coreui/react'
import {API_URL} from '../../utils/config'
import {useHistory} from 'react-router-dom'
const Promociones = () => {
  const [promociones, setPromociones] = useState(null)
  const settingPromociones = async () => {
    const data = await getPromotions();
    if(data){
      setPromociones(data)
    }
  }

  useEffect(() => {
    settingPromociones();
  }, [])
  const history = useHistory();
  const goTo = () => {
    history.push("/promociones/add");
  }
  return (
    <Fragment>
    <div className="col-12 text-right">
            <CButton 
              color="success" 
              className="mb-3"
              onClick={() => goTo()}
            >
              + Agregar una promoción
          </CButton>
      </div>
      {
        
       promociones ? (
         <TableData
          titleTable='Promociones'
          items={promociones}
          fields={
            [
              { key: 'title', _classes: 'font-weight-bold text-center', label: 'Título' },
              { key: 'img', classes: 'text-center',_style: { textAlign: 'center'}, label: 'Imagen' },
              { key: 'created_at', _classes: 'text-center', label: 'Fecha de creación' },
            ]
          }
          itemsPerPage={10}
          scopedSlots={
            {
              'img':
                (item)=>(
                  <td style={{display:'flex'}}>
                    <CImg 
                      src={`${API_URL}${item.img}`}
                      width={120}
                      align={'center'}
                    />
                  </td>
                ),
                'created_at': (item)=>(
                  <td style={{textAlign : 'center'}}>
                    {new Date(item.created_at).toLocaleString('es-PE')}
                  </td>
                ),
            }
          }
          linkPage={'promociones'}
         />
       ) : null
     }
    </Fragment>
  )

}

export default Promociones;