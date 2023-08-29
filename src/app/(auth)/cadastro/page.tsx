'use client'
import { Link } from '@chakra-ui/next-js';
import { Input } from "@/components/Input";
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup'
import { type } from 'os';
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { createUser } from "@/services/usuarioService";
import { notify } from '@/config/toast'

const validacaoCadastro = yup.object().shape({
    name: yup
        .string()
        .required('Você precisa informar o seu nome')
        .test({
            name: 'sobrenome',
            test: (value) => {
                const nome = value.trim();
                return nome.split(' ').length > 1
            },
            message: 'Informe ao menos 1 sobrenome',
        }),

    email: yup
        .string()
        .email('Você precisa informar um email válido')
        .required('Você precisa informar um e-mail'),

    password: yup
        .string()
        .required('informe sua senha')
        .min(8, ' Sua senha precisa ter ao menos 8 caracteres.'),

    password_confirmation: yup
        .string()
        .required('Infome sua senha')
        .min(8, ' Sua senha precisa ter ao menos 8 caracteres.')
        .oneOf([yup.ref('password'), ''], 'As senhas não coincidem'),
})

type FormularioCadastro = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export default function Cadastro(){

    const {register, handleSubmit, formState:{ isSubmitting, errors},
        } = useForm<FormularioCadastro>({resolver:yupResolver(validacaoCadastro),
    });
    
    const cadastraUsuario = async (dados: FormularioCadastro) => {
        try {
            const resposta = await createUser(dados)
           notify(resposta.data.message, 'success')
           
            setTimeout(() => {
                            window.location.href = '/login'
                            }, 2000)

        } catch (e: any){
           if (typeof e.message !== 'undefined'){
            const {
                data: { message },
                }  = e.response
                notify(message, 'error')
                return
            }
                notify('Um erro inesperado aconteceu', 'error')            
        }        
    }


    return (
        <Flex
            as="main"
            backgroundImage= "url('/explosao.avif')"
            minW="40vw" 
            padding={8}
            color="white" 
            borderRadius="10px"
            direction="column"
            boxShadow="0 8px 32px rgba(0,0,0,0.2)"
        >
            <Heading
                fontSize="2rem">
                Cadastre-se
            </Heading>
            <Flex
                as="form"
                direction="column"
                gap={5}
                mt={2}
                pt={2}
                borderTop="1px solid rgba(0,0,0,0.1)"
                onSubmit={handleSubmit(cadastraUsuario)}
            >
                <Input
                    label="Nome"
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    {...register('name')}
                    error={errors.name}
                />
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="email@email.com"
                    {...register('email')}
                    error={errors.email}
                />
                <Input
                    id="senha"
                    type="password"
                    label="Senha"
                    {...register('password')}
                    error={errors.password}
                />
                <Input
                    label="Confirme sua Senha"
                    id="confirme-senha"
                    type="password"
                    {...register('password_confirmation')}
                    error={errors.password_confirmation}
                />
                <Button type="submit" isLoading={isSubmitting} colorScheme="orange">Cadastrar</Button>
            </Flex>
            <Flex as="footer" borderTop="1px solid rgba(0,0,0,0.1)" mt={4} pt={4}>
                <Text>
                    Já possui um conta?{''}
                    <Link href="/login" fontWeight={600} color="blue.200">
                        Acesse sua conta
                    </Link>
                </Text>
            </Flex>

        </Flex>

    )
}
