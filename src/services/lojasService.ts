export interface Loja {
    id:string
    nome: string
    nota: number
    categoria: string
      
    imageLogo: string
    imageCover: string
}

export const listarLojas = () => {
    return [
        {
        id: '1',
        nome: 'Apple iPhone 14 Pro 128GB Preto-espacial 6,1” 48MP',
        nota: 5.0,
        categoria: 'iPhone',          
        imageLogo: '/iphone14.png',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '2',
        nome: 'Apple iPhone 14 Pro 256GB Roxo-profundo',
        nota: 5.0,
        categoria: 'iPhone', 
        imageLogo: '/iphone14.png',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '3',
        nome: 'Apple TV 4K (3ª geração) Wi-Fi + Ethernet 128GB',
        nota: 4.7,
        categoria: 'Apple TV 4K ',
        imageLogo: '/tv4k.png',
        imageCover: 'https://picsum.photos/1200/250',
        },
        {
        id: '4',
        nome: 'MacBook Air Apple',
        nota: 4.9,
        categoria: 'MacBook Air',
        imageLogo: 'macbook.png',
        imageCover: 'https://picsum.photos/1200/250',
        },
        ]
        
        
}

export const obterLoja = (id: string) => {
    return listarLojas().find((loja) => loja.id === id)
}