import { Box, Icon } from "@chakra-ui/react"
import { FC } from "react"
import { FaStar } from "react-icons/fa"

interface StarRatingProps {
    nota: number
}

export const StarRating : FC<StarRatingProps> = ({nota}) => {
    return (
        <Box color="yellow.500">
            <Icon as={FaStar}/> {nota}
        </Box>
    )
}