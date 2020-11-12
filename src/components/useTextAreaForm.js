import React, {useState} from 'react'
import {
    CLabel,
    CFormGroup,
    CTextarea
} from '@coreui/react'
const useTextAreaForm = ({type, placeholder, name, label, rows}) => {
    const [value, setValue] = useState('');
    const input =
    <CFormGroup>
        <CLabel htmlFor={`nf-${name}`}>
            {label}
        </CLabel>
        <CTextarea 
            value={value} 
            onChange={e => setValue(e.target.value)} 
            type={type}
            rows={rows || 5}
            name={`nf-${name}`}
            placeholder={placeholder}
            autoComplete={name}
        />
    </CFormGroup>
        
    return [value, input, setValue];
}

export default useTextAreaForm

