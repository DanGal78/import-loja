import { Produto, getProduto } from "@/services/produtoService"
import { Button, Divider, Flex, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { StarRating } from "../StarRating"
import { formataMoeda } from "@/helpers/formataMoeda"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useCart } from "@/contexts/CartContext"

interface ModalProdutoPros{
    isOpen: boolean
    onClose: () => void
    id: string
}

export const ModalProduto: FC<ModalProdutoPros> = ({isOpen, onClose, id}) => {

    const [quantidade, setQuantidade] = useState(1)
    const { addToCart } = useCart()
    const [produto, setProduto] = useState<Produto | null>(null)

    const handleClose = () => {
        onClose()       
    }
    useEffect(() => {
        getProduto(id).then((response) => setProduto(response.data))
    }, [id])
    useEffect(() =>{
                setQuantidade(1)
            },[isOpen])

    
        
    const incrementa = () => {
        setQuantidade(quantidade + 1)
    }

    const decrementa =() => {
        if (quantidade === 1) return
        setQuantidade(quantidade - 1)
    }

    

    const handleAddToCart = () =>{
        addToCart({ quantidade, ...produto})
        handleClose()
    }
    return <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <Text>{produto?.nome}</Text>
                <ModalCloseButton/>
            </ModalHeader>
            <ModalBody>
                <Flex grow={1} gap={2}>
                    <Image  height="150px" width="150px" objectFit="cover"src={produto?.imagem} alt={`Imagem do produto ${produto?.nome}`}/>
                    <Flex direction="column" grow={1}>
                        <Text>{produto?.descricao}</Text>
                        <Divider variant="dashed" />
                         {produto?.loja && (
                            <>
                        <Flex justify="space-between" my={2}>
                        <Text>{produto?.loja?.nome}</Text>
                        
                        </Flex>
                        <Divider />
                        <Flex fontSize="12px" justify="space-between">
                        <Text>{produto.loja.tempo}</Text>
                        <Text color={
                        produto.loja.taxaEntrega === 0
                        ? 'gray.300'
                        : 'blackAlpha.300'                 
                    }>
                        {produto.loja.taxaEntrega === 0
                        ? 'Grátis'
                        : formataMoeda(produto.loja.taxaEntrega)}
                    </Text>
                        </Flex>
                        </>
                        )}
                    </Flex>
                </Flex>
            </ModalBody>
            <ModalFooter>
                   <Flex grow={1} gap={3} justify="flex-end">
                    <Flex align="center" gap={2} borderRadius="7px" border="1px solid rgba(0,0,0,0.2)">
                        <IconButton 
                        variant="ghost" 
                        aria-label="Decrementa quantidade"
                        icon={<FaMinus/>}
                        colorScheme="red"
                        onClick={decrementa}
                        disabled={quantidade <= 1}
                        />
                        <Text fontWeight={700}>{quantidade}</Text>
                        <IconButton 
                        variant="ghost" 
                        aria-label="Incrementa quantidade"
                        icon={<FaPlus/>}
                        colorScheme="red"
                        onClick={incrementa}
                        
                        />
                    </Flex>
                    <Button variant="solid" colorScheme="red" onClick={handleAddToCart}>
                        Adicinar {formataMoeda(produto?.preco * quantidade)}</Button>
                    </Flex>         
            </ModalFooter>
        </ModalContent>

    </Modal>
}