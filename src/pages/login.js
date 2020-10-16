import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {authenticate} from '../redux/actions/authActions'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const [datos, setDatos] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  const enviarDatos = async (event) => {
      event.preventDefault()
      try {
        dispatch(authenticate(datos.email, datos.password));
      }catch (err) {
        console.log(err);
      }

  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm="10" md="8" xl="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Inicio de Sesión</h1>
                    <p className="text-muted">Ingrese a su cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText >
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Usuario" name="email" autoComplete="username" onChange={(e) => handleInputChange(e)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Contraseña" name="password" autoComplete="password"  onChange={(e) => handleInputChange(e)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12" className="text-center">
                        <CButton color="primary" className="px-4" onClick={(event) => enviarDatos(event)}>Ingresar</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
