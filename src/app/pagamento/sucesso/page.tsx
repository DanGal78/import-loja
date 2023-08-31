'use client'
import { useCart } from "@/contexts/CartContext";
import { Flex, Text } from "@chakra-ui/react";

import { useEffect } from "react";

export default function Sucesso() {
    const {clearCart} = useCart();

    useEffect(() => {
        clearCart();
    },[])

    return (
        <Flex>
            <Text>Pagamento Processado com sucesso!</Text>
        </Flex>
)
}