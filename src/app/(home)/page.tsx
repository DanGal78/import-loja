'use client'

import { Button, Flex, FormControl, Heading, Icon, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react"
import {GoSearch} from 'react-icons/go'
import { useState } from "react";

export default function Page() {
  const [busca, setBusca] = useState('');

  return (
  <Flex direction="column" align="center" grow={1}>
    <Flex as="hgroup" direction="column" align="center">
      <Heading as="h1" fontSize="2.25rem"></Heading>
      <Heading as="h2" fontSize="1rem" color="blackAlpha.400">O que você precisa está aqui. Peça a receba onde estiver </Heading>
    </Flex>
    <Flex as="section" w="100%">
      <FormControl flexDirection="row" display="flex" gap={4} marginX="48" marginTop="4">
        <InputGroup>
        <InputLeftAddon bg="none" border="nome">
        <Icon as={GoSearch}/> </InputLeftAddon>
        <Input  type="text" placeholder="Pesquise um item" value={busca} 
        onChange={(evento) => setBusca(evento.target.value)}
        borderRadius="none"
        />
        </InputGroup>
          <Button colorScheme="red" borderRadius="none">Buscar</Button>
      </FormControl>
    </Flex>
    <Flex as="section" mt={10} gap={4}>
      
    </Flex>
    <Flex as="section"  maxW="90vw" marginLeft="5vw"  direction={'column'} >
      <Heading fontSize="1.25rem">Lojas</Heading>
      
      </Flex>
    </Flex>
  
  )
}
