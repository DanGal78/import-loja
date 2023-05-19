import { formataMoeda } from "@/helpers/formataMoeda"
import { Produtos } from "@/services/produtoService"
import { Card, CardBody, Heading, Stack, Text, Image } from "@chakra-ui/react"

import { FC } from "react"

 export interface CardProdutosProps{
    produto: Produtos
    handleOpenModal: (id: string) => void
}

export const CardProdutos: FC<CardProdutosProps> = ({
    produto:{nome, preco, descricao,imagem, id },
    handleOpenModal
}) => {
      

    return (
        <Card 
        maxW="sm" 
        onClick={() => handleOpenModal(id)}
        _hover={{transform: 'scale(1.01)'}}
        transition="all 0.2s"
        >
                <CardBody padding={0}>
                    <Image src={imagem} alt={'Imagem do Produto: ' + nome}/>
                    <Stack mt={5} mx={5}>
                    <Heading size="md">{nome}</Heading>
                    <Text noOfLines={3}>{descricao}</Text>
                    <Text color="green.500">{formataMoeda(preco)}</Text>
                     </Stack>
                </CardBody>
            </Card>
    )
}