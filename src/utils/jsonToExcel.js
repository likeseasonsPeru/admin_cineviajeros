import React, { useState,useEffect } from 'react';
import { exportEmailToExcel } from '../../src/endpoints/index';
import ExportExcel from 'react-export-excel';
import moment from 'moment';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;


export const JsonToExcel = () => {

    const [emails, setEmails] = useState([]);
    
    const getEmailFromBD = async () => {
        const data = await exportEmailToExcel();
        if( data) {
            setEmails(data);
        }
      }

    useEffect(() => {
        getEmailFromBD();
        
    }, [])

    emails.forEach( aux => {
        //aux.created_at = moment( new Date( aux.created_at )).calendar(); //Format date = (Month/ Days/ Years)
        aux.created_at = moment( new Date( aux.created_at )).format("DD/MM/YY"); //Format date = (Days/ Month/ Years)
    });
    
    return(
        <>
        {
            emails ? (
                <ExcelFile element={ <a>Exportar a Excel</a> } filename="Emails">
                     <ExcelSheet data={ emails } name="Correos suscriptos">
                        <ExcelColumn label="Emails" value="email" />
                        <ExcelColumn label="Fecha de creación" value="created_at" />
                        {/* <ExcelColumn label="created_at" value={ created_at } />  */}
                    </ExcelSheet> 
                </ExcelFile>

            ) : null
        }
        
        </>
    )
    
}

