import React, { Fragment, useEffect, useState } from 'react';
import {getCombos} from '../../endpoints'
import TableData from '../../components/TableData';
import {CImg,CButton} from '@coreui/react'
import {API_URL} from '../../utils/config'
import {useHistory} from 'react-router-dom'
const Combos = () => {
  const [combos, setCombos] = useState(null)
  const settingCombos = async () => {
    const data = await getCombos();
    if(data){
      setCombos(data)
    }
  }

  useEffect(() => {
    settingCombos();
  }, [])

  const history = useHistory();
  const goTo = () => {
    history.push("/combos/add");
  }
  return (
    <Fragment>
    <div className="col-12 text-right">
            <CButton 
              color="success" 
              className="mb-3"
              onClick={() => goTo()}
            >
              + Agregar un combo
          </CButton>
      </div>
      {
       combos ? (
         <TableData
          titleTable='Combos'
          items={combos}
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
          linkPage={'combos'}
         />
       ) : null
     }
    </Fragment>
  )

}

export default Combos;