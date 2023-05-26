import { Menu } from './../components/Menu/index';



export interface Endereco {
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    cep: string
}

export interface Usuario {
    id: string
    nome: string
    email: string
    endereco?: Endereco
    permissions?: string[]
}
interface CreateUserForm {    
    nome: string
    email: string
    senha: string
    confirmaSenha: string
}

export const obterUsuarios = (): Usuario[] => {
    return [
        {
        id: '1',
        nome: 'João da Silva',
        email: 'email@email.com',
        endereco: {
        logradouro: 'Rua 1',
        numero: '123',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12345-678',
        },
        },
        {
        id: '2',
        nome: 'Maria da Silva',
        email: '',
        endereco: {
        logradouro: 'Rua 2',
        numero: '123',
        complemento: 'Casa',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '12345-678',
        },
     },
 ]
}
export const obterUsuario = (id: string): Usuario | undefined => {
    return obterUsuarios().find((usuario) => usuario.id === id)
}
interface CreateUserResponse {
    id: string
    message: string
}


interface LoginResponse {
    message: string
    token: string
}

