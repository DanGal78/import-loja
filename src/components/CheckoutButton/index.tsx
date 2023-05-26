import { useCart } from "@/contexts/CartContext";
import { formataMoeda } from "@/helpers/formataMoeda";
import { Link } from "@chakra-ui/next-js";
import { Button, Flex,
     Popover, PopoverArrow, PopoverBody, PopoverContent, 
     PopoverHeader, PopoverTrigger, Stack, StackItem, Text,Image, IconButton, PopoverFooter, Heading,  } from "@chakra-ui/react";

import { FC } from "react";
import { FaCreditCard, FaShoppingBasket, FaTrashAlt } from "react-icons/fa";


export const CheckoutButton: FC = () => {
    const { quantidade, valor, produtos, removeFromCart} = useCart()
    
    return(
    <Popover>
    <PopoverTrigger>
        <Button 
            aria-label="Carrinho de compras do usuário"
            leftIcon={<FaShoppingBasket/>}>
                <Flex direction="column" fontSize="10px" fontWeight={500}>
                    <Text>{formataMoeda(valor)}</Text>
                     <Text>{quantidade}</Text>
                </Flex>
        </Button>
    </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow/>
                <PopoverHeader>Seus Itens</PopoverHeader>
                <PopoverBody>
                    <Stack>
                        {produtos?.map((produto, i) =>{
                            if(!produto) return null
                            return (
                            <StackItem key={i}>
                                <Flex gap={3} align="center">
                                    <Image src={produto.imagem}
                                    w={8} 
                                    h={8} 
                                    fit="cover" 
                                    alt={`Imagem do produto ${produto.nome}`}
                                    borderRadius="full"
                                    />
                                    <Flex direction="column">
                                        <Text fontWeight={700} 
                                        fontSize="12px"  noOfLines={1}>
                                            {produto.nome}
                                      
                                        </Text>
                                        <Text fontWeight={500} fontSize="12px">{produto.quantidade} x{' '}
                                        {formataMoeda(produto.preco * produto.quantidade)}
                                        </Text>
                                    </Flex>
                                    <IconButton  aria-label="Remove Item"
                                    icon={<FaTrashAlt/>}
                                    colorScheme="red"
                                    onClick={() =>{
                                        removeFromCart(produto.id)
                                    }}
                                    ml="auto"/>

                                </Flex>
                            </StackItem>
                        )
                        })}
                        {produtos?.length === 0 &&(
                            <StackItem>
                                <Heading fontSize="15px">
                                    Não existe nenhum item no seu carrinho...
                                </Heading>
                            </StackItem>
                        )}
                    </Stack>
                </PopoverBody>
                <PopoverFooter>
                    <Button width="100%" 
                    colorScheme="green" 
                    leftIcon={<FaCreditCard/>}
                    as={Link}
                    href="/pagamento"
                    >
                    Ir para Pagamento
                    </Button>
                </PopoverFooter>
            </PopoverContent>
    </Popover>
    
);
}