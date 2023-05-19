import { FormControl, FormLabel, Input as ChakraInput, InputProps, FormErrorMessage } from "@chakra-ui/react";
import {  forwardRef } from "react";
import { Field, FieldError } from "react-hook-form";

interface InputBasePros extends InputProps{
    id: string
    type: string
    label: string
    error?: FieldError

}

const InputBase = ({id, type, label,error, ...resto}: InputBasePros, ref: any) =>{

    return(
        <FormControl isInvalid={!!error}>
                    <FormLabel htmlFor={id}mb={0}>
                        {label}
                    </FormLabel>
                    <ChakraInput id={id} 
                    type={type} 
                    {...resto} 
                    ref={ref}
                    variant="flushed"
                    focusBorderColor="red.500"/>
                    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
    )
}

export const Input = forwardRef<HTMLInputElement, InputBasePros>(InputBase)