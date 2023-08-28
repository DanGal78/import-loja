'use client'
import { Input } from "@/components/Input";
import { Loja, apagarLoja, atualizaLoja, cadastrarLoja, listarLojas } from "@/services/lojasService";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton,
     Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
      Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Image } from "@chakra-ui/react";
import { AdminHeader } from "../components/AdminHeader";
import { getBase64 } from "@/helpers/getBase64";
import { formataMoeda } from "@/helpers/formataMoeda";
import { notify } from "@/config/toast";
import { useQuery, useQueryClient} from 'react-query'
import { useState } from "react";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { FormLojas } from "./FormLojas";


 export type FormularioLoja = {
    nome: string
    categoria: string
   
    
    logo: any
    cover: any
    pedidoMinimo: string | number
    taxaEntrega: string | number
}
export default function LojaIndex() {
    


    const { isLoading, isError, data, isFetching} = useQuery({
        queryKey: ['lojas', 'adm'],
        queryFn: listarLojas
    })
    const queryClient = useQueryClient()
    const {isOpen, onOpen, onClose} =useDisclosure()
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure()

    const [loja, setLoja] = useState<Loja | null>()
    
    const handleDelete = (loja: Loja) => {
        setLoja(loja)
        onOpenDelete()
    }

    const handleEdit = (loja: Loja) => {
        setLoja(loja)
        onOpen()
    }
    const updateLoja = async ({
        logo,
        cover,
        pedidoMinimo,
        taxaEntrega,
        ...resto
    }: FormularioLoja) => {
        const imageLogo = logo[0] ? await getBase64(logo[0]) : undefined
        const imageCover = cover[0]? await getBase64(cover[0]) : undefined


        const lojaData: Partial<FormularioLoja> = {
            ...resto,
            logo: imageLogo,
            cover: imageCover,
            pedidoMinimo: Number(`${pedidoMinimo}`.replace(/\D/g, '')) /100,
            taxaEntrega: Number(`${taxaEntrega}`.replace(/\D/g, '')) /100,
        }
        if (!imageLogo) delete lojaData.logo
        if (!imageCover) delete lojaData.cover
        try{
            const {data} =  await atualizaLoja(loja?.id || '', lojaData)
            notify(data.message, 'success')
            onClose()
            queryClient.invalidateQueries(['lojas', 'adm'])
        } catch (e: any) {
            notify(
                e?.response?.data?.message || 'Ocorreu um erro ao atualizar',
                'error'
            )
        }

    }        
    

    const deleteLoja = async () => {
        const { data } = await apagarLoja (loja?.id || 0)
        await queryClient.invalidateQueries({queryKey: ['lojas', 'adm']})
        notify(data.message, 'success')
        onCloseDelete()
    }
    

    const salvarLoja =  async({logo, cover, pedidoMinimo, taxaEntrega,...resto}: FormularioLoja) => {
        
       

        const submitData: FormularioLoja = {
            ...resto,
            cover: "",
            logo: "",           
            pedidoMinimo: Number(`${pedidoMinimo}`.replace(/\D/g, '')) /100,
            taxaEntrega: Number(`${taxaEntrega}`.replace(/\D/g, '')) /100,
        
        }
        if (logo[0]) {
            submitData.logo = await getBase64(logo[0])
        }else {
            delete submitData.logo
        }
        if (cover[0]) {
            submitData.cover = await getBase64(cover[0])
        }else {
            delete submitData.cover
        }

            

       try {
        const response = await cadastrarLoja(submitData)
        notify(response.data.message, 'success')
        onClose()
       
        queryClient.invalidateQueries({ queryKey: ['lojas', 'adm']})
       } catch (e: any) {
        if(e.response) {
            notify(e.response.data.message, 'error')
            return
        }
        notify('Um erro ocorreu', 'error')
       }
    }
   
    return (
        <Flex direction="column" grow={1} gap={4}>
           <AdminHeader 
           title='Lojas' 
           buttonLabel="Nova Loja" 
           onClick={() => {
            setLoja(null)
            onOpen()
        }}
           isFetching={isFetching}
           />
     
        <Flex>
           {isLoading ? (<Spinner size='md'/>
           ) : isError ? (
            <Text>Ocorreu um erro ao carregar as lojas</Text>
           ) : 
            <Table variant="striped">
                <Thead>
                    <Tr> 
                        <Th>Id</Th>
                        <Th>Nome da loja</Th>
                        <Th>Avaliação</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.data?.data?.map((loja) =>(
                        <Tr key={loja.id}>
                            <Td>{loja.id}</Td>
                            <Td>{loja.nome}</Td>
                            
                            <Td>
                                <Flex>
                                <IconButton
                                aria-label="Editar"
                                icon={<FaPencilAlt/>}
                                colorScheme="yellow"
                                onClick={() =>handleEdit(loja)}
                                />
                                <IconButton
                                aria-label="Apagar"
                                icon={<FaTrash/>}
                                colorScheme="red"
                                onClick={() => handleDelete(loja)}
                                />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            }
            </Flex>
            
            <ConfirmDelete 
            isOpen={isOpenDelete}
            onClose={onCloseDelete} 
            onConfirm={deleteLoja}
            messagem={`Tem certeza que deseja apagar esta loja ${loja?.nome}?`}
            />
            <FormLojas
            isOpen={isOpen}
            onClose={onClose}
            salvarLoja={loja ? updateLoja : salvarLoja}
            loja={loja as Loja}
            />
        </Flex>
    )
}