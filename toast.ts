import { title } from 'process';
import { toast, TypeOptions } from 'react-toastify';


export const notify = (
    description: string,   
    type: TypeOptions,
    icon?: any,
    ) => {
        toast(description, {
            type,
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,            
            pauseOnHover: true,
            closeOnClick: false,
            draggable: true,
            theme: 'colored',
            icon,
                        
        }) 
    }