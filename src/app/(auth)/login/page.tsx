'use client'

import { Input } from "@/components/Input"
import { Button, Flex,  Heading, IconButton, Link, Text, useDisclosure, } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@/contexts/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa"




const validacaoLogin = yup.object().shape({
    email: yup
    .string()
    .email('Você precisa informar um e-mail válido').
    required('Você precisa informar um e-mail'),
    senha: yup
    .string()
    .required('Infome sua senha')
    . min(8,'Sua senha precisa  ter ao menos 8 caracteres'),
    })

    type LoginDados = {
        email: string
        senha: string
    }

    export default function Login () {
        const { register, handleSubmit,formState:{ isLoading, errors},
    } = useForm<LoginDados>({resolver:yupResolver(validacaoLogin),
    })
    const {login} = useAuth()
    const {isOpen: isShowing, onToggle} = useDisclosure()

    const onSubmit =  async (data: LoginDados) => {
        const isLogged = await login(data)
        if(isLogged){
            setTimeout(() => {
             window.location.href = '/'
            }, 2000)
        }
       
     }
     return(
                     
         <Flex 
             as="main" 
             minW="40vw" 
             backgroundImage= "url('/explosao.avif')"
             color='white' 
             padding={8} 
             borderRadius="10px"
             boxShadow="0 8px 32px rgba(0,0,0,0.2)"
             direction="column"
         >
         <Heading fontSize="2rem">Login</Heading>
         <Flex 
             as="form" 
             borderTop="1px solid rgba(0,0,0,0.2)" 
             mt={2}
             direction="column"
             gap={4}
             pt={2}
             onSubmit={handleSubmit(onSubmit)}
         >
         <Input 
             id="email" 
             type="email" 
             label="Email" 
             placeholder="email@email.com"
             {...register('email')}
             error={errors.email}
         />
         <Flex align="center">
         <Input 
             id="senha" 
             type={isShowing ? 'text': "password" }
             label="Senha" 
             {...register('senha')}
             error={errors.senha}
         />
         <IconButton 
         mt="auto" 
         variant="unstyled" 
         aria-label="Tracar a visibilidade de senha" 
         onClick={onToggle} 
         icon={isShowing ? <FaEye/> : <FaEyeSlash/>}/>
         </Flex>
         <Button type="submit" colorScheme="orange" isLoading={isLoading}>Entrar</Button>
         </Flex>
         <Flex as="footer" borderTop="1px solid rgba(0,0,0,0.2)" mt={4} pt={4}>
             <Text>
                 Ainda não possui um conta?{''}
                 <Link href="/cadastro" fontWeight={600} color="blue.200" >Cadastre-se</Link>
             </Text>
         </Flex>
 
         </Flex>
         
     )
 }
