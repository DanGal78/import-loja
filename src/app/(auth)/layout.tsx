'use client'
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AuthLayoutPros {
    children: ReactNode
}


export default function AuthLayout({children}: AuthLayoutPros){
    return (
        <Flex bg="gray.100"
         minH="100vh"
         minW="100vw"
         align="center"
         justify="center"
         >
            {children}
         </Flex>
    )
}