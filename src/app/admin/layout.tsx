'use client'

import { Footer } from "@/components/Footer"
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react"

import { ReactNode } from "react"
import { Link } from "@chakra-ui/next-js"
import { UserMenu } from "@/components/UserMenu"
import { SideMenu } from "./components/SideMenu"


interface AdminLayoutProps{
    children: ReactNode
}

export default function AdminLayout({children}: AdminLayoutProps) {

    return (
        <Grid gridTemplate={`
        "header header header" 
        "sideMenu conteudo conteudo" 
        "footer footer footer" 
        `}
        gridTemplateRows="80px auto 80px" 
        gridTemplateColumns="200px auto"
        minH="100vh"
        >
            <GridItem  gridArea="header" >
                <Flex as="header" align="center" justify="space-between" p={4}>
                    <Link href="?">
                    <Heading fontSize="lg">Import Shop</Heading>
                    </Link>
                    <Flex align="center" justify="flex-end">
                        <UserMenu/>
                    </Flex>
                </Flex>
            </GridItem>
            <GridItem  
            gridArea="sideMenu" 
            
            >
                <SideMenu/>
            </GridItem>
            <GridItem  gridArea="conteudo" p={4}>{children}</GridItem>
            <GridItem  gridArea="footer">
                <Footer/>
            </GridItem>
        </Grid>
    )
}