'use client'

import { Produto, deleteProduto, getProdutos } from "@/services/produtoService"
import { Flex, FormControl, FormLabel, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { AdminHeader } from "../components/AdminHeader"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { Loja, listarLojas } from "@/services/lojasService"
import { Input } from "@/components/Input"
import { ModalProduto } from "./ModalProduto"
import { useEffect, useState } from "react"
import { ConfirmDelete } from "@/components/ConfirmDelete"
import { string } from "yup"
import { QueryClient, useQueryClient } from "react-query"
import { notify } from "@/config/toast"

export default function ProdutosPage(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [lojas, setLojas] = useState<Loja[]>([])

    useEffect(() => {
        getProdutos().then((response) => setProdutos(response.data.data))
        listarLojas().then((response) => setLojas(response.data.data))
    }, [])
    
    
    const { 
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure()
    
    const [produto, setProduto] = useState<Produto | null>(null)
    const handleEdit = (produto: Produto) => {
        setProduto(produto)
        onOpen()
    }
    const handleDelete = (produto: Produto) => {
        setProduto(produto)
        onOpenDelete()
    }

    const apagarProduto = async () => {
        try {

        const { data } = await deleteProduto(produto?.id as string)
       
        notify(data.message, 'success')
        onCloseDelete()
        } catch (error) {
            notify("Não foi possivel apagar o produto", 'error')
        }finally{
            getProdutos().then((response) => setProdutos(response.data.data))
        }
    }

    
    return (
        <Flex direction="column" grow={1} gap={4}>
            
            <AdminHeader title="Produtos" 
            buttonLabel="Novo Produto"
            onClick={onOpen}
            /> 
            <Flex>

                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Nome</Th>
                            <Th>Preço</Th>
                            <Th>Descrição</Th>
                            <Th>Desconto</Th>
                            <Th>Loja</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {produtos.map((produto) =>(
                            <Tr key={produto.id}>
                                <Td>{produto.id}</Td>
                                <Td>{produto.nome}</Td>
                                <Td>{produto.preco}</Td>
                                <Td>{produto.descricao}</Td>
                                <Td>{produto.desconto}</Td>
                                <Td>{produto?.loja?.nome}</Td>
                                <Td>
                                    <Flex gap={3}>
                                        <IconButton aria-label="Editar"
                                        icon={<FaPencilAlt/>}
                                        colorScheme="yellow"
                                        onClick={() => handleEdit(produto)}
                                        />
                                        <IconButton aria-label="Apagar"
                                        icon={<FaTrash/>}
                                        colorScheme="red"
                                        onClick={() => handleDelete(produto)}
                                        />
                                    </Flex>

                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
            
            <ConfirmDelete 
                isOpen={isOpenDelete}
                onClose={onCloseDelete} 
                onConfirm={apagarProduto}
                messagem={`Tem certeza que deseja apagar esta loja ${produto?.nome}?`}/>
            
            <ModalProduto
                isOpen={isOpen} 
                onClose={()=>{ getProdutos().then((response) => setProdutos(response.data.data)) ;onClose()}} 
                lojas={lojas} 
                produto={produto}/>
            </Flex>

    )
}