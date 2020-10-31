import React, {useState} from 'react'
import {
    CLabel,
    CFormGroup,
    CInput
} from '@coreui/react'
const useInputForm = ({type, placeholder, name, label}) => {
    const [value, setValue] = useState('');
    const input =
    <CFormGroup>
        <CLabel htmlFor={`nf-${name}`}>
            {label}
        </CLabel>
        <CInput 
            value={value} 
            onChange={e => setValue(e.target.value)} 
            type={type}
            name={`nf-${name}`}
            placeholder={placeholder}
            autoComplete={name}
        />
    </CFormGroup>
        
    return [value, input, setValue];
}

export default useInputForm

