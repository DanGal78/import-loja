import { FC } from "react";
import { CardProdutosProps } from "../CardProduto/index";
import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { formataMoeda } from "@/helpers/formataMoeda";



export const CardProdutoHorizontal: FC<CardProdutosProps> = ({
    produto: {nome, imagem, descricao, preco, id},
    handleOpenModal,
 }) => {
    
    return(
        <Card overflow="hidden" onClick={()=> handleOpenModal(id)}
         direction="row"
        _hover={{transform: 'scale(1.01)'}}
        transition="all 0.2s"
        >
            <Image src={imagem} alt={'Produto: ' + nome} objectFit="cover" />
            <Stack>
                <CardBody>
                    <Heading size="md">{nome}</Heading>
                    <Text py={2} noOfLines={3}>{descricao}</Text>
                </CardBody>
                <CardFooter>
                    <Text color="green.500">{formataMoeda(preco)}</Text>
                </CardFooter>
            </Stack>
        </Card>
    )
}