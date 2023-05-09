import { Box } from "@chakra-ui/react"
import { FC } from "react"

interface MenuProps{
    isOpen: boolean
}

export const Menu: FC<MenuProps> = ({isOpen}) => {
    return(

        <Box display={{base:isOpen ? 'block': 'none',md: 'block'}}
        flexBasis={{base:'100%', md: 'auto'}}
        marginLeft={4}
        marginRight="auto" ></Box>
        
    )
}