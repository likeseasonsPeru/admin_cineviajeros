import React, { useState } from 'react'
import {CFormGroup,CLabel} from '@coreui/react';
import Select from 'react-select';
const useSelectForm = ({optionsSelect, name, label, placeholder}) => {
    const [initialValue, setInitialValue] = useState(null)

    const inputSelect =
        <CFormGroup>
        <CLabel htmlFor={`nf-${name}`}>
            {label}
        </CLabel>
        <Select 
            value={initialValue}
            defaultValue={initialValue}
            onChange={setInitialValue} 
            name={`nf-${name}`}
            options={optionsSelect}
            placeholder={placeholder}
            autoComplete={name}
        />
    </CFormGroup>
        
        return [initialValue, inputSelect, setInitialValue];
}

export default useSelectForm;