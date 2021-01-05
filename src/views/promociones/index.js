import React, { Fragment, useEffect, useState } from "react";
import { getPromotions, sortUpdatedPromociones } from "../../endpoints";
// import TableData from '../../components/TableData';
import { CImg, CButton } from "@coreui/react";
import { API_URL } from "../../utils/config";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const Promociones = () => {
  const [promociones, setPromociones] = useState(null);
  const user = useSelector((state) => state.authentication);
  const settingPromociones = async () => {
    const data = await getPromotions();
    if (data) {
      setPromociones(data);
    }
  };

  useEffect(() => {
    settingPromociones();
  }, []);
  const history = useHistory();
  const goTo = () => {
    history.push("/promociones/add");
  };
  //Handle drag items.
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(promociones);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPromociones(items);
    console.log(items);
  };
  const sendArrOrder = async () => {
    let sendData = "";

    for (let aux = 0; aux < promociones.length; aux++) {
      promociones[aux].order = aux + 1;

      sendData = promociones;
    }

    console.log("before for", sendData);

    try {
      const resp = await sortUpdatedPromociones(user.token, sendData);

      if (resp.status === "ok") {
        console.log(resp, "SEND!!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {/* {
    <div className="col-12 text-right">
            <CButton 
              color="success" 
              className="mb-3"
              onClick={() => goTo()}
            >
              + Agregar una promoción
          </CButton>
      </div>
        
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
     } */}
      {/* Drag and Drop */}
      {promociones ? (
        <>
          <div className="row">
            <div className="col-9">
              <h1>Promociones</h1>
            </div>

            <div className="col-3">
              <CButton
                color="success"
                className="peliculas-btn-agregar"
                onClick={() => goTo()}
              >
                + Agregar una película
              </CButton>
            </div>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="table">
              {(provided) => (
                <table
                  id="example"
                  className="table"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <thead className="thead-dark text-center">
                    <tr>
                      <th>Título</th>
                      <th>Imágen</th>
                      <th>Fecha de Creación</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  {/*Fill the table with function map  */}
                  {promociones.map(({ id, title, img, created_at }, index) => {
                    id = id.toString();
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <tbody className="text-center">
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <th>{title}</th>
                              <th style={{ display: "flex" }}>
                                <CImg
                                  src={`${API_URL}${img}`}
                                  width={120}
                                  align={"center"}
                                />
                              </th>
                              <th
                                style={{
                                  fontWeight: "initial",
                                  textAlign: "center",
                                }}
                              >
                                {new Date(created_at).toLocaleString("es-PE")}
                              </th>
                              <th>
                                <CButton
                                  className="btn btn-info"
                                  onClick={() =>
                                    history.push(`/promociones/${id}`)
                                  }
                                  size={"sm"}
                                >
                                  Ver Más
                                </CButton>
                              </th>
                            </tr>
                          </tbody>
                        )}
                      </Draggable>
                    );
                  })}
                </table>
              )}
            </Droppable>
          </DragDropContext>
          <CButton
            color="primary"
            onClick={() => sendArrOrder()}
            className="mb-3 mr-2"
          >
            Guardar Cambios
          </CButton>
        </>
      ) : null}
    </Fragment>
  );
};

export default Promociones;
