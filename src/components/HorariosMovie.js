import {
    CButton
} from '@coreui/react';
import React from 'react'
import EditHorarioModal from './EditHorarioModal';
import AddHorarioModal from './AddHorarioModal';
import {
    deleteHorario
} from '../endpoints'
import {
    useSelector
} from 'react-redux'
import {
    useHistory
} from 'react-router-dom';
const HorariosMovies = ({
        titles,
        horarios,
        peliculaId
    }) => {

        const [modal, handleShow, setHorario] = EditHorarioModal();
        const user = useSelector(state => state.authentication);
        const [modalAdd, handleAddShow] = AddHorarioModal(peliculaId);
        const openModal = (horario) => {
            setHorario(horario);
            handleShow();
        }
        let history = useHistory();

        const deleteAccionHorario = async (id) => {
            console.log("HorariosMovies -> id", id)
            try {
                const response = await deleteHorario(user.token, id)
                if (response.status === 'ok') {
                    history.go(0);
                }
            } catch (error) {
                console.log(error);
            }
        }
    return(
        <React.Fragment>
        <div className="col-12 text-right">
            <CButton 
              color="info"
              size='sm' 
              className="mb-3"
              onClick={() => handleAddShow()}
            >
              + Agregar un horario
          </CButton>
      </div>
            <div className="table-responsive mb-5">
                <table className="table text-center table-hover">
                <thead>
                    <tr key={Math.random()}>
                    {
                        titles ? 
                        titles.map((title) =>  
                            <th key={Math.random()}
                                scope="col"
                            >
                                {title.label}
                            </th>
                        ) : null
                    }
                    </tr>   
                </thead>
                <tbody>
                        {
                            horarios && horarios.length ? 
                            horarios.map((horario,index) => 
                             (
                                <tr>
                                    <th scope="row" key={Math.random()}>{index + 1}</th>
                                        <td>{horario.fecha}</td>
                                        <td>{horario.day}</td>
                                        <td>{horario.hora}</td>
                                        <td>
                                            <CButton 
                                                variant='outline'
                                                size='sm'
                                                color='primary'
                                                onClick={() => openModal(horario)}>
                                                Editar
                                            </CButton>
                                        </td>
                                        <td>
                                            <CButton 
                                                variant='outline'
                                                size='sm'
                                                color='danger'
                                                onClick={() => deleteAccionHorario(horario.id)}>
                                                Eliminar
                                            </CButton>
                                        </td>
                                        <td>{new Date(horario.created_at).toLocaleString('es-PE')}</td>
                                </tr>
                             )
                            ) : null 
                        }
                </tbody>
                </table>
            </div>
            {modal}
            {modalAdd}
        </React.Fragment>
    )
}

export default HorariosMovies;