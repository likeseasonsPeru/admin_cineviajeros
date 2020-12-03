import React, { useState, useEffect } from "react";
import { exportEmailToExcel } from "../../src/endpoints/index";
import ExportExcel from "react-export-excel";
import moment from "moment";

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

export const JsonToExcel = () => {
  const [emails, setEmails] = useState([]);

  const getEmailFromBD = async () => {
    const data = await exportEmailToExcel();
    if (data) {
      data.forEach(date => {
        date.created_at =  moment(new Date(date.created_at)).format("DD/MM/YYYY")
      })
      setEmails(data);
    }
  };

  useEffect(() => {
    getEmailFromBD();
  }, []);

  //console.log(emails);
  try {
    moment(emails.created_at).calendar();
  } catch (error) {
    console.log("No se transformo...");
  }

  return (
    <>
      {emails ? (
        <ExcelFile element={<div>Exportar a Excel</div>} filename="Emails">
          <ExcelSheet data={emails} name="Correos suscriptos">
            <ExcelColumn label="Emails" value="email" />
            <ExcelColumn label="Fecha de creación" value="created_at" />
            {/* <ExcelColumn label="created_at" value={ created_at } />  */}
          </ExcelSheet>
        </ExcelFile>
      ) : null}
    </>
  );
};
