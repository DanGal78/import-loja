import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";
import { title } from "process";
import { FC } from "react";
import { FaBox, FaHome, FaStore } from "react-icons/fa";
import { SideMenuItem } from "../SideMenuItem";



export const SideMenu: FC = () => {

    const menuOptions = [ 
    {
        icon: FaHome,
        title: 'Início',
        path: '/admin'
    },
    {
        icon: FaStore,
        title: 'Lojas',
        path: '/admin/lojas'
    },
    {
        icon: FaBox,
        title: 'Produtos',
        path: '/admin/produtos'
    },
]
    return <Flex as="aside" grow={1} direction="column" maxW="200px">
        
        <Flex grow={1} direction="column" >
            {menuOptions.map((menuItem, i) =>(
                <SideMenuItem
                key={i}
                icon={menuItem.icon}
                title={menuItem.title}
                path={menuItem.path}
                />
            ))}
            

        </Flex>
        </Flex>

    
}