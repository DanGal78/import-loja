
import { Usuario } from "@/services/usuarioService";

import {  FC, ReactNode, createContext, useContext, useEffect, useState } from "react";

type LoginData ={
    email: string
    senha: string
}


interface AuthContextProps{
    isLogged: boolean
    login: (loginData: LoginData) => Promise<boolean>
    logout: () => void
    userData: Usuario
    
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(JSON.parse(window.localStorage.getItem('isLogged') || 'false'),
    )
    const [userData, setUserData] = useState<Usuario>(JSON.parse(window.localStorage.getItem('userData') || '{}'),
    )

    useEffect(() => {
        window.localStorage.setItem('userData', JSON.stringify(userData))
    }, [userData])

    useEffect(() => {
        window.localStorage.setItem('isLogged',JSON.stringify(isLogged))
    }, [isLogged])


    const login = (loginData: LoginData) => {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(true)
                setIsLogged(true)
                setUserData({
                
                    nome: 'Digite seu nome',
                    email: 'email@digite.com',
                    id: '1'                
                })
            }, 2000)
    })           

    }
    const logout = () => {
            setIsLogged(false)
            
        }
        return (
            <AuthContext.Provider value= {{ isLogged, login, logout, userData }}>
                {children}
            </AuthContext.Provider>
        )
}