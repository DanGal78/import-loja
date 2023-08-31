import { apiClient } from '@/config/axios';

import { Loja } from "./lojasService";
import axios from 'axios';

export interface Produto{
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    imagem: string;
    desconto?: number
    loja?: Loja
}

    interface PaginatedProdutos {
        data: Produto[];
    }

    export function getProdutos() {
        return apiClient.get<PaginatedProdutos>('/produtos')
    }

    export function getProduto(id: string | number){
        return apiClient.get<Produto>(`/produtos/${id}`)
    }
    export function updateProdutos<DataForm> (
        id: number | string, 
        produto: DataForm, )
        { 
        return apiClient.put<DataForm, Produto>(`/produtos/${id}`, produto)
       }
       export function createProduto<DataForm>(produto: DataForm) {
        return apiClient.post('/produtos', produto)
       }
         export function deleteProduto(id: string | number) {
        return apiClient.delete(`/produtos/${id}`)
        }