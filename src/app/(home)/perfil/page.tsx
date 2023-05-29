'use client'
import { Input } from "@/components/Input";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Flex,  Icon,  Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form"
import { useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

export default function PerfilPage() {
    const {register, setValue, watch} = useForm()
    const { userData} = useAuth()
    useEffect(() => {
        if(!userData) return 
            setValue("user.email", userData.email)
            setValue("user.nome", userData.nome)

           if(!userData.endereco) return
           setValue("endereco.cep", userData.endereco?.cep.toString() || '')
           setValue("endereco.rua", userData.endereco?.logradouro|| '')
           setValue("endereco.bairro", userData.endereco?.bairro|| '')
           setValue("endereco.cidade", userData.endereco?.cidade|| '')
           setValue("endereco.uf", userData.endereco?.estado|| '')
           setValue("endereco.complemento", userData.endereco?.complemento|| '')         
        
    },[userData, setValue])

    // eslint-disable-next-line react-hooks/exhaustive-deps

    const buscaCEP = async (cep: string) => {
        try {
        const cepFormatado = cep.replace('-', ' ');
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`,
        )
        const responseJson = await response.json()
        if (!responseJson) return null
        setValue('endereco.rua', responseJson.logradouro)
        setValue('endereco.bairro', responseJson.bairro)
        setValue('endereco.cidade', responseJson.localidade)
        setValue('endereco.uf', responseJson.uf)
    }
    catch (error: any) {
        console.log(error)
    }
}
    useEffect(() => {
        const cep = watch('endereco.cep')
        if (cep.replace('-', ' ').length === 8){
            buscaCEP(cep)
        }
    }, [buscaCEP, watch, watch('endereco.cep')])
    return (
        <Flex align="center" gap={4} as="main" direction="column" grow={1}>
            <Flex as="form" direction="column" gap={5} grow={1}>
            <Accordion minW="500px" allowToggle allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <Text flex={1}>Informações Pessoais</Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel >
                        <Flex direction="column"
                        borderRadius="7px" 
                        boxShadow="5px 8px 10px rgba(0,0,0,.2)" 
                        p={4}>
                            <Input label="Nome" type="text" id="nome"{...register('user.nome')}/>
                            <Input label="Email" type="email" id="email" {...register('user.email')}/>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <Text flex={1}>Alterar a senha</Text>
                        <AccordionIcon/>
                    </AccordionButton>
                    <AccordionPanel>
                        <Flex direction="column" 
                        borderRadius="7px" 
                        boxShadow="5px 8px 10px rgba(0,0,0,.2)" 
                        p={4}>
                            <Input label="Senha antiga" type="password" id="senha-antiga" />
                            <Input label="Senha nova" type="password" id="senha-nova" />
                            <Input label="Repita a senha nova" type="password" id="senha-nova-confirm" />
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            
            <AccordionItem>
                <AccordionButton>
                    <Text flex={1}>Endereço</Text>
                    <AccordionIcon/>
                </AccordionButton>
                <AccordionPanel>
                    <Flex direction="column" 
                    borderRadius="7px" 
                    boxShadow="5px 8px 10px rgba(0,0,0,.2)" 
                    p={4} gap={2}>
                   
                         <Input label="Cep" 
                         type="text" 
                         id="cep" 
                         {...register('endereco.cep')}
                         onChange={evento => {
                            const cep = evento.target.value.replace(/\D/g, '')

                            if (cep.length >= 8) {
                                buscaCEP(cep)
                           }
                            const mask = cep.replace(/(\d{5})(\d)/,'$1-$2')
                            setValue('endereco.cep', mask)
                         }}
                         maxLength={11}
                         />
                        <Input label="Rua" type="text" id="rua" {...register('endereco.rua')}/>
                        <Input label="Bairro" type="text" id="bairro" {...register('endereco.bairro')}/>
                        <Flex gap={5}>
                        <Input label="Cidade" type="text" id="cidade" {...register('endereco.cidade')}/>
                        <Input label="UF" type="text" id="uf" {...register('endereco.uf')}/>                        
                    </Flex>
                    <Input label="Complemento" type="text" id="complemento" {...register('endereco.complemeto')}/>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            <Button type="submit" leftIcon={<Icon as={FaSave} />} colorScheme="orange" color="black">
                Salvar
            </Button>
            </Flex>
        </Flex>
    )
}