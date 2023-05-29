'use client'

import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import { FC, ReactNode } from "react"


interface ProvidersProps {
    children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children}) => {
    return(
        <AuthProvider>
            <CartProvider>
        <CacheProvider>
        <ChakraProvider>{children} </ChakraProvider>
        </CacheProvider>
        </CartProvider>
        </AuthProvider>
    )
} 