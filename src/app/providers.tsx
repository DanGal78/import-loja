'use client'

import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from 'react-query/devtools'


interface ProvidersProps {
    children: ReactNode
}

const queryClient = new QueryClient();

export const Providers: FC<ProvidersProps> = ({ children}) => {
    return(
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <CartProvider>
        <CacheProvider>
        <ChakraProvider>{children} </ChakraProvider>
        <ToastContainer/>
        </CacheProvider>
        <ReactQueryDevtools/>
        </CartProvider>
        </AuthProvider>
        </QueryClientProvider>
    )
} 