'use client'
import { CardProdutos } from "@/components/CardProduto/index"
import { CardProdutoHorizontal } from "@/components/CardProdutoHorizontal"
import { ModalProduto } from "@/components/ModalProduto"
import { StarRating } from "@/components/StarRating"
import { formataMoeda } from "@/helpers/formataMoeda"
import { obterLoja } from "@/services/lojasService"
import { getProdutos } from "@/services/produtoService"
import { Button, Card, CardBody, Divider, Flex, Heading, Icon, Image, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { use, useState } from "react"
import { AiFillDollarCircle } from "react-icons/ai"
import { redirect } from "next/navigation"

type LojaProps = {
    params: {
        id: string
    }
}


export default  function Loja({params: {id}}: LojaProps ) {
    const {isOpen, onClose, onOpen} = useDisclosure()
    const [addId, setAddId] = useState('')
   const dadosLoja = obterLoja(id) 

   if (!dadosLoja) {
    redirect('/')
    return
   }
    

    
    const handleOpenModal = (id: string) => {
        setAddId(id)
        onOpen()
    }
        
    const produtos =getProdutos()
  

   return (
   <Flex 
       w="95vw" 
        minH="100vh" 
        marginX="2.5vw"        
        direction="column"
        align="center"
        justify="flex-star"
        mt={2}
        overflowX={"hidden"}
   >
        <Flex as="header" direction="column">
        <Image
            src={dadosLoja.imageCover} 
            alt={'Imagem da capa da empresa:'+ dadosLoja.nome} 
            borderRadius="10px"
            />
    
        
        
       </Flex>
       <Flex gap={5} as="section" direction="column" grow={1} maxW="1200px" mt={2} >
        <Heading fontSize="1rem">Os mais vendidos</Heading>
        <Divider/>
        <Flex wrap="wrap" gap={6}>
        {produtos.map((produtos) =>(
            <CardProdutos handleOpenModal={handleOpenModal} produto={produtos} key={produtos.id}/>
        ))}
            
        </Flex>
        </Flex>
        <Flex as="section"
        direction="column"
        grow={1}
        mt={2}
        maxW="1200px">
            <Heading fontSize="1rem">Produtos</Heading>
            <Divider/>
            <Flex direction={{base: "column", md: 'row'}}
             gap={4} 
             wrap="wrap" 
             mt={2}
             p={1}
             >
              {produtos.map((produtos) =>(
            <CardProdutoHorizontal handleOpenModal={handleOpenModal} produto={produtos} key={produtos.id}/>
        ))} 
            </Flex>
        </Flex>
        <ModalProduto isOpen={isOpen} onClose={onClose} id={addId}/>
   </Flex>
   )
}
