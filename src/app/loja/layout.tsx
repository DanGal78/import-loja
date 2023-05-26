'use client'
import { Footer } from "@/components/Footer";
import { HeaderUser } from "@/components/HeaderUser";
import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LojaLayoutProps {
    children: ReactNode
}
export default function LojaLayout({children} : LojaLayoutProps) {
    return(

        <Flex direction="column">
            <HeaderUser/>
            <Flex paddingTop="72px">{children} </Flex>
            <Footer/>
        </Flex>
    )
}