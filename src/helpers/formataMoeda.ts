export const formataMoeda = (valor: number) =>{
    const moneyFormatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'

    }) 
    return moneyFormatter.format(valor)
} 