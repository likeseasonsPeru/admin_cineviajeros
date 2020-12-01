import React, { Fragment, useEffect, useState } from 'react';
import {getBanners} from '../../endpoints'
import {API_URL} from '../../utils/config'
import TableData from '../../components/TableData';
import {CButton,CImg} from '@coreui/react';
import {useHistory} from 'react-router-dom'
import ExportToExcel from '../../utils/jsonToExcel';
const Banners = () => {
  const [banners, setBanners] = useState(null)
  const settingBanners = async () => {
    const data = await getBanners();
    if(data){
      setBanners(data)
    }
  }
  const getBadge = status => {
    switch (status) {
      case 1 : return 'success'
      case 0 : return 'danger'
      default: return 'primary'
    }
  }
  useEffect(() => {
    settingBanners();
  }, [])
  const history = useHistory();
  const goTo = () => {
    history.push("/banners/add");
  }
  return (
    <Fragment>
      <Fragment>
      <div className="col-12 text-right">
            <CButton 
              color="success" 
              className="mb-3"
              onClick={() => goTo()}
            >
              + Agregar un banner
          </CButton>
      </div>
     {
       banners ? (
         <TableData
          titleTable='Banners'
          items={banners}
          fields={
            [
              { key: 'title', _classes: 'font-weight-bold text-center', label: 'Título' },
              { key: 'img', classes: 'text-center',_style: { textAlign: 'center'}, label: 'Imagen' },
              { key: 'created_at', _classes: 'text-center', label: 'Fecha de creación' },
              { key: 'actived', _classes: 'text-center', label: 'Estado' },
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
                      width={80}
                      align={'center'}
                    />
                  </td>
                ), 
              'actived': (item)=>(
                <td style={{textAlign : 'center'}}>
                  <CButton 
                    color={getBadge(item.actived)}
                    size={'sm'}
                    style={{maxWidth : '100px'}}
                  >
                    {item.actived === 1 ? 'Activo' : 'Inactivo'}
                  </CButton>
                </td>
              ),
              'created_at': (item)=>(
                <td style={{textAlign : 'center'}}>
                  {new Date(item.created_at).toLocaleString('es-PE')}
                </td>
              ),
            }
          }
          linkPage={'banners'}
          
         />
       ) : null
     }
    </Fragment>
    </Fragment>
  )

}

export default Banners;