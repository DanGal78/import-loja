import { Box, Icon } from "@chakra-ui/react"
import { FC } from "react"
import { FaTimes, FaBars } from "react-icons/fa"

interface MenuToggleProps{
    isOpen: boolean
    onToggle: () => void
}

export const MenuToggle: FC<MenuToggleProps> = ({isOpen, onToggle}) =>{
    return (
     <Box
        display={{base:'block', md: 'none'}} 
        onClick={onToggle} 
        transition="all 0.2"
        padding="2"
     >
        {isOpen ? <Icon as={FaTimes}/> : <Icon as={FaBars}/> }
     </Box>
    );
}