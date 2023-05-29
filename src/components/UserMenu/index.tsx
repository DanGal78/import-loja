import { useAuth } from '@/contexts/AuthContext'
import { Link } from "@chakra-ui/next-js"
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { FC } from "react"
import { FaCog, FaDoorOpen, FaUserAlt, FaUsersCog } from "react-icons/fa"

export const UserMenu: FC = () => {
    const { logout } = useAuth()

    return(
        <Menu>
                    <MenuButton as={IconButton} aria-label="Informação do Usuário" 
                    icon={<FaUserAlt/>}/>
                    <MenuList>
                        <MenuItem as={Link} href="/perfil" icon={<FaUsersCog/>}>
                            Perfil
                        </MenuItem>
                       
                        <MenuItem 
                        as={Button} 
                        onClick={() => {
                            logout()
                            redirect('/')
                        }}
                        color="red.500" 
                        icon={<FaDoorOpen/>}>
                            Sair
                        </MenuItem>
                    </MenuList>
                </Menu>
    )
}