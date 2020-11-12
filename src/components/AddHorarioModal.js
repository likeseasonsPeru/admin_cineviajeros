import React, {
    useState
} from 'react'
import useSelectForm from './useSelectForm';
import useInputForm from './useInputForm';
import {
    useHistory
} from 'react-router-dom';
import {
    Button,
    Modal
} from 'react-bootstrap';
import {
    IDIOMA_HORARIO,
    SEMANA_SELECT
} from '../utils/config';
import {
    createHorario
} from '../endpoints'
import {
    useSelector
} from 'react-redux'
const AddHorarioModal = (peliculaId) => {
        console.log("AddHorarioModal -> peliculaId", peliculaId)
        let history = useHistory();
        const [show, setShow] = useState(false);
        const user = useSelector(state => state.authentication);
        const [dayHorario, dayInput] = useSelectForm({
            name: 'day',
            label: 'Día de la semana:',
            optionsSelect: SEMANA_SELECT,
            placeholder: 'Seleccione el día de la semana'
        });
        const [idiomaHorario, idiomaInput] = useSelectForm({
            name: 'idioma',
            label: 'Idioma:',
            optionsSelect: IDIOMA_HORARIO,
            placeholder: 'Seleccione el idioma'
        });
        const [precioHorario, precioInput] = useInputForm({
            type: "text",
            placeholder: 'Ingrese el precio',
            name: 'precio',
            label: 'Precio(soles):'
        });
        const [dateHorario, dateInput] = useInputForm({
            type: "date",
            placeholder: 'Ingrese la fecha',
            name: 'fecha',
            label: 'Fecha:'
        });
        const [hourHorario, hourInput] = useInputForm({
            type: "time",
            placeholder: 'Ingrese la hora de la función',
            name: 'hour',
            label: 'Hora de la función:'
        });
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const convertTime24to12 = (time24h) => {

            let [hours, minutes] = time24h.split(':');
            let symbol = 'am'
            if (hours > 12) {
                hours = hours - 12
                symbol = 'pm'
            }

            if (hours === 12) {
                symbol = 'pm'
            }


            return `${hours}:${minutes} ${symbol}`;
        }


        const saveChanges = async () => {
            if (precioHorario && idiomaHorario && dateHorario && hourHorario && dayHorario) {
                const data = {
                    day: dayHorario.value,
                    idioma: idiomaHorario.value,
                    precio: precioHorario,
                    num_funciones: 1,
                    pelicula_id: `${peliculaId}`,
                    fecha: dateHorario.split("-").reverse().join("/"),
                    hora: convertTime24to12(hourHorario),
                }

                try {

                    const response = await createHorario(user.token, data)
                    if (response.status === 'ok') {
                        history.go(0);
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }

    const modal = 
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                        {dayInput}
                        {hourInput}
                        {dateInput}
                        {idiomaInput}
                        {precioInput}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cerrar
            </Button>
            <Button variant="primary" onClick={saveChanges}>
            Guardar cambios
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    return [ modal , handleShow];
  }
export default AddHorarioModal;