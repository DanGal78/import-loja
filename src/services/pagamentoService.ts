import { apiClient } from "@/config/axios"
import { AxiosResponse } from "axios"

interface PedidoForm {
    produtos: {
        id: string | number
        quantidade: number
    }[]
}

interface Pedido {
    id: string
    valor_total: number
    user_id: number
}
interface Checkout {
    payment_url: string

}


export const cadastraPedido = (pedido: PedidoForm) => {
    return apiClient.post<PedidoForm ,AxiosResponse<Pedido>>('/pedidos', pedido)
}

export const checkout = (pedidoId: string | number) => {
    return apiClient.post<any, AxiosResponse<Checkout>>(`/pedidos/${pedidoId}/checkout`)
}
