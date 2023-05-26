import { Link } from "@chakra-ui/next-js";
import { Button, Flex, Heading, Image,} from "@chakra-ui/react";
import { FC } from "react";
import { Menu } from '../Menu'
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from '../UserMenu';
import { CheckoutButton } from '../CheckoutButton';





interface HeaderProps {
    isOpen: boolean;
    onToggle:() => void
}
export const Header: FC<HeaderProps> = ({isOpen, onToggle}) => {
    return (
    <Flex 
    gap="10px"
    w="100%" 
    wrap="wrap" 
    justify="space-between" 
    paddingX={8}
    paddingY={0}
    align="center"
    position="fixed"
    transition="all 0.2s"
    maxH={{base: 'auto', md:'130px'}}
    bg="black"
    zIndex="9999"
    >
       
       <Link href="/">
        <Heading >
           <Image w="25%" src="/ImportShop.png" alt="Imagem Logo import shop"/>
        </Heading>
       
      </Link>

     
      <Menu isOpen={isOpen} />
      
      <Flex gap={4} display={{base: isOpen ? 'flex' :'nome', md: 'flex'}}>
      <UserMenu />
      <CheckoutButton />
      </Flex>
  

      <Flex gap='4'display={{base: isOpen ? 'flex' : 'none', md: 'flex'}}>
        <Button as={Link} href="/cadastro" variant="link" color='orange.500'>Crie sua conta</Button>
        <Button as={Link} href="/login" colorScheme='orange' color="black">Entrar</Button>
      </Flex>
  
    </Flex>
    );
  }