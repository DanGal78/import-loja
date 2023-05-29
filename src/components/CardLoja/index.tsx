import {  Link } from "@chakra-ui/next-js"
import { Flex, Heading, Image, Text, Icon, textDecoration} from "@chakra-ui/react"
import { FC } from "react"
import { Loja } from "@/services/lojasService"
import { StarRating } from "@/components/StarRating"

interface CardLojaProps{
    loja: Loja
    path: string
}

export const CardLoja: FC<CardLojaProps> = ({
    path,
    loja:    {nome, nota, categoria,  imageLogo}
}) => {

    const moneyFormatter = new Intl.NumberFormat('pt-br',{
        style: 'currency',
        currency: 'BRL',
    })
    return (
    <Flex as={Link}
    href={path}
    padding={4} 
    backgroundImage= "url('/explosaobranco.avif')"
    borderRadius="7px" 
    
    minW="550px"   
    _hover={{
        transform:'scale(1.02)',
        boxShadow: "0 2px 8px rgba(255,140,0,0.4)",
        textDecoration:'none'
      }}
      transition="all 0.2s"
      
      >
        <Flex gap={4} align="center" justify="space-between" >
            <Image w={100} src={imageLogo}
             alt={`Logotipo da loja ${nome}`}  
             borderRadius="none"       
             />
            <Flex direction="column" gap={2}>
                <Heading fontSize="1rem">{nome}</Heading>
                <Flex gap={2} fontSize="0.9rem" color="blackAlpha.500">
                    <StarRating nota={nota}></StarRating>
                    <Text as="span">•</Text>
                    <Text>{categoria}</Text>
                    <Text as="span">•</Text>                    
                </Flex>
                             
            </Flex>
        </Flex>
    </Flex>
    );
}