import { UseToastOptions } from '@chakra-ui/toast';


const common = {
    position: 'top',
    duration: 3000,
    isClosable: true,
}

export const toastSuccess = {
    ...common,
    status: "success"
} as UseToastOptions

export const toastError = {
    ...common,
    status:"error"
} as UseToastOptions
