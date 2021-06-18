import { useState } from "react"

// Recibe un objeto con las propiedades inputs
export const useForm = ( initialState = {}) => {
    
    const [values, setValues] = useState( initialState )

    const reset = ( newFormState = initialState) => {
        setValues( newFormState )
    }
    //Lee lo que se introduce en cada input
    const handleInputChange = ( { target }) => {

        //El name del input debe ser el mismo del atributo del objeto
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return [ values, handleInputChange, reset ];
}
