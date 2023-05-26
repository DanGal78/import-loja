import { Link } from "@chakra-ui/next-js";
import { Flex, HStack, Heading, Button, Text, Menu, MenuButton, IconButton, MenuList, MenuItem} from "@chakra-ui/react";
import { FC } from "react";
import { FaCog, FaDoorOpen, FaUserAlt, FaUserCog } from "react-icons/fa";
import { CheckoutButton } from "../CheckoutButton";
import { UserMenu } from "../UserMenu";


export const HeaderUser: FC = () => {
    return(
        <Flex 
        position="fixed" 
        justify="space-between"
         p={4}
        zIndex={999}
         w="100%" 
         bg="gray.50"
         align="center"
         
         
         >
            <Heading fontSize="1rem">Import Shop</Heading>
            <HStack>
                <UserMenu/>
                <CheckoutButton/>
            </HStack>
        </Flex>
    )
}