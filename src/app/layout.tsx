import { ReactNode } from "react";
import { Providers } from './providers'



interface RootLayautProps {
    children: ReactNode
}

export default function RootLayout({children}: RootLayautProps){
    return (
        <html lang="pt-br">
          <head />
          <body style={{overflowX: 'hidden'}}>
            <Providers> {children}</Providers>
          </body>
        </html>
      )
}