import React, { Fragment, useEffect, useState } from "react";
import { getCombos, sortUpdated } from "../../endpoints";
import TableData from "../../components/TableData";
import { CImg, CButton } from "@coreui/react";
import { API_URL } from "../../utils/config";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
const Combos = () => {
  const [combos, setCombos] = useState("");
  const user = useSelector((state) => state.authentication);

  const settingCombos = async () => {
    const data = await getCombos();
    if (data) {
      setCombos(data.reverse());
    }
  };

  useEffect(() => {
    settingCombos();
  }, []);

  const history = useHistory();
  const goTo = () => {
    history.push("/combos/add");
  };
  //Handle drag items.
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(combos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCombos(items);
    console.log(items);
  };


  const sendArrOrder = async () => {
    let sendData = combos;
    for (let aux = 0; aux < sendData.length; aux++) {
      sendData[aux].order = aux + 1;
    }
    try {
      const resp = await sortUpdated(user.token, 'combos', sendData);
      if (resp.status === "ok") 
         history.go(0)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="col-12 text-right">
        <CButton color="success" className="mb-3" onClick={() => goTo()}>
          + Agregar un combo
        </CButton>
      </div>
      {/* {combos ? (
        <TableData
          titleTable="Combos"
          items={combos}
          fields={[
            {
              key: "title",
              _classes: "font-weight-bold text-center",
              label: "Título",
            },
            {
              key: "img",
              classes: "text-center",
              _style: { textAlign: "center" },
              label: "Imagen",
            },
            {
              key: "created_at",
              _classes: "text-center",
              label: "Fecha de creación",
            },
          ]}
          itemsPerPage={10}
          scopedSlots={{
            img: (item) => (
              <td style={{ display: "flex" }}>
                <CImg
                  src={`${API_URL}${item.img}`}
                  width={120}
                  align={"center"}
                />
              </td>
            ),
            created_at: (item) => (
              <td style={{ textAlign: "center" }}>
                {new Date(item.created_at).toLocaleString("es-PE")}
              </td>
            ),
          }}
          linkPage={"combos"}
        />
      ) : null} */}

      {combos ? (
        <>
          <div className="row">
            <div className="col-9">
              <h1>Combos</h1>
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
                  {combos.map(({ id, title, img, created_at }, index) => {
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
                                  onClick={() => history.push(`/combos/${id}`)}
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
            onClick={() => sendArrOrder()}
            color="primary"
            className="mb-3 mr-2"
          >
            Guardar Cambios
          </CButton>
        </>
      ) : null}
    </Fragment>
  );
};

export default Combos;
