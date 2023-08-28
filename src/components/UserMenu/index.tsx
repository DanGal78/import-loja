import { useAuth } from '@/contexts/AuthContext'
import { Link } from "@chakra-ui/next-js"
import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import { FC } from "react"
import { FaCog, FaDoorOpen, FaUserAlt, FaUsersCog } from "react-icons/fa"

export const UserMenu: FC = () => {
    const { logout, hasPermission} = useAuth()

    return(
        <Menu>
                    <MenuButton as={IconButton} aria-label="Informação do Usuário" 
                    icon={<FaUserAlt/>}/>
                    <MenuList>
                        <MenuItem as={Link} href="/perfil" icon={<FaUsersCog/>}>
                            Perfil
                        </MenuItem>
                        <MenuItem as={Link} href="/" icon={<FaCog/>}>
                            Configurações
                        </MenuItem>
                        {hasPermission('Administrador') && (
                            <MenuItem as={Link} href="/admin" icon={<FaCog/>}>
                                Painel de Adm
                            </MenuItem>
                        )}
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