import { Link } from "@chakra-ui/next-js"
import { Button, Flex, Image, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { AiOutlineRight} from "react-icons/ai"

interface CardDestaqueProps {
    titulo: string
    path: string
    src: string
    color: "red" | 'green'
    
}

export const CardDestaque: FC <CardDestaqueProps> = 
({titulo, path, src, color}) =>{
    const [currentColor, setCurrentColor] = useState('')
    useEffect(() => {
        if(color === 'red') {
            setCurrentColor('orange.500')
        } else {
            setCurrentColor('orange.500')
        }
    },[color])
    return(
    <Link href={path} _hover={{textDecoration: 'none',transform: 'scale(1.02)'}}
    transition="all 0.2s"
    >
        <Flex bg={currentColor} 
        borderRadius="2px"
         textAlign="center" 
         color="black" 
         align="center" 
         justify="center" 
         overflow="hidden" 
         textDecoration="none"
         padding={4}
         > 
            <Flex direction="column" justify="space-around" align="flex-start">
            <Text fontSize="3xl">{titulo}</Text>
            <Flex align="center" direction={['column-reverse','column-reverse', 'row']}>
            <Button 
            variant="solid"
            colorScheme="whiteAlpha" 
            rightIcon={<AiOutlineRight/>}
            marginTop={4}
            color="black"
            >
                Vários Modelos
                </Button>
                    <Image src={src} alt="Imagem do card" maxH={210}/>
                </Flex>
                </Flex>
        </Flex>
    </Link>
    );
}