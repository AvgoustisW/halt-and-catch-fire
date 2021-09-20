import { UseToastOptions } from '@chakra-ui/toast';


const common = {
    position: 'top',
    duration: 2400,
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

export const toastWarning = {
    ...common,
    status: "warning"
} as UseToastOptions
