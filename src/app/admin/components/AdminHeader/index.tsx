import { Button, Flex, Heading, Spinner } from "@chakra-ui/react"
import { FC } from "react"

interface AdminHeaderProps {
    onClick?: () => void
    buttonLabel?: string
    title: string
    isFetching?: boolean
}

export const AdminHeader:FC<AdminHeaderProps>  = ({
    onClick,
    buttonLabel,
    title,
    isFetching,
}) => {
    return(
        <Flex align="center" justify="space-between" px={2}>
        <Heading fontSize="xx-large">{title} {isFetching && <Spinner size='sm'/>}
        </Heading>
        {onClick && buttonLabel && (
            <Button colorScheme="green" onClick={onClick}>
            {buttonLabel}
            </Button>
        )}
        
        </Flex>
    )
    
}