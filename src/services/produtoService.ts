import { Loja } from "./lojasService";

export interface Produto{
    id: string
    nome: string
    descricao: string
    preco: number
    imagem: string
}

export function getProdutos(): Produto[] { 
    return [
        {
            id: "1",
            nome: "Camiseta",
            descricao: "Camiseta",
            preco: 1000,
            imagem: "https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-1.jpg"
        },
        {
            id: "2",
            nome: "Celular",
            descricao: "Samsung",
            preco: 2000,
            imagem: "https://www.samsung.com.br/wp-content/uploads/2020/03/bebidas-1.jpg"
        },
        {
            id: "3",
            nome: "Celular",
            descricao: "Samsung",
            preco: 2000,
            imagem: "https://www.samsung.com.br/wp-content/uploads/2020/03/bebidas-1.jpg"
        },
        {
            id: "4",
            nome: "Celular",
            descricao: "Samsung",
            preco: 2000,
            imagem: "https://www.samsung.com.br/wp-content/uploads/2020/03/bebidas-1.jpg"
        },
    ]
}

export function getProduto(id: string): Produto | undefined {
    return getProdutos().find((produtos) => produtos.id === id)
}
export function updateProdutos<DataForm>
(id: number | string, produtos: DataForm): Produto { 
    return{
        id: "1",
        nome: "Camiseta",
        descricao: "Camiseta",
        preco: 1000,
        imagem: "https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-1.jpg"
    
    }
   }
   export function createProduto<DataForm>(produtos: DataForm): Produto {
    return{
        id: "1",
        nome: "Camiseta",
        descricao: "Camiseta",
        preco: 1000,
        imagem: "https://www.camiseta.com.br/wp-content/uploads/2020/03/camiseta-1.jpg"
    }
   }