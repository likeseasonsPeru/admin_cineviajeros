import React, {useState} from 'react'
import {
    CLabel,
    CFormGroup,
    CInputFile,
    CImg,
    CRow
} from '@coreui/react'
const useImageFieldForm = ({placeholder, name, label, medida}) => {
    const [value, setValue] = useState('');
    const [src, setSrc] = useState(value);
    const setImage = async (e) => {
        e.persist();
        
        if (!e.target.files || e.target.files.length === 0) {
            
            return
        }
        setValue(e.target.files[0])
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setSrc(objectUrl);
         /*
         const reader =  new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                console.log("useImageFieldForm -> reader", reader)
                setValue(reader.result)
            }
        }
        await reader.readAsDataURL(e.target.files[0]);
         */
    }
    const input =
    <CFormGroup>
         
        <CRow>
        <CLabel htmlFor={`nf-${name}`}>
            {label}
        </CLabel>
        </CRow>
        <CImg
            src={src || value}
            block
            className="showImageInput mb-2"
        />
        <label htmlFor={`id${name}`} className="btn btn-primary">Elije una imagen</label>
        {medida || ''}
        <CInputFile  
            onChange={e => {
            setImage(e)
            }}
            id={`id${name}`}
            name={`${name}`}
            style={{visibility:'hidden'}}
            placeholder={placeholder}
        />
        
    </CFormGroup>
        
    return [value, input, setValue];
}

export default useImageFieldForm
