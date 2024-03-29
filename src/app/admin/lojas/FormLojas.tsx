import { FC } from "react";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton,
    Image,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
     Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { Input } from "@/components/Input";
import { formataMoeda } from "@/helpers/formataMoeda";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { FormularioLoja } from './page'
import { Loja } from "@/services/lojasService";
import { yupResolver } from "@hookform/resolvers/yup";
import { getBase64 } from "@/helpers/getBase64";

const validacaoLoja = yup.object().shape({
    nome: yup.string().required('Informe o nome da loja.'),
    categoria: yup.string().required('Informe o categoria da loja.'),
    
    
    logo: yup.mixed().test('type','Envie uma imagem mo formato JPG ou PNG',(value: any) =>{
        if(value.length > 0) {
            return value[0].type ==='image/jpeg' || value[0].type === 'image/png'
        }
        return false
    }).required('Informe o logo da loja.'),
    cover: yup.mixed().test('type','Envie uma imagem mo formato JPG ou PNG',(value: any) =>{
        if(value.length > 0) {
            return value[0].type ==='image/jpeg' || value[0].type === 'image/png'
        }
        return false
    }) .required('Informe a capa da loja.'),
    

})


interface FormLojaProps {
    isOpen: boolean;
    onClose: () => void;
    loja?: Loja;
    salvarLoja: (loja: FormularioLoja) => Promise<void>;
}

export const FormLojas: FC<FormLojaProps>= ({
    isOpen,
    onClose,
    salvarLoja,
    loja,
}) => {
    const lojaData: FormularioLoja = {...loja}
    const { 
        register, 
        handleSubmit, 
        formState:{errors}, 
        setValue, 
        getValues,
        watch, 
        reset,
    } = useForm<FormularioLoja>({
        resolver: yupResolver(validacaoLoja),
        defaultValues: lojaData,
    })

    const handleSalvarLoja = async (loja: FormularioLoja) => {
        const coverBase64 = getValues('cover')
        ? await getBase64(getValues('cover')[0])
        : ''
        const logoBase64 = getValues('logo')
        ? await getBase64(getValues('logo')[0])
        : ''
        loja.cover = coverBase64
        loja.logo = logoBase64 
        await getBase64(watch('cover')[0])  

        salvarLoja(loja)
        reset()
    }


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>{loja ? "Editar Loja" : "Nova Loja"}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Flex as="form" p={4} direction="column"gap={1} onSubmit={handleSubmit(handleSalvarLoja)}>
                    <Input label="Nome" type="text" id="nome" error={errors.nome} {...register('nome')} />
                    <Input label="Categoria" type="text" id="categoria" error={errors.categoria} {...register('categoria')}/>    
                                                
                    <Input label="Logo" type="file" id="logo"  display={'none'}  {...register('logo')}/>
                    
                    <FormControl isInvalid={!!errors.logo}>
                    <FormLabel htmlFor="logo">
                        <Image 
                        alt="Imagem do logo"
                        src={
                            typeof watch('logo') !=='undefined'
                            && typeof watch('logo')[0] === 'object' 
                        ? URL.createObjectURL(watch('logo')[0])
                        : 'https://placehold.it/100x100'                                
                    }
                    w="100px"
                    h="100px"
                    objectFit="cover"
                    cursor={'pointer'}
                    />
                    </FormLabel>
                    {!!errors.logo && (
                    <FormErrorMessage>{errors.logo?.message as string}</FormErrorMessage>
                    )}
                    </FormControl>
                    <Input label="Capa" type="file" id="cover"  display={'none'}  {...register('cover')}/>

                    <FormControl isInvalid={!!errors.cover}>
                    <FormLabel htmlFor="cover">
                        <Image 
                        alt="Imagem da capa"
                        src={
                            typeof watch('cover') !=='undefined'
                             && typeof watch('cover')[0] === 'object' 
                        ? URL.createObjectURL(watch('cover')[0])
                        : 'https://placehold.co/1200x250'                                
                    }
                    w="100%"
                    h="250px"
                    objectFit="cover"
                    cursor={'pointer'}
                    />
                    </FormLabel>
                    {!!errors.cover && (
                    <FormErrorMessage>{errors.cover?.message as string}</FormErrorMessage>
                    )}
                    </FormControl>
                    
                    <Button type="submit" colorScheme="green" >Salvar</Button>
                </Flex>
            </ModalBody>
        </ModalContent>
    </Modal>
    )
}