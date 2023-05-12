export interface Loja {
    id:string
    nome: string
    nota: number
    categoria: string
    distancia: string
    tempo: string
    taxaEntrega: number
    pedidoMinimo: number
    imageLogo: string
    imageCover: string
}

export const listarLojas = () => {
    return [
        {
        id: '1',
        nome: 'Emici Donaldis',
        nota: 4.5,
        categoria: 'Lanches',
        distancia: '1.5 km',
        tempo: '30 min',
        taxaEntrega: 5,
        pedidoMinimo: 10,
        imageLogo: 'https://picsum.photos/100/100',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '2',
        nome: 'Burguer Queen',
        nota: 4.5,
        categoria: 'Lanches',
        distancia: '1.5 km',
        tempo: '30 min',
        taxaEntrega: 5,
        pedidoMinimo: 10,
        imageLogo: 'https://picsum.photos/100/100',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '3',
        nome: 'Pizzaria do Mario',
        nota: 4.5,
        categoria: 'Pizzaria',
        distancia: '1.5 km',
        tempo: '30 min',
        taxaEntrega: 5,
        pedidoMinimo: 10,
        imageLogo: 'https://picsum.photos/100/100',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '4',
        nome: 'Sorveteria do Zé',
        nota: 4.5,
        categoria: 'Sorvetes',
        distancia: '1.5 km',
        tempo: '30 min',
        taxaEntrega: 5,
        pedidoMinimo: 10,
        imageLogo: 'https://picsum.photos/100/100',
        imageCover: 'https://picsum.photos/1200/250',
        },
        ]
        
        
}

export const obterLoja = (id: string) => {
    return listarLojas().find((loja) => loja.id === id)
}