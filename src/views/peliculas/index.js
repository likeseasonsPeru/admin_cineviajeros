import React, { Fragment, useState, useEffect } from "react";
import { getPeliculas, sortUpdatedPeliculas } from "../../endpoints";
import { CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import TableData from "../../components/TableData";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";

const Peliculas = (props) => {
  const [peliculas, setPeliculas] = useState("");
  const [sendMovies, setSendMovies] = useState("");
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const user = useSelector((state) => state.authentication);
  const settingPeliculas = async () => {
    const data = await getPeliculas();
    if (data) {
      data.forEach((pelicula) => {
        if (pelicula.category === "proxima") {
          pelicula.category = "Próxima Película";
        } else if (pelicula.category === "inactive") {
          pelicula.category = "Película Inactiva";
        } else if (pelicula.category === "semanal") {
          pelicula.category = "Película Semanal";
        }
      });
      setPeliculas(data);
    }
  };
  const getBadge = (category) => {
    switch (category) {
      case "Próxima Película":
        return "primary";
      case "Película Inactiva":
        return "danger";
      case "Película Semanal":
        return "secondary";
      default:
        return "primary";
    }
  };
  const history = useHistory();
  const goTo = () => {
    history.push("/peliculas/add");
  };

  //Handle drag items.
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(peliculas);
    const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.order, 0, reorderedItem)
    items.splice(result.destination.index, 0, reorderedItem);

    setPeliculas(items);
    console.log(items);
  };

  const sendArrOrder = async () => {
    let sendData = "";

    for (let aux = 0; aux < peliculas.length; aux++) {
      peliculas[aux].order = aux + 1;

      sendData = peliculas;
    }

    console.log("before for", sendData);

    try {
      const resp = await sortUpdatedPeliculas(user.token, sendData);

      if (resp.status === "ok") {
        console.log(resp, "SEND!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    settingPeliculas();
  }, []);

  const rows = peliculas;

  console.log(" Order", peliculas);

  return (
    <Fragment>
      {/* {
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
                    {key: 'title', _classes: 'font-weight-bold text-center', label: 'Título' },
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
     } */}

      {peliculas ? (
        <>
          <div className="row">
            <div className="col-9">
              <h1>Peliculas</h1>
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
          <hr />
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
                      <th>Duración</th>
                      <th>Precio Mínimo</th>
                      <th>Categoría</th>
                    </tr>
                  </thead>
                  {/*Fill the table with function map  */}
                  {peliculas.map(
                    ({ id, category, title, duration, precio_min }, index) => {
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
                                <th style={{ fontWeight: "initial" }}>
                                  {duration}
                                </th>
                                <th style={{ fontWeight: "initial" }}>
                                  {precio_min}
                                </th>
                                <CButton
                                  id="table-btn"
                                  onClick={() =>
                                    history.push(`/promociones/${id}`)
                                  }
                                  color={getBadge(category)}
                                  size={"sm"}
                                >
                                  {category}
                                </CButton>
                              </tr>
                            </tbody>
                          )}
                        </Draggable>
                      );
                    }
                  )}
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

      {/* <tfoot>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
        </tfoot> */}

      {/* Drag and Drop
     {
       peliculas ? (
             <Paper className={classes.root}>
      <DragDropContext onDragEnd={ handleOnDragEnd } >
          <Droppable droppableId="table" >
                <TableContainer className={classes.container}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, {id,category, title, duration, precio_min}, index ) => {
                        return (
                            <TableRow 
                              hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                              return (
                                <>
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                </>
                              );
                                })}
                            </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                  </Droppable>
      </DragDropContext>
                
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        
        </Paper>
      
       ): null
     } */}
    </Fragment>
  );
};

export default Peliculas;
