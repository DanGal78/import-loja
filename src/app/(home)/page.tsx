'use client'

import { Button, Flex, FormControl, Heading, Icon, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react"
import {GoSearch} from 'react-icons/go'
import { useState } from "react";
import { CardDestaqueProps } from "@/components/CardDestaque";

import { listarLojas } from "@/services/lojasService";


export default function Page() {
  const [busca, setBusca] = useState('');

  return (
  <Flex direction="column" align="center" grow={1}>
    <Flex as="hgroup" direction="column" align="center">
        
      
      <Heading as="h1" fontSize="2.25rem" color="blackAlpha.400"
      _hover={{ color: 'orange.500', bg: 'none'}}
      >Tecnologia em suas mãos</Heading>
    </Flex>
    <Flex as="section" w="100%">
      <FormControl flexDirection="row" display="flex" gap={1} marginX="48" marginTop="4">
        <InputGroup>
        <InputLeftAddon bg="orange.500" borderRadius="2px">
        <Icon as={GoSearch}/> </InputLeftAddon>
        <Input  type="text" placeholder="Pesquise um item"  value={busca} 
        onChange={(evento) => setBusca(evento.target.value)}
        borderRadius="2px" 
        />
        </InputGroup>
          <Button colorScheme="orange" borderRadius="2px">Buscar</Button>
      </FormControl>
    </Flex>
    <Flex as="section" mt={10} gap={4}>
      <CardDestaqueProps src='/iphonepromax.png' path='/' titulo='Celulares' color='red'/>
      <CardDestaqueProps src='/bombox.png' path='/' titulo='Caixas Bluetooth' color='green'/>
    </Flex>
    <Flex as="section"  maxW="90vw" marginLeft="5vw"  direction={'column'} >
      <Heading fontSize="1.25rem"></Heading>
     
    
      </Flex>
    </Flex>
  
    
  )
}
