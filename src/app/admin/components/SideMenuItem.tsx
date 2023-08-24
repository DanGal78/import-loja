import { Link } from "@chakra-ui/next-js"
import { Flex, Icon, Text } from "@chakra-ui/react"
import { FC } from "react"



interface SideMenuItemProps {
    icon: any
    title: string
    path: string
}

export const SideMenuItem: FC<SideMenuItemProps>= ({icon, title, path}) => {
    return (
        <Flex 
        p={4} 
        as={Link} 
        href={path}
        align="center"
        gap={2}
        _hover={{ textDecoration: 'none', bg: 'blackAlpha.200'}}
        
        >
            <Icon as={icon}/> 
            <Text>{title}</Text>
        </Flex>

    
    )
}