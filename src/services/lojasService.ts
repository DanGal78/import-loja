import { apiClient } from '@/config/axios';
import { FormErrorMessage } from '@chakra-ui/react';
import { Produto } from './produtoService';
import { FormularioLoja } from '@/app/admin/lojas/page';
export interface Loja {
    id?:string
    nome: string   
    categoria: string       
    imageLogo: string
    imageCover: string
    produtos?: Produto[]
}

export interface PagitateLojas {
    data: Loja[]
}

export const listarLojas = () => {
    return apiClient.get<PagitateLojas>('/lojas')        
        
}

export const obterLoja = (id: string) => {
    return apiClient.get<Loja>(`/lojas/${id}`)
}
interface CadastraLojaDTO {
    message: string
}

export const cadastrarLoja = (lojaData: FormularioLoja) => {
    return apiClient.post<CadastraLojaDTO>('/lojas',lojaData)
}

export const apagarLoja = (id: string | number) => {
    return apiClient.delete<CadastraLojaDTO>(`/lojas/${id}`)
}

export const atualizaLoja = (id: string | number, lojaData: Partial<FormularioLoja>) => {
    return apiClient.put<CadastraLojaDTO>(`/lojas/${id}`, lojaData)
}