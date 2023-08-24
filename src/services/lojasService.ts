import { FormularioLoja } from "@/app/admin/loja/page"
import { apiClient } from "@/config/axios"

export interface Loja {
    id:string
    nome: string
    nota: number
    categoria: string
      
    imageLogo: string
    imageCover: string
}

export interface PaginatedLojas {
    data: Loja[]
  }

  export const listarLojas = () => {
    return apiClient.get<PaginatedLojas>('/lojas')
        
        
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