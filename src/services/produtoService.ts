import { Loja } from "./lojasService";

export interface Produto{
    id: string
    nome: string
    descricao: string
    preco: number
    imagem: string
    loja?: Loja
}

export function getProdutos(): Produto[] { 
    return [
        {
            id: "1",
            nome: "JBL Boombox 3",
            descricao: "Acabamos de tornar a nossa mais poderosa caixa de som Bluetooth portátil ainda melhor. A silhueta icônica da JBL Boombox 3 tem uma nova e ousada atualização com uma alça de metal resistente e partes em silicone, tampas laterais duplas e tecido exclusivo à prova d'água e à prova de poeira. Ela também foi redesenhada por dentro, acrescentando um novo subwoofer que reproduz graves muito mais profundos e o potente JBL Original Pro Sound, tudo sem qualquer sinal de distorção e até 24 horas de reprodução levam você desde o treino matinal até um fim de noite com seus amigos. E para um som praticamente ilimitado, conecte instantaneamente várias caixas de som com o aplicativo JBL Portable.",
            preco: 2429,
            imagem: "https://www.jbl.com.br/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa68c501a/1_JBL_BOOMBOX_3_SQUAD_HERO_33262_x2.png?sw=537&sfrm=png",
           
        },
        {
            id: "2",
            nome: "JBL Boombox 3",
            descricao: "Acabamos de tornar a nossa mais poderosa caixa de som Bluetooth portátil ainda melhor. A silhueta icônica da JBL Boombox 3 tem uma nova e ousada atualização com uma alça de metal resistente e partes em silicone, tampas laterais duplas e tecido exclusivo à prova d'água e à prova de poeira. Ela também foi redesenhada por dentro, acrescentando um novo subwoofer que reproduz graves muito mais profundos e o potente JBL Original Pro Sound, tudo sem qualquer sinal de distorção e até 24 horas de reprodução levam você desde o treino matinal até um fim de noite com seus amigos. E para um som praticamente ilimitado, conecte instantaneamente várias caixas de som com o aplicativo JBL Portable.",
            preco: 1429,
            imagem: "https://www.jbl.com.br/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa68c501a/1_JBL_BOOMBOX_3_SQUAD_HERO_33262_x2.png?sw=537&sfrm=png",
           
        },
        {
            id: "3",
            nome: "JBL Boombox 3",
            descricao: "Acabamos de tornar a nossa mais poderosa caixa de som Bluetooth portátil ainda melhor. A silhueta icônica da JBL Boombox 3 tem uma nova e ousada atualização com uma alça de metal resistente e partes em silicone, tampas laterais duplas e tecido exclusivo à prova d'água e à prova de poeira. Ela também foi redesenhada por dentro, acrescentando um novo subwoofer que reproduz graves muito mais profundos e o potente JBL Original Pro Sound, tudo sem qualquer sinal de distorção e até 24 horas de reprodução levam você desde o treino matinal até um fim de noite com seus amigos. E para um som praticamente ilimitado, conecte instantaneamente várias caixas de som com o aplicativo JBL Portable.",
            preco: 429,
            imagem: "https://www.jbl.com.br/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwa68c501a/1_JBL_BOOMBOX_3_SQUAD_HERO_33262_x2.png?sw=537&sfrm=png",
           
        },
        
    ]
}

export function getProduto(id: string): Produto | undefined {
    return getProdutos().find((produto) => produto.id === id)
}
