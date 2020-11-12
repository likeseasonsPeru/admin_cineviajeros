import React, {
    useState,
    useEffect
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
    editHorario
} from '../endpoints'
import {
    useSelector
} from 'react-redux'
const EditHorarioModal = () => {
        let history = useHistory();
        const [show, setShow] = useState(false);
        const [horario, setHorario] = useState(null);
        const user = useSelector(state => state.authentication);
        const [peliculaId, setPeliculaId] = useState(null);
        const [dayHorario, dayInput, setDayHorario] = useSelectForm({
            name: 'day',
            label: 'Día de la semana:',
            optionsSelect: SEMANA_SELECT,
            placeholder: 'Seleccione el día de la semana'
        });
        const [idiomaHorario, idiomaInput, setIdiomaHorario] = useSelectForm({
            name: 'idioma',
            label: 'Idioma:',
            optionsSelect: IDIOMA_HORARIO,
            placeholder: 'Seleccione el idioma'
        });
        const [precioHorario, precioInput, setPrecioHorario] = useInputForm({
            type: "text",
            placeholder: 'Ingrese el precio',
            name: 'precio',
            label: 'Precio(soles):'
        });
        const [dateHorario, dateInput, setDateHorario] = useInputForm({
            type: "date",
            placeholder: 'Ingrese la fecha',
            name: 'fecha',
            label: 'Fecha:'
        });
        const [hourHorario, hourInput, setHourHorario] = useInputForm({
            type: "time",
            placeholder: 'Ingrese la hora de la función',
            name: 'hour',
            label: 'Hora de la función:'
        });
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const convertTime12to24 = (time12h) => {
            const [time, modifier] = time12h.split(' ');

            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
        }

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
                if (precioHorario && idiomaHorario.value && dateHorario && hourHorario && dayHorario.value) {
                    const response = await editHorario(user.token, horario.id, data)
                    if (response.status === 'ok') {
                        history.go(0);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(() => {
            if (horario) {
                const idiomaDefault = IDIOMA_HORARIO.filter(idioma => idioma.value === horario.idioma)
                console.log("EditHorarioModal -> idiomaDefault", idiomaDefault)
                setIdiomaHorario(idiomaDefault[0])
                setPrecioHorario(horario.precio)
                const diaDefault = SEMANA_SELECT.filter(day => day.value === horario.day)
                setDayHorario(diaDefault[0])
                setPeliculaId(horario.pelicula_id)

                var date = horario.fecha;
                var newdate = date.split("/").reverse().join("-");
                setDateHorario(newdate)

                setHourHorario(convertTime12to24(horario.hora))
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [horario])
    const modal = 
    <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Horario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                {horario ? (
                    <>
                        {dayInput}
                        {hourInput}
                        {dateInput}
                        {idiomaInput}
                        {precioInput}
                    </>
                ) : null}
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
    return [ modal , handleShow, setHorario];
  }
export default EditHorarioModal;
  